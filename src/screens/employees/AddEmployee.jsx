import Button from "../../components/Button";
import Modal from "../../components/Modal";

const AddEmployee = ({
  open,
  onClose,
  handleSave,
  newEmployee,
  handleChange,
}) => {
  const departments = [
    "ASSOCIATE",
    "ASST MANAGER-I",
    "ASST. GENERAL MANAGER-II",
    "ASST. MANAGER-II",
    "EXECUTIVE -I",
    "EXECUTIVE -II",
    "EXECUTIVE -III",
    "GENERAL MANAGER-I",
    "MANAGER-I",
    "MANAGER-II",
    "TRAINEE D.E.T AND G.E.T",
    "VICE PRESIDENT",
    "OPERATOR",
  ];

  const designations = [
    "ASSOCIATE",
    "ASST MANAGER-I",
    "ASST. GENERAL MANAGER-II",
    "ASST. MANAGER-II",
    "EXECUTIVE -I",
    "EXECUTIVE -II",
    "EXECUTIVE -III",
    "GENERAL MANAGER-I",
    "MANAGER-I",
    "MANAGER-II",
    "TRAINEE D.E.T AND G.E.T",
    "VICE PRESIDENT",
    "OPERATOR",
  ];

  const roles = ["Admin", "HR", "Operator", "Trainer"];

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
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
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
          {designations.map((value, index) => (
            <option key={index} value={value}>
              {value}
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
          name="role"
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
        {/* <label>Role/Permission</label>
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
        </div> */}
      </form>
    </Modal>
  );
};

export default AddEmployee;
