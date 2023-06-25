// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import "forge-std/Test.sol";
// import "../src/Contracts/Attendify.sol";

// contract AttendifyTest is Test {
//     Attendify attendify;

//     address moderator = makeAddr(moderator);
//     address mentor1 = makeAddr(mentor1);
//     address mentor2 = makeAddr(mentor2);
//     address student = makeAddr(student);
//     address[] studentlist = [];
//     address[] staffList = [];

//     function setUp() public {
//         attendify = new Attendify();
//     }

//     function test_createSchool() public {
//         vm.prank(moderator);
//     }

//     function test_registerStaff() public {
//         test_createSchool();

//         vm.prank(moderator);
//         attendify.registerStaffs(staffList);
//     }

//     function test_registerStudents() public {
//         test_createSchool();

//         vm.prank(moderator);
//         attendify.registerStudents(studentlist);
//     }

//     function test_createAttendance() public {
//         test_createSchool();
//         test_registerStaff();

//         uint _lectureId = 55;
//         bytes memory _uri;
//         string memory _topic = "";
//         vm.prank(mentor1);
//         attendify.createAttendance(_lectureId, _uri, _topic);
//     }

//     function test_OpenAttendance() public {
//         test_createSchool();
//         test_registerStaff();
//         test_createAttendance();

//         vm.prank(mentor1);
//         attendify.openAttendance(55);
//     }

//     function test_signAttendance() public {
//         test_createSchool();
//         test_registerStudents();
//         test_createAttendance();
//         test_OpenAttendance();

//         vm.prank(student);
//         attendify.signAttendance(55);
//     }

//     function test_handoverMentor() public {
//         test_createSchool();
//         test_registerStaff();

//         vm.prank(mentor1);
//         attendify.mentorHandover(55);
//     }
// }
