// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import "forge-std/Test.sol";
// import "../src/Contracts/organisation.sol";

// contract organisationTest is Test {
//     organisation _organisation;

//     address moderator = makeAddr("moderator");
//     address mentor1 = makeAddr("mentor1");
//     address mentor2 = makeAddr("mentor2");
//     address student = makeAddr("student");

//     individual student1;
//     individual[] studentlist;
//     individual mentor;
//     individual[] staffList;

//     function setUp() public {
//         _organisation = new organisation("WEB3BRIDGE", "COHORT 9", moderator);

//         student1._address = address(student);
//         student1._name = "JOHN DOE";
//         studentlist.push(student1);

//         mentor._address = address(mentor1);
//         mentor._name = "MR. ABIMS";
//         staffList.push(mentor);
//     }

//     function test_createSchool() public {
//         console.log("test");
//     }

//     function test_registerStaff() public {
//         test_createSchool();

//         vm.prank(moderator);
//         _organisation.registerStaffs(staffList);
//     }

//     function test_registerStudents() public {
//         test_createSchool();

//         vm.prank(moderator);
//         _organisation.registerStudents(studentlist);
//     }

//     function test_createAttendance() public {
//         test_createSchool();
//         test_registerStaff();

//         uint _lectureId = 55;
//         string memory _uri;
//         string memory _topic = "";
//         vm.prank(mentor1);
//         _organisation.createAttendance(_lectureId, _uri, _topic);
//     }

//     function test_OpenAttendance() public {
//         test_createSchool();
//         test_registerStaff();
//         test_createAttendance();

//         vm.prank(mentor1);
//         _organisation.openAttendance(55);
//     }

//     function test_signAttendance() public {
//         test_createSchool();
//         test_registerStudents();
//         test_createAttendance();
//         test_OpenAttendance();

//         vm.prank(student);
//         _organisation.signAttendance(55);
//     }

//     function test_handoverMentor() public {
//         test_createSchool();
//         test_registerStaff();

//         vm.prank(mentor1);
//         _organisation.mentorHandover(mentor2);
//     }
// }
