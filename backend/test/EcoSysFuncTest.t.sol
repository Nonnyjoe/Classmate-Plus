// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Interfaces/Ichild.sol";
import "../src/Interfaces/IFactory.sol";
import "../src/Contracts/organizations/organisationFactory.sol";
import "../src/Contracts/certificates/certificateFactory.sol";
// import "../src/Contracts/SchoolsNFT.sol";

contract EcosystemTest is Test {
    organisationFactory _organisationFactory;
    certificateFactory _certificateFactory;

    individual student1;
    individual[] students;
    individual mentor;
    individual[] mentors;
    address[] studentsToEvict;
    address[] nameCheck;
    address mentorAdd = 0xfd182E53C17BD167ABa87592C5ef6414D25bb9B4;
    address studentAdd = 0x13B109506Ab1b120C82D0d342c5E64401a5B6381;
    address director = 0xA771E1625DD4FAa2Ff0a41FA119Eb9644c9A46C8;

    function setUp() public {
        vm.prank(director);
        _certificateFactory = new certificateFactory();
        _organisationFactory = new organisationFactory(address(_certificateFactory));
        student1._address = address(studentAdd);
        student1._name = "JOHN DOE";
        students.push(student1);

        mentor._address = address(mentorAdd);
        mentor._name = "MR. ABIMS";
        mentors.push(mentor);
    }

    function testCohortCreation() public {
        vm.startPrank(director);
        (address Organisation, address OrganisationNft, address OrganizationCert) = _organisationFactory
            .createorganisation("WEB3BRIDGE", "COHORT 9", "http://test.org", "Abims");

        address[] memory creatorsOrganizations = _organisationFactory
            .getUserOrganisatons(director);
        console.log(creatorsOrganizations[0]);
        assertEq(Organisation, creatorsOrganizations[0]);
        vm.stopPrank();
    }

    function testStudentRegister() public {
        testCohortCreation();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).registerStudents(students);
        address[] memory studentsList = ICHILD(child).liststudents();
        bool studentStatus = ICHILD(child).VerifyStudent(studentAdd);
        string memory studentName = ICHILD(child).getStudentName(studentAdd);
        assertEq(1, studentsList.length);
        assertEq(true, studentStatus);
        assertEq("JOHN DOE", studentName);
        vm.stopPrank();
    }

    function testZGetStudentsNamesArray() public {
        testStudentRegister();
        nameCheck.push(studentAdd);
        nameCheck.push(mentorAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        string[] memory studentsName = ICHILD(child).getNameArray(nameCheck);
        assertEq(studentsName[0], "JOHN DOE");
        assertEq(studentsName[1], "UNREGISTERED");
        console.log(studentsName[0]);
        console.log(studentsName[1]);
    }

    function testCreatorsName() public {
        testStudentRegister();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
       string memory admin = ICHILD(child).getMentorsName(director);
       console.log(admin);
        assertEq("Abims", admin);


    }

    function testMentorRegister() public {
        testStudentRegister();
        vm.startPrank(director);

        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).registerStaffs(mentors);
        address[] memory studentsList = ICHILD(child).listMentors();

        bool mentorStatus = ICHILD(child).VerifyMentor(mentorAdd);
        string memory mentorName = ICHILD(child).getMentorsName(mentorAdd);

        assertEq(2, studentsList.length);
        assertEq(true, mentorStatus);
        assertEq("MR. ABIMS", mentorName);
    }

    function testFail_MentorIsNotOnDuty() public {
        testMentorRegister();
        vm.startPrank(mentorAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).createAttendance(
            "B0202",
            "http://test.org",
            "INTRODUCTION TO BLOCKCHAIN"
        );

        vm.stopPrank();
    }

    function testMentorHandOver() public {
        testStudentRegister();
        vm.startPrank(director);

        address child = _organisationFactory.getUserOrganisatons(director)[0];
        address mentorOnDuty1 = ICHILD(child).getMentorOnDuty();
        ICHILD(child).mentorHandover(mentorAdd);
        address mentorOnDuty = ICHILD(child).getMentorOnDuty();

        assertEq(mentorOnDuty1, director);
        assertEq(mentorOnDuty, mentorAdd);
        vm.stopPrank();
    }

    function testCreateAttendance() public {
        testMentorHandOver();
        vm.startPrank(mentorAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).createAttendance(
            "B0202",
            "http://test.org",
            "INTRODUCTION TO BLOCKCHAIN"
        );

        vm.stopPrank();
    }

    function testFail_TakeAttendaceBeforeClass() public {
        testCreateAttendance();
        vm.startPrank(studentAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).signAttendance("B0202");
        vm.stopPrank();
    }

    function testFail_StudentOpenAttendace() public {
        testCreateAttendance();
        vm.startPrank(studentAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).openAttendance("B0202");
        vm.stopPrank();
    }

    function testFail_StudentSignWrongAttendance() public {
        testCreateAttendance();
        vm.startPrank(mentorAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).openAttendance("B0202");
        vm.stopPrank();
        vm.startPrank(studentAdd);
        ICHILD(child).signAttendance("B0205");
    }

    function testSignAttendance() public {
        testCreateAttendance();
        vm.startPrank(mentorAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).openAttendance("B0202");
        vm.stopPrank();

        vm.startPrank(studentAdd);
        ICHILD(child).signAttendance("B0202");
        vm.stopPrank();
    }

    function testStudentsAttendanceData() public {
        testSignAttendance();
        vm.startPrank(mentorAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        (uint attendace, uint totalClasses) = ICHILD(child)
            .getStudentAttendanceRatio(studentAdd);

        uint[] memory lectures = ICHILD(child).getLectureIds();
        ICHILD.lectureData memory lectureData = ICHILD(child).getLectureData(
            "B0202"
        );

        assertEq(attendace, totalClasses);
        assertEq(lectures.length, 1);
        // assertEq(lectures[0], "B0202");
        assertEq(lectureData.topic, "INTRODUCTION TO BLOCKCHAIN");
        assertEq(lectureData.mentorOnDuty, mentorAdd);
        assertEq(lectureData.uri, "http://test.org");
        assertEq(lectureData.attendanceStartTime, 1);
        assertEq(lectureData.studentsPresent, 1);
        assertEq(lectureData.status, true);
    }

    function testZEvictStudent() public {
        testSignAttendance();
        vm.startPrank(director);
        studentsToEvict.push(studentAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).EvictStudents(studentsToEvict);

        address[] memory studentsList = ICHILD(child).liststudents();
        address[] memory studentOrganizations = _organisationFactory
            .getUserOrganisatons(studentAdd);
        bool studentStatus = ICHILD(child).VerifyStudent(studentAdd);
        assertEq(0, studentOrganizations.length);
        assertEq(0, studentsList.length);
        assertEq(false, studentStatus);
    }

    function testFail_EvictedStudentSignAttendance() public {
        testZEvictStudent();
        vm.startPrank(mentorAdd);
        address child = _organisationFactory.getUserOrganisatons(director)[0];

        ICHILD(child).createAttendance(
            "B0202",
            "http://test.org",
            "BLOCKCHAIN TRILEMA"
        );
        ICHILD(child).openAttendance("B0202");
        vm.stopPrank();

        vm.startPrank(studentAdd);
        ICHILD(child).signAttendance("B0202");
        vm.stopPrank();
    }

    function testzCertificateIssuance() public {
        testSignAttendance();
        vm.startPrank(director);
        address child = _organisationFactory.getUserOrganisatons(director)[0];
        ICHILD(child).MintCertificate("http://test.org");
    }
}
