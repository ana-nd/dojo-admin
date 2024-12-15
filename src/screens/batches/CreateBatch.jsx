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
          name="department"
          className="w-full mb-2"
          value={newBatch.department}
          onChange={handleDepartmentChange}
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
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
              {user.name}
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
        <input
          type="text"
          name="trainer"
          placeholder="Trainer Name"
          className="w-full mb-2"
          value={newBatch.trainer}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
};

export default CreateBatch;
