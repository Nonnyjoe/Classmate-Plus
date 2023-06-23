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
    address NftContract;

    /**
     * ============================================================ *
     * --------------------- ATTENDANCE RECORD------------------- *
     * ============================================================ *
     */
    uint[] LectureIdCollection;
    mapping(uint => lectureData) lectureInstance;
    mapping(uint => bool) lectureIdUsed;
    struct lectureData {
        address mentorOnDuty;
        string topic;
        bytes uri;
        uint attendanceStartTime;
        uint studentsPresent;
        bool status;
    }

    /**
     * ============================================================ *
     * --------------------- STUDENTS RECORD------------------- *
     * ============================================================ *
     */
    address[] students;
    mapping(address => individual) studentsData;
    mapping(address => uint) indexInStudentsArray;
    mapping(address => uint) studentsTotalAttendance;
    mapping(address => bool) isStudent;
    mapping(address => mapping(uint => bool)) IndividualAttendanceRecord;

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
    modifier onlyStudents() {
        require(isStudent[msg.sender] == true, "NOT A VALID STUDENT");
        _;
    }

    modifier onlyStaff() {
        require(
            msg.sender == moderator || isStaff[msg.sender] == true,
            "NOT MODERATOR"
        );
        _;
    }

    // ERRORS
    error lecture_id_already_used();
    error not_Autorized_Caller();
    error Invalid_Lecture_Id();
    error Lecture_id_closed();
    error Already_Signed_Attendance_For_Id();

    // @dev: constructor initialization
    // @params: _organization: Name of company,
    // @params: _cohort: Name of specific Cohort/ Program,
    constructor(
        string memory _organization,
        string memory _cohort,
        address _AttendifyContract
    ) {
        moderator = msg.sender;
        organization = _organization;
        cohort = _cohort;
        AttendifyContract = _AttendifyContract;
    }

    function initialize(address _NftContract) external {
        if (msg.sender != AttendifyContract) revert not_Autorized_Caller();
        NftContract = _NftContract;
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
            isStudent[_studentList[i]._address] = true;
        }
        // UCHE
        IAttendify(AttendifyContract).register(_studentList);
    }

    // @dev: Function to Create Id for a particular Lecture Day, this Id is to serve as Nft Id. Only callable by mentor on duty.
    // @params:  _lectureId: Lecture Id of choice, selected by mentor on duty.
    // @params:  _uri: Uri for the particular Nft issued to students that attended class for that day.
    // @params:  _topic: Topic covered for that particular day, its recorded so as to be displayed on students dashboard.
    function createAttendance(
        uint _lectureId,
        bytes _uri,
        string _topic
    ) external onlyMentorOnDuty {
        if (lectureIdUsed[_lectureId] == true) revert lecture_id_already_used();
        lectureIdUsed[_lectureId] = true;
        LectureIdCollection.push(_lectureId);
        lectureInstance[_lectureId].uri = _uri;
        lectureInstance[_lectureId].topic = _topic;
        lectureInstance[_lectureId].mentorOnDuty = msg.sender;

        // NONSO GENESIS
        IERC1155(NftContract).setDayUri(_lectureId, _uri);
    }

    function signAttendance(uint _lectureId) external onlyStudents {
        if (lectureIdUsed[_lectureId] == false) revert Invalid_Lecture_Id();
        if (lectureInstance[_lectureId].status == false)
            revert Lecture_id_closed();
        if (IndividualAttendanceRecord[msg.sender][_lectureId] = true)
            revert Already_Signed_Attendance_For_Id();
        if (lectureInstance[_lectureId].attendanceStartTime == 0) {
            lectureInstance[_lectureId].attendanceStartTime = block.timestamp;
        }
        IndividualAttendanceRecord[msg.sender][_lectureId] = true;
        studentsTotalAttendance[msg.sender] =
            studentsTotalAttendance[msg.sender] +
            1;
        lectureInstance[_lectureId].studentsPresent =
            lectureInstance[_lectureId].studentsPresent +
            1;

        // NONSO GENESIS
        IERC1155(NftContract).mint(msg.sender, _lectureId, 1);
    }

// @dev Function for mentors to hand over to the next mentor to take the class
    function handover(uint _lectureId) external  onlyMentorOnDuty returns(bool) {

    }
}
