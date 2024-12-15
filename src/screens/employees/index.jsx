import { useState } from "react";
import "./styles.css";
import Button from "../../components/Button";
import AddEmployee from "./AddEmployee";

// Dummy employee data (replace with your actual API data)
const dummyEmployees = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    department: "HR",
    designation: "Manager",
    role: "Admin",
    cardNo: "12345",
    skills: "Communication",
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
    department: "IT",
    designation: "Developer",
    role: "User",
    cardNo: "67890",
    skills: "JavaScript",
  },
  {
    id: 3,
    firstname: "Sam",
    lastname: "Brown",
    department: "Finance",
    designation: "Analyst",
    role: "User",
    cardNo: "11223",
    skills: "Excel",
  },
  // More dummy data here
];

const Employees = () => {
  const [employees, setEmployees] = useState(dummyEmployees);
  const [newEmployee, setNewEmployee] = useState({
    firstname: "",
    lastname: "",
    department: "",
    designation: "",
    role: "",
    cardNo: "",
    skills: "",
  });

  const [showAddEmployee, setShowAddEmployee] = useState(false);

  // Handle changes in the form inputs for new employee
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Add a new employee to the list
  const addEmployee = () => {
    const updatedEmployees = [...employees, { id: Date.now(), ...newEmployee }];
    setEmployees(updatedEmployees);
    setShowAddEmployee(false); // Close the modal after adding
    setNewEmployee({
      firstname: "",
      lastname: "",
      department: "",
      designation: "",
      role: "",
      cardNo: "",
      skills: "",
    });
  };

  // Handle editing employee (you can implement it to modify employee details)
  const handleEdit = (id) => {
    const employeeToEdit = employees.find((emp) => emp.id === id);
    console.log("Editing employee:", employeeToEdit);
    // Add logic to edit employee (e.g., open a modal with employee details)
  };

  return (
    <div className="employees-container">
      <div className="header">
        <Button variant="success" onClick={() => setShowAddEmployee(true)}>
          Add New Employee
        </Button>
      </div>

      {/* Employee Table */}
      <div className="employees-table">
        <table>
          <thead>
            <tr>
              <th>Emp Id</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Card No</th>
              <th>Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>
                  {emp.firstname} {emp.lastname}
                </td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{emp.cardNo}</td>
                <td>{emp.skills}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleEdit(emp.id)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddEmployee
        open={showAddEmployee}
        onClose={() => setShowAddEmployee(false)}
        handleSave={addEmployee}
        newEmployee={newEmployee}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Employees;
