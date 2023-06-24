// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../src/Attendify.sol";
import "../src/SchoolsNFT.sol";

contract AttendifyDeployer {
    address public Admin;
    address organisationAdmin;
    address[] public Organisations;
    mapping(address => bool) public validOrganisation;

    struct individual {
        address _address;
        string _name;
    }

    mapping(address => mapping(address => uint))
        public studentOrganisationIndex;
    mapping(address => address[]) public memberOrganisations;
    mapping(address => bool) public uniqueStudent;
    uint public totalStudent;

    constructor() {
        Admin = msg.sender;
    }

    function createAttendify(
        string memory _organisation,
        string memory _cohort
    ) public {
        organisationAdmin = msg.sender;
        Attendify OrganisationAddress = new Attendify(
            _organisation,
            _cohort,
            organisationAdmin
        );
        organisations.push(address(OrganisationAddress));
        validOrganisation[address(OrganisationAddress)] = true;

        SchoolsNFT OrganisationNFT = new SchoolsNFT(
            _organisation,
            _cohort,
            address(OrganisationAddress)
        );

        OrganisationAddress.initialize(address(OrganisationNFT));
    }

    function register(individual[]) public {
        require(
            validOrganisation[msg.sender] == true,
            "unauthorized Operation"
        );
        uint individualLength = indvidual.length;
        for (i = 0; i <= individualLength; i++) {
            address uniqueStudentAddr = individual[i].address;
            uint orgLength = memberOrganisations[uniqueStudentAddr].length;
            studentOrganisationIndex[uniqueStudentAddr][msg.sender] = orgLength;
            memberOrganisations[uniqueStudentAddr].push(msg.sender);
            if (uniqueStudent[uniqueStudentAddr] == false) {
                totalStudent++;
                uniqueStudent[uniqueStudentAddr] = true;
            }
        }
    }

    function revoke(individual[]) public {
        require(
            validOrganisation[msg.sender] == true,
            "unauthorized Operation"
        );
        uint individualLength = indvidual.length;
        for (i = 0; i <= individualLength; i++) {
            address uniqueIndividual = individual[i].address;
            uint organisationIndex = studentOrganisationIndex[uniqueIndividual][
                msg.sender
            ];
            uint orgLength = memberOrganisations[uniqueIndividual].length;
            memberOrganisations[uniqueIndividual][
                organisationIndex
            ] = memberOrganisations[uniqueIndividual][orgLength - 1];
            memberOrganisations[uniqueIndividual].pop;
        }
    }

    function getTotalStudents() public returns (uint) {
        return totalStudent;
    }

    function getStudentOrganisatons(
        address _studentAddress
    ) public returns (memberOrganisations[]) {
        return (memberOrganisations[_studentAddress]);
    }
}
