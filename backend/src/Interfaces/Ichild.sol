// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "../Interfaces/IFactory.sol";

interface ICHILD {
    struct lectureData {
        address mentorOnDuty;
        string topic;
        string uri;
        uint attendanceStartTime;
        uint studentsPresent;
        bool status;
    }

    function registerStudents(individual[] calldata _studentList) external;

    function revoke(address[] calldata _individual) external;

    function liststudents() external view returns (address[] memory);

    function VerifyStudent(address _student) external view returns (bool);

    function getStudentName(
        address _student
    ) external view returns (string memory name);

    function registerStaffs(individual[] calldata staffList) external;

    function listMentors() external view returns (address[] memory);

    function VerifyMentor(address _mentor) external view returns (bool);

    function getMentorsName(
        address _Mentor
    ) external view returns (string memory name);

    function createAttendance(
        bytes calldata _lectureId,
        string calldata _uri,
        string calldata _topic
    ) external;

    function mentorHandover(address newMentor) external;

    function getMentorOnDuty() external view returns (address);

    function signAttendance(bytes calldata _lectureId) external;

    function openAttendance(bytes calldata  _lectureId) external;

    function getNameArray(address[] calldata _students) external view returns (string[] memory);

    function getStudentAttendanceRatio(
        address _student
    ) external view returns (uint attendace, uint TotalClasses);

    function listClassesAttended(
        address _student
    ) external view returns (uint[] memory);

    function getLectureIds() external view returns (uint[] memory);

    function getLectureData(
        bytes calldata _lectureId
    ) external view returns (lectureData memory);

    function EvictStudents(address[] calldata studentsToRevoke) external;
    function MintCertificate(string memory Uri) external;
}
