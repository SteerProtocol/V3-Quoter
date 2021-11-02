// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.8.0 <0.9.0;
pragma experimental ABIEncoderV2;

import './UniswapV3Quoter.sol';
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/interfaces/pool/IUniswapV3PoolImmutables.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "./interfaces/IUniswapV3.sol";
import "./interfaces/IUniswapV3Quoter.sol";
import "./libraries/UniswapV3/FullMath.sol";
import "./libraries/UniswapV3/SafeCast.sol";
import "./libraries/UniswapV3Math.sol";
import "./libraries/UniswapPath.sol";
import "./libraries/UniswapV3/TickBitmap.sol";
import "./libraries/UniswapV3/SqrtPriceMath.sol";
import "hardhat/console.sol";

contract UniswapV3 is IUniswapV3, UniswapV3Quoter {
    using UniswapPath for bytes;
    using SafeERC20 for IERC20;
    using SafeCast for uint256;

    IUniswapV3Factory internal uniV3Factory; // TODO should it be immutable?

    constructor(address _uniV3Factory) {
        uniV3Factory = IUniswapV3Factory(_uniV3Factory);
    }

    function _estimateMaxSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount
    ) public view override returns (uint256) {
        (address pool, uint24 poolFee) = getCheapestPool(_fromToken, _toToken);

        return _estimateOutputSingle(_toToken, _fromToken, _amount, pool);
    }

    function uniswapV3SwapCallback(
        int256 amount0Delta,
        int256 amount1Delta,
        bytes calldata _data
    ) external {
        SwapCallbackData memory data = abi.decode(_data, (SwapCallbackData));
        (address tokenIn, address tokenOut, uint24 fee) = data
            .path
            .decodeFirstPool();

        address pool = uniV3Factory.getPool(tokenIn, tokenOut, fee);
        require(msg.sender == pool);

        (bool isExactInput, uint256 amountToPay) = amount0Delta > 0
            ? (tokenIn < tokenOut, uint256(amount0Delta))
            : (tokenOut < tokenIn, uint256(amount1Delta));

        if (isExactInput) {
            IERC20(tokenIn).safeTransferFrom(
                data.payer,
                msg.sender,
                amountToPay
            );
        } else {
            // either initiate the next swap or pay
            // swap in/out because exact output swaps are reversed
            IERC20(tokenOut).safeTransferFrom(
                data.payer,
                msg.sender,
                amountToPay
            );
        }
    }

    function _estimateMinSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount
    ) public view override returns (uint256) {
        (address pool, uint24 poolFee) = getCheapestPool(_fromToken, _toToken);

        return _estimateInputSingle(_toToken, _fromToken, _amount, pool);
    }

    // wrapper for Uniswap exactInputSingle
    function _maxSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount,
        uint24 _slippage,
        address _recipient
    ) public override returns (uint256) {
        // require(block.timestamp <= deadline, 'Transaction too old'); // @todo fixme

        (address pool, uint24 fee) = getCheapestPool(_fromToken, _toToken);
        uint160 sqrtPriceLimitX96 = 0; // @todo fixme
        SwapCallbackData memory data = SwapCallbackData({
            path: abi.encodePacked(_fromToken, fee, _toToken),
            payer: msg.sender
        });

        bool zeroForOne = _fromToken < _toToken;
        (int256 amount0, int256 amount1) = IUniswapV3Pool(pool).swap(
            _recipient,
            zeroForOne,
            _amount.toInt256(),
            sqrtPriceLimitX96 == 0
                ? (
                    zeroForOne
                        ? TickMath.MIN_SQRT_RATIO + 1
                        : TickMath.MAX_SQRT_RATIO - 1
                )
                : sqrtPriceLimitX96,
            abi.encode(data)
        );

        uint256 amountOut = uint256(-(zeroForOne ? amount1 : amount0));
        return amountOut;
    }

    function _minSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount,
        uint24 _slippage,
        address _recipient
    ) public override returns (uint256) {
        // require(block.timestamp <= deadline, 'Transaction too old'); // @todo fixme

        (address pool, uint24 fee) = getCheapestPool(_toToken, _fromToken);
        uint160 sqrtPriceLimitX96 = 0; // @todo fixme
        SwapCallbackData memory data = SwapCallbackData({
            path: abi.encodePacked(_fromToken, fee, _toToken),
            payer: msg.sender
        });

        bool zeroForOne = _toToken < _fromToken;
        (int256 amount0Delta, int256 amount1Delta) = IUniswapV3Pool(pool).swap(
            _recipient,
            zeroForOne,
            -_amount.toInt256(),
            sqrtPriceLimitX96 == 0
                ? (
                    zeroForOne
                        ? TickMath.MIN_SQRT_RATIO + 1
                        : TickMath.MAX_SQRT_RATIO - 1
                )
                : sqrtPriceLimitX96,
            abi.encode(data)
        );

        return uint256(_toToken < _fromToken ? amount0Delta : amount1Delta);
    }

    function _estimateOutputSingle(
        address _fromToken,
        address _toToken,
        uint256 _amount,
        address _pool
    ) internal view returns (uint256 amountOut) {
        bool zeroForOne = _fromToken > _toToken;
        (uint160 sqrtPriceX96,,,,,,) = IUniswapV3Pool(_pool).slot0();
        // todo: price limit?
        (int256 amount0, int256 amount1) = quoteSwapExactAmount(_pool, int256(_amount), zeroForOne ? sqrtPriceX96 * 5 / 10 : sqrtPriceX96 * 11 / 10, zeroForOne);
        if (zeroForOne)
            amountOut = amount1 > 0 ? uint256(amount1) : uint256(-amount1);
        else amountOut = amount0 > 0 ? uint256(amount0) : uint256(-amount0);
    }


    function _estimateInputSingle(
        address _fromToken,
        address _toToken,
        uint256 _amount,
        address _pool
    ) internal view returns (uint256 amountOut) {
        bool zeroForOne = _fromToken < _toToken;
        (uint160 sqrtPriceX96,,,,,,) = IUniswapV3Pool(_pool).slot0();
        // todo: price limit?
        (int256 amount0, int256 amount1) = quoteSwap(_pool, -int256(_amount), zeroForOne ? sqrtPriceX96 * 5 / 10 : sqrtPriceX96 * 11 / 10, zeroForOne);
        if (zeroForOne)
            amountOut = amount0 > 0 ? uint256(amount0) : uint256(-amount0);
        else amountOut = amount1 > 0 ? uint256(amount1) : uint256(-amount1);
    }    

    // @todo To be replaced
    function getCheapestPool(address _token0, address _token1)
        internal
        view
        returns (address, uint24)
    {
        // try 0.05%
        address pool = uniV3Factory.getPool(_token0, _token1, 500);
        if (pool != address(0)) return (pool, 500);

        // try 0.3%
        pool = uniV3Factory.getPool(_token0, _token1, 3000);
        if (pool != address(0)) return (pool, 3000);

        // try 1%
        pool = uniV3Factory.getPool(_token0, _token1, 10000);
        if (pool != address(0)) return (pool, 10000);
        else revert("Uniswap pool does not exist");
    }

}
