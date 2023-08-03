// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Contracts/organisationFactory.sol";

contract DeployContracts is Script {
    organisationFactory _organisationFactory;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        // uint256 deployerPrivateKey2 = vm.envUint("PRIVATE_KEY2");
        vm.startBroadcast(deployerPrivateKey);
        _organisationFactory = new organisationFactory();
        (address Organisation, address OrganisationNft) = _organisationFactory
            .createorganisation("WEB3BRIDGE", "COHORT 9", "http://test.org", 'Abims');
        vm.stopBroadcast();
        writeAddressesToFile(
            address(_organisationFactory),
            "Organisation Factory"
        );
        writeAddressesToFile(Organisation, "Organisation Address");
        writeAddressesToFile(OrganisationNft, "Organisation NFTAddress");
    }

    function writeAddressesToFile(address addr, string memory text) public {
        string memory filename = "./deployed_contracts.txt";

        vm.writeLine(
            filename,
            "-------------------------------------------------"
        );
        vm.writeLine(filename, text);
        vm.writeLine(filename, vm.toString(addr));
        vm.writeLine(
            filename,
            "-------------------------------------------------"
        );
    }
}
