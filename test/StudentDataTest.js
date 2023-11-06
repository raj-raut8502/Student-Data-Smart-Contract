const StudentData = artifacts.require("StudentData");

contract("StudentData", (accounts) => {
  let studentDataContract;

  beforeEach(async () => {
    studentDataContract = await StudentData.new(); // Deploy a new contract instance for each test
  });

  it("should add a student", async () => {
    await studentDataContract.addStudent(1, "Alice", "Computer Science", "123-456-7890");
    const student = await studentDataContract.getStudentById(1);

    assert.equal(student[0], "Alice", "Student name not added correctly");
    assert.equal(student[1], "Computer Science", "Student department not added correctly");
    assert.equal(student[2], "123-456-7890", "Student mobile number not added correctly");
  });

  it("should get all students", async () => {
    await studentDataContract.addStudent(1, "Alice", "Computer Science", "123-456-7890");
    await studentDataContract.addStudent(2, "Bob", "Engineering", "987-654-3210");

    const allStudents = await studentDataContract.getAllStudents();

    assert.equal(allStudents.length, 2, "Number of students does not match");
    assert.equal(allStudents[0].name, "Alice", "Student 1 name not correct");
    assert.equal(allStudents[1].name, "Bob", "Student 2 name not correct");
  });

  it("should not add a student with an existing ID", async () => {
    await studentDataContract.addStudent(1, "Alice", "Computer Science", "123-456-7890");

    try {
      await studentDataContract.addStudent(1, "Eve", "Math", "555-555-5555");
      assert.fail("Adding a student with an existing ID should fail");
    } catch (error) {
      assert.include(error.message, "Student with this ID already exists", "Error message doesn't match");
    }
  });
});
