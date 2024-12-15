import React, { useState, useEffect } from "react";
import axiosInstance from "../../interceptor/axiosInstance";
import "./styles.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employees = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const employeesPerPage = 10; // Employees per page

  const [newEmployee, setNewEmployee] = useState({
    firstname: "",
    lastname: "",
    email:"",
    department: "",
    designation: "",
    skills: "",
    cardNo: "",
    is_employee: "",
    is_trainer: "",
    is_hr: "",
    is_support: "",
    is_marketing: "",
    is_sales: "",
    is_engineering: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch employee data from the API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_URL}/account/user/list/?page=${currentPage}`
        );
        const fetchedEmployees = response.data.results.map((emp, index) => ({
          id: (currentPage - 1) * employeesPerPage + index + 1, // Countdown ID
          firstname: emp.first_name,
          lastname: emp.last_name,
          department: emp.department,
          designation: emp.designation,
          cardNo: emp.card_number,
          skills: emp.is_employee ? "Employee Skills" : "General Skills",
        }));
        setEmployees(fetchedEmployees);
        setTotalPages(Math.ceil(response.data.count / employeesPerPage)); // Calculate total pages
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, [currentPage]);

  // Handle changes in the form inputs for new employee
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle radio button logic (update to boolean)
    if (type === "radio") {
      setNewEmployee({ ...newEmployee, [name]: checked ? true : false });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  // Add a new employee to the list
  const addEmployee = async () => {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/account/add/employee/`,
        {
          first_name: newEmployee.firstname,
          last_name: newEmployee.lastname,
          email:newEmployee.email,
          department: newEmployee.department,
          designation: newEmployee.designation,
          skills: newEmployee.skills,
          card_number: newEmployee.cardNo,
          is_employee: newEmployee.is_employee,
          is_trainer: newEmployee.is_trainer,
          is_hr: newEmployee.is_hr,
          is_support: newEmployee.is_support,
          is_marketing: newEmployee.is_marketing,
          is_sales: newEmployee.is_sales,
          is_engineering: newEmployee.is_engineering,
        }
      );
      // Optionally, add the new employee to the local state after successful API call
      setEmployees([...employees, response.data]);
      setIsModalVisible(false); // Close the modal after adding
      setNewEmployee({
        firstname: "",
        lastname: "",
        email:"",
        department: "",
        designation: "",
        skills: "",
        cardNo: "",
        is_employee: "",
        is_trainer: "",
        is_hr: "",
        is_support: "",
        is_marketing: "",
        is_sales: "",
        is_engineering: "",
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Handle error messages returned by the API
        const errorMessage = error.response.data.error;
  
        if (errorMessage.includes('already Exists')) {
          // Email or card number already exists error
          toast.error(errorMessage); // Show an alert, or you can update the UI with this message
        } else if (errorMessage.includes('Blank')) {
          // Blank email error
          toast.error(errorMessage); // Show an alert, or update the UI with this message
        } else {
          // Generic error
          toast.error('An error occurred while adding the employee. Please try again.');
        }
      } else {
        // Network error or no response from the server
        toast.warning('Network error. Please try again.');
      }
    }
  };

  // Open and close modal for adding a new employee
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  // Handle editing employee (you can implement it to modify employee details)
  const handleEdit = (id) => {
    const employeeToEdit = employees.find((emp) => emp.id === id);
    console.log("Editing employee:", employeeToEdit);
    // Add logic to edit employee (e.g., open a modal with employee details)
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Pagination logic to display only 2-3 buttons
  const renderPaginationButtons = () => {
    let pageNumbers = [];

    // Show first page
    pageNumbers.push(1);

    // Show previous page and next page for current
    if (currentPage > 1) pageNumbers.push(currentPage - 1);
    pageNumbers.push(currentPage);
    if (currentPage < totalPages) pageNumbers.push(currentPage + 1);

    // Show last page if not already included
    if (totalPages > 1 && !pageNumbers.includes(totalPages))
      pageNumbers.push(totalPages);

    return pageNumbers;
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
                <td>
                  {emp.firstname} {emp.lastname}
                </td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{emp.cardNo}</td>
                <td>{emp.skills}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(emp.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Render pagination buttons */}
        {renderPaginationButtons().map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-btn ${
              currentPage === pageNumber ? "active" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
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
                name="email"
                placeholder="Email"
                value={newEmployee.email}
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
                name="skills"
                placeholder="Skills"
                value={newEmployee.skills}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cardNo"
                placeholder="Card Number"
                value={newEmployee.cardNo}
                onChange={handleChange}
              />

              <label>Role/Permission</label>
              <div className="role-options">
                <label>
                  <input
                    type="radio"
                    name="is_employee"
                    value="true"
                    checked={newEmployee.is_employee}
                    onChange={handleChange}
                  />
                  Employee
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_trainer"
                    value="true"
                    checked={newEmployee.is_trainer}
                    onChange={handleChange}
                  />
                  Trainer
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_hr"
                    value="true"
                    checked={newEmployee.is_hr}
                    onChange={handleChange}
                  />
                  HR
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_support"
                    value="true"
                    checked={newEmployee.is_support}
                    onChange={handleChange}
                  />
                  Support
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_marketing"
                    value="true"
                    checked={newEmployee.is_marketing}
                    onChange={handleChange}
                  />
                  Marketing
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_sales"
                    value="true"
                    checked={newEmployee.is_sales}
                    onChange={handleChange}
                  />
                  Sales
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_engineering"
                    value="true"
                    checked={newEmployee.is_engineering}
                    onChange={handleChange}
                  />
                  Engineering
                </label>
              </div>
            </form>

            <div className="modal-actions">
              <button className="save-btn" onClick={addEmployee}>
                Save
              </button>
              <button className="cancel-btn" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

<ToastContainer
        position="top-right" // Position of the toast (top-right, top-center, etc.)
        autoClose={5000} // Duration before the toast disappears (in ms)
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Newest toast appears on top
        closeOnClick // Close on click
        rtl={false} // Right-to-left display
        pauseOnFocusLoss // Pause on focus loss
        draggable // Allow dragging to dismiss the toast
        pauseOnHover // Pause on hover
      />


    </div>
  );
};

export default Employees;
