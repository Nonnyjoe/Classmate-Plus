// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Contracts/SchoolsNFT.sol";

contract SchoolsNFTTest is Test {
    SchoolsNFT _schoolsNFT;
    address[] _students = [address(1), address(2), address(3)];
    uint256[] _amounts = [1, 1, 1];

    address _admin = address(123);

    function setUp() public {
        _schoolsNFT = new SchoolsNFT("Test", "TST", "http://test.org", _admin);
    }

    function testName() public {
        string memory _name = _schoolsNFT.name();
        assertEq(_name, "Test");
    }

    function testUri() public {
        string memory _uri = _schoolsNFT.uri(1);
        assertEq(_uri, "http://test.org");
    }

    function testAdmin() public {
        address admin = _schoolsNFT.admin();
        assertEq(_admin, admin);
    }

    function testMint() public {
        vm.prank(address(_admin));
        _schoolsNFT.mint(address(1), 2, 1);
        uint256 userBalance = _schoolsNFT.balanceOf(address(1), 2);
        assertEq(userBalance, 1);
    }

    function testBatchMintDaysTokens() public {
        vm.prank(address(_admin));
        _schoolsNFT.batchMintForDay(2, _students, _amounts);
        uint256 _bal = _schoolsNFT.balanceOf(address(3), 2);
        assertEq(_bal, 1);
    }

    function testSetDayUri() public {
        testMint();
        vm.prank(address(_admin));
        _schoolsNFT.setDayUri(2, "http://test.org/1");
        string memory _uri = _schoolsNFT.getDayUri(2);
        assertEq(_uri, "http://test.org/1");
    }
}
