import Button from "../../components/Button";
import Modal from "../../components/Modal";

const CreateBatch = ({
  open,
  onClose,
  newBatch,
  departments,
  users,
  handleSave,
  handleChange,
  handleDepartmentChange,
  handleUserSelection,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Batch"
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
          name="name"
          placeholder="Batch Name"
          className="w-full mb-2"
          value={newBatch.name}
          onChange={handleChange}
        />
        <select
            name="trainer"
            className="w-full mb-2"
            placeholder="Trainer Name"
            value={newBatch.trainer}
            onChange={handleDepartmentChange}
          >
            <option value="">Select Trainer</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))}
          </select>
        
          <select
            name="department"
            className="w-full mb-2"
            value={newBatch.department}
            onChange={handleDepartmentChange}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name} {/* Render department name */}
              </option>
            ))}
          </select>

          <select
            name="users"
            multiple
            value={newBatch.users}
            className="w-full mb-2"
            onChange={handleUserSelection}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name} {/* Render user first and last name */}
              </option>
            ))}
          </select>
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          className="w-full mb-2"
          value={newBatch.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="targetDate"
          placeholder="Target Date"
          className="w-full mb-2"
          value={newBatch.targetDate}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
};

export default CreateBatch;
