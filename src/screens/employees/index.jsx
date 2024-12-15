import { useState, useEffect } from "react";
import axiosInstance from "../../interceptor/axiosInstance";
import "./styles.css";
import Button from "../../components/Button";
import AddEmployee from "./AddEmployee";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employees = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const employeesPerPage = 10; // Employees per page

  const [newEmployee, setNewEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
    designation: "",
    skills: "",
    cardNo: "",
    role: "",
    is_employee: "",
    is_trainer: "",
    is_hr: "",
    is_support: "",
    is_marketing: "",
    is_sales: "",
    is_engineering: "",
  });

  const [showAddEmployee, setShowAddEmployee] = useState(false);

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
          email: newEmployee.email,
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
      setShowAddEmployee(false); // Close the modal after adding
      setNewEmployee({
        firstname: "",
        lastname: "",
        email: "",
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

        if (errorMessage.includes("already Exists")) {
          // Email or card number already exists error
          toast.error(errorMessage); // Show an alert, or you can update the UI with this message
        } else if (errorMessage.includes("Blank")) {
          // Blank email error
          toast.error(errorMessage); // Show an alert, or update the UI with this message
        } else {
          // Generic error
          toast.error(
            "An error occurred while adding the employee. Please try again."
          );
        }
      } else {
        // Network error or no response from the server
        toast.warning("Network error. Please try again.");
      }
    }
  };

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
                    variant="warning"
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

      {/* Pagination Controls */}
      <div className="flex flex-end gap-8 mt-2">
        <Button
          variant="secondary"
          size="small"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Render pagination buttons */}
        {renderPaginationButtons().map((pageNumber) => (
          <Button
            variant={
              currentPage === pageNumber ? "secondary" : "outline-secondary"
            }
            size="small"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}

        <Button
          variant="secondary"
          size="small"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <AddEmployee
        open={showAddEmployee}
        onClose={() => setShowAddEmployee(false)}
        handleSave={addEmployee}
        newEmployee={newEmployee}
        handleChange={handleChange}
      />
      {/* Add New Employee Modal */}

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
