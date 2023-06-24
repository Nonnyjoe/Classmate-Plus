// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../src/Attendify.sol";

contract AttendifyDeployer {
    address public Admin;
    address organisationAdmin;
    Attendify[] public Organisations;

    constructor() {
        Admin = msg.sender;
    }

    function createAttendify(
        string memory _organisation,
        string memory _cohort,
        address _AttendifyContract
    ) public {
        organisationAdmin = msg.sender;
        Attendify OrganisationAddress = new Attendify(
            _organisation,
            _cohort,
            _AttendifyContract
        );
    }
}
