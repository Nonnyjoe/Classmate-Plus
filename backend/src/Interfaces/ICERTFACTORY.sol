// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ICERTFACTORY {
    function completePackage(string memory Name, string memory Symbol, string memory Uri, address _Admin) external returns (address newCertificateAdd, address newSchoolsNFT);
}
