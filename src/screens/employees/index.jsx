import React, { useState } from 'react';
import './styles.css';

// Dummy employee data (replace with your actual API data)
const dummyEmployees = [
  { id: 1, firstname: 'John', lastname: 'Doe', department: 'HR', designation: 'Manager', role: 'Admin', cardNo: '12345', skills: 'Communication' },
  { id: 2, firstname: 'Jane', lastname: 'Smith', department: 'IT', designation: 'Developer', role: 'User', cardNo: '67890', skills: 'JavaScript' },
  { id: 3, firstname: 'Sam', lastname: 'Brown', department: 'Finance', designation: 'Analyst', role: 'User', cardNo: '11223', skills: 'Excel' },
  // More dummy data here
];

const Employees = () => {
  const [employees, setEmployees] = useState(dummyEmployees);
  const [newEmployee, setNewEmployee] = useState({
    firstname: '',
    lastname: '',
    department: '',
    designation: '',
    role: '',
    cardNo: '',
    skills: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle changes in the form inputs for new employee
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Add a new employee to the list
  const addEmployee = () => {
    const updatedEmployees = [...employees, { id: Date.now(), ...newEmployee }];
    setEmployees(updatedEmployees);
    setIsModalVisible(false);  // Close the modal after adding
    setNewEmployee({ firstname: '', lastname: '', department: '', designation: '', role: '', cardNo: '', skills: '' });
  };

  // Open and close modal for adding a new employee
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  // Handle editing employee (you can implement it to modify employee details)
  const handleEdit = (id) => {
    const employeeToEdit = employees.find(emp => emp.id === id);
    console.log('Editing employee:', employeeToEdit);
    // Add logic to edit employee (e.g., open a modal with employee details)
  };

  return (
    <div className="employees-container">
      <div className="header">
        <button className="add-employee-btn" onClick={toggleModal}>
          Add New Employee
        </button>
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
                <td>{emp.firstname} {emp.lastname}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{emp.cardNo}</td>
                <td>{emp.skills}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(emp.id)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Employee Modal */}
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Employee</h2>
            <form>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={newEmployee.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={newEmployee.lastname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={newEmployee.department}
                onChange={handleChange}
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={newEmployee.designation}
                onChange={handleChange}
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={newEmployee.role}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cardNo"
                placeholder="Card Number"
                value={newEmployee.cardNo}
                onChange={handleChange}
              />
              <input
                type="text"
                name="skills"
                placeholder="Skills"
                value={newEmployee.skills}
                onChange={handleChange}
              />
            </form>
            <div className="modal-actions">
              <button className="save-btn" onClick={addEmployee}>Save</button>
              <button className="cancel-btn" onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
