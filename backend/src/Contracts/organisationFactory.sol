// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./organisation.sol";
import "./SchoolsNFT.sol";

contract organisationFactory {
    address public Admin;
    address organisationAdmin;
    address[] public Organisations;
    mapping(address => bool) public validOrganisation;

    mapping(address => mapping(address => uint))
        public studentOrganisationIndex;
    mapping(address => address[]) public memberOrganisations;
    mapping(address => bool) public uniqueStudent;
    uint public totalUsers;

    constructor() {
        Admin = msg.sender;
    }

    function createorganisation(
        string memory _organisation,
        string memory _cohort,
        string memory _uri,
        string memory _adminName
    ) external returns (address Organisation, address Nft) {
        organisationAdmin = msg.sender;
        organisation OrganisationAddress = new organisation(
            _organisation,
            _cohort,
            organisationAdmin,
            _adminName
        );
        Organisations.push(address(OrganisationAddress));
        validOrganisation[address(OrganisationAddress)] = true;

        SchoolsNFT OrganisationNFT = new SchoolsNFT(
            _organisation,
            _cohort,
            _uri,
            address(OrganisationAddress)
        );

        OrganisationAddress.initialize(address(OrganisationNFT));
        uint orgLength = memberOrganisations[msg.sender].length;
        studentOrganisationIndex[msg.sender][
            address(OrganisationAddress)
        ] = orgLength;
        memberOrganisations[msg.sender].push(address(OrganisationAddress));

        Nft = address(OrganisationNFT);
        Organisation = address(OrganisationAddress);
    }

    function register(individual[] calldata _individual) public {
        require(
            validOrganisation[msg.sender] == true,
            "unauthorized Operation"
        );
        uint individualLength = _individual.length;
        for (uint i; i < individualLength; i++) {
            address uniqueStudentAddr = _individual[i]._address;
            uint orgLength = memberOrganisations[uniqueStudentAddr].length;
            studentOrganisationIndex[uniqueStudentAddr][msg.sender] = orgLength;
            memberOrganisations[uniqueStudentAddr].push(msg.sender);
            if (uniqueStudent[uniqueStudentAddr] == false) {
                totalUsers++;
                uniqueStudent[uniqueStudentAddr] = true;
            }
        }
    }

    function revoke(address[] calldata _individual) public {
        require(
            validOrganisation[msg.sender] == true,
            "unauthorized Operation"
        );
        uint individualLength = _individual.length;
        for (uint i; i < individualLength; i++) {
            address uniqueIndividual = _individual[i];
            uint organisationIndex = studentOrganisationIndex[uniqueIndividual][
                msg.sender
            ];
            uint orgLength = memberOrganisations[uniqueIndividual].length;

            // address[] storage individualOrganisations = memberOrganisations[
            //     uniqueIndividual
            // ];
            // individualOrganisations[
            //     organisationIndex
            // ] = individualOrganisations[orgLength - 1];
            // individualOrganisations.pop();
            // memberOrganisations[uniqueIndividual] = individualOrganisations;

            memberOrganisations[uniqueIndividual][
                organisationIndex
            ] = memberOrganisations[uniqueIndividual][orgLength - 1];
            memberOrganisations[uniqueIndividual].pop();
        }
    }

    function getUsersStudents() public view returns (uint) {
        return totalUsers;
    }

    function getOrganizations() public view returns (address[] memory) {
        return Organisations;
    }

    function getUserOrganisatons(
        address _userAddress
    ) public view returns (address[] memory) {
        return (memberOrganisations[_userAddress]);
    }
}
