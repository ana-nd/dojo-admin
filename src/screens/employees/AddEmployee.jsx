import Button from "../../components/Button";
import Modal from "../../components/Modal";

const AddEmployee = ({
  open,
  onClose,
  handleSave,
  newEmployee,
  handleChange,
}) => {
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
          name="department"
          placeholder="Department"
          className="w-full mb-2"
          value={newEmployee.department}
          onChange={handleChange}
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          className="w-full mb-2"
          value={newEmployee.designation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          className="w-full mb-2"
          value={newEmployee.role}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cardNo"
          className="w-full mb-2"
          placeholder="Card Number"
          value={newEmployee.cardNo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills"
          className="w-full mb-2"
          value={newEmployee.skills}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
};

export default AddEmployee;
