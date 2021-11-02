// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.8.0 <0.9.0;
pragma experimental ABIEncoderV2;

interface IUniswapV3 {
    struct SwapCallbackData {
        bytes path;
        address payer;
    }

    function _estimateMaxSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount
    ) external view returns (uint256);

    function _estimateMinSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount
    ) external view returns (uint256);

    function _maxSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount,
        uint24 _slippage,
        address _recipient
    ) external returns (uint256);

    function _minSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount,
        uint24 _slippage,
        address _recipient
    ) external returns (uint256);
}
