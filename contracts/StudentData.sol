// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentData {
    struct Student {
        uint256 id;
        string name;
        string department;
        string mobileNumber;
    }

    Student[] public students;
    mapping(uint256 => uint256) studentIdToIndex;  // Mapping student ID to their index in the array

    event StudentAdded(uint256 id, string name, string department, string mobileNumber);

    function addStudent(uint256 _id, string memory _name, string memory _department, string memory _mobileNumber) public {
        require(studentIdToIndex[_id] == 0, "Student with this ID already exists");
        
        students.push(Student(_id, _name, _department, _mobileNumber));
        studentIdToIndex[_id] = students.length;
        
        emit StudentAdded(_id, _name, _department, _mobileNumber);
    }

    function getStudentById(uint256 _id) public view returns (string memory name, string memory department, string memory mobileNumber) {
        uint256 index = studentIdToIndex[_id];
        require(index > 0, "Student with this ID not found");
        
        Student storage student = students[index - 1];
        return (student.name, student.department, student.mobileNumber);
    }

    function getAllStudents() public view returns (Student[] memory) {
        return students;
    }

    fallback() external {
        revert("Fallback function: Not allowed");
    }
}
