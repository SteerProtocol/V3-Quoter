// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.8.0 <0.9.0;
pragma experimental ABIEncoderV2;

interface IQuoter {
    function _estimateMaxSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount
    ) external view returns (uint256, uint256);

    function _estimateMinSwapUniswapV3(
        address _fromToken,
        address _toToken,
        uint256 _amount
    ) external view returns (uint256, uint256);
}
