// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Attendify {
    /**
     * ============================================================ *
     * --------------------- ORGANIZATION RECORD------------------- *
     * ============================================================ *
     */
    string organization;
    string cohort;
    address AttendifyContract;
    uint[] LectureIdCollection;

    struct lectureData {
        string topic;
        uint lectureId;
    }

    /**
     * ============================================================ *
     * --------------------- STUDENTS RECORD------------------- *
     * ============================================================ *
     */
    address[] students;
    mapping(address => individual) studentsData;
    mapping(address => uint) indexInStudentsArray;

    /**
     * ============================================================ *
     * --------------------- STAFFS RECORD-------------------------- *
     * ============================================================ *
     */
    address moderator;
    address mentorOnDuty;
    address[] mentors;
    mapping(address => uint) indexInMentorsArray;
    mapping(address => bool) isStaff;
    mapping(address => individual) mentorsData;
    struct individual {
        address _address;
        string _name;
    }

    // MODIFIERS
    modifier onlyModerator() {
        require(msg.sender == moderator, "NOT MODERATOR");
        _;
    }
    modifier onlyMentorOnDuty() {
        require(msg.sender == mentorOnDuty, "NOT MODERATOR ON DUTY");
        _;
    }

    modifier onlyStaff() {
        require(
            msg.sender == moderator || isStaff[msg.sender] == true,
            "NOT MODERATOR"
        );
        _;
    }

    // @dev: constructor initialization
    // @params: _organization: Name of company,
    // @params: _cohort: Name of specific Cohort/ Program,
    constructor(string memory _organization, string memory _cohort) {
        moderator = msg.sender;
        organization = _organization;
        cohort = _cohort;
    }

    // @dev: Function to register staffs to be called only by the moderator
    // @params: staffList: An array of structs(individuals) consisting of name and wallet address of staffs.
    function registerStaffs(
        individual[] memory staffList
    ) external onlyModerator {
        uint staffLength = staffList.length;
        for (uint i; i < staffLength; i++) {
            if (isStaff[staffList[i]._address] == false) {
                mentorsData[staffList[i]._address] = staffList[i];
                isStaff[staffList[i]._address] = true;
                indexInMentorsArray[staffList[i]._address] = mentors.length;
                mentors.push(staffList[i]._address);
            }
        }
        // UCHE
        IAttendify(AttendifyContract).register(staffList);
    }

    // @dev: Function to register students to be called only by the moderator
    // @params: _studentList: An array of structs(individuals) consisting of name and wallet address of students.
    function registerStudents(
        individual[] memory _studentList
    ) external onlyModerator {
        uint studentLength = _studentList.length;
        for (uint i; i < studentLength; i++) {
            studentsData[_studentList[i]._address] = _studentList[i];
            indexInStudentsArray[_studentList[i]._address] = students.length;
            students.push(_studentList[i]._address);
        }
        // UCHE
        IAttendify(AttendifyContract).register(_studentList);
    }

    // @dev: Function to Create Id for a particular Lecture Day, this Id is to serve as Nft Id. Only callable by mentor on duty.
    // @params:  _lectureId: Lecture Id of choice, selected by mentor on duty.
    // @params:  _uri: Uri for the particular Nft issued to students that attended class for that day.
    // @params:  _topic: Topic covered for that particular day, its recorded so as to be displayed on students dashboard.
    function createId(
        uint _lectureId,
        bytes _uri,
        string _topic
    ) external onlyMentorOnDuty {}

    /// @dev Function for mentor to sign off and handover to the next mentor 
    function mentorHandOver() external {
        
    }
}
