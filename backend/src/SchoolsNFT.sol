// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import 'openzeppelin/token/ERC1155/ERC1155.sol';

contract SchoolsNFT is ERC1155{
    
    string public name;
    string public symbol;
    address public admin;
    mapping(uint256 => string) public daysIdToUri;

    constructor(string memory _name, string memory _symbol, string memory _uri, address _admin) ERC1155(_uri) {
        name = _name;
        symbol = _symbol;
        admin = _admin;
    }

    modifier onlyOwner {
        require(msg.sender == admin, 'Not permitted');
        _;
    }

    function mint(address _to, uint256 _daysId, uint256 _amount) public onlyOwner {
        _mint(_to, _daysId, _amount, '');
    }


    function batchMintForDay(uint256 _dayId, address[] memory _students, uint256[] memory _amount) public onlyOwner {
        require(_students.length == _amount.length, 'Length mismatch');

        for (uint256 i = 0; i < _students.length; i++) {
            _mint(_students[i], _dayId, _amount[i], '');
        }
    }


    function setDayUri(uint256 id, string memory _uri) public onlyOwner{
        daysIdToUri[id] = _uri;
    }

    function getDayUri(uint256 id) public view returns (string memory _dayUri) {
        _dayUri = daysIdToUri[id];
    }

}