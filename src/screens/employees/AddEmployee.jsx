import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import axiosInstance from "../../interceptor/axiosInstance";
const API_URL = import.meta.env.VITE_API_URL;

const AddEmployee = ({
  open,
  onClose,
  handleSave,
  newEmployee,
  handleChange,
}) => {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const roles = ["Admin", "HR", "Operator", "Trainer"];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/account/department/list/`);
        setDepartments(response.data); // Keep full object with id and name
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/account/designation/list/`);
        setDesignations(response.data); // Keep full object with id and name
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchDepartments();
    fetchDesignations();
  }, []);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Employee"
      actions={
        <>
          <Button variant="outline" size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="small" onClick={handleSave}>
            Save
          </Button>
        </>
      }
    >
      <form>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          className="w-full mb-2"
          value={newEmployee.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          className="w-full mb-2"
          value={newEmployee.lastname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="w-full mb-2"
          value={newEmployee.email}
          onChange={handleChange}
        />
        <select
          name="department"
          value={newEmployee.department}
          className="w-full mb-2"
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        <select
          name="designation"
          value={newEmployee.designation}
          className="w-full mb-2"
          onChange={handleChange}
        >
          <option value="">Select Designation</option>
          {designations.map((desig) => (
            <option key={desig.id} value={desig.id}>
              {desig.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          className="w-full mb-2"
          value={newEmployee.skills}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cardNo"
          placeholder="Card Number"
          className="w-full mb-2"
          value={newEmployee.cardNo}
          onChange={handleChange}
        />
        <select
          name="roles"
          value={newEmployee.role}
          className="w-full mb-2"
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          {roles.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </form>
    </Modal>
  );
};

export default AddEmployee;
