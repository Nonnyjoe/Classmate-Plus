// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface INFT {
    function mint(address _to, uint256 _daysId, uint256 _amount) external;

    function setDayUri(uint256 id, string memory _uri) external;
}
