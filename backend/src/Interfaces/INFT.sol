// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface INFT {
    function mint(
        address _to,
        bytes calldata _daysId,
        uint256 _amount
    ) external;

    function setDayUri(bytes calldata id, string memory _uri) external;
    function batchMintTokens(address[] memory users, string memory uri) external;
}
