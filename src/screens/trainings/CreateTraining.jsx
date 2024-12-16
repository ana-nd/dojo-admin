import Button from "../../components/Button";
import Modal from "../../components/Modal";

const CreateTraining = ({
  open,
  onClose,
  newTraining,
  handleSave,
  handleChange,
  handleTrainerChange,
  handleBatchChange,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Training"
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
          placeholder="Training Name"
          className="w-full mb-2"
          value={newTraining.name}
          onChange={handleChange}
        />
        <select
          name="trainer"
          className="w-full mb-2"
          placeholder="Trainer Name"
          value={newTraining.trainer}
          onChange={handleTrainerChange}
        >
          <option value="">Select Trainer</option>
          <option key={"trainer1"} value={"trainer1"}>
            Trainer 1
          </option>
          {/* {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name}
              </option>
            ))} */}
        </select>

        <select
          name="course"
          className="w-full mb-2"
          value={newTraining.course}
          onChange={handleChange}
        >
          <option value="">Select Course</option>
          <option key={"course"} value={"course"}>
            Course 1
          </option>
        </select>

        <select
          name="users"
          value={newTraining.batch}
          className="w-full mb-2"
          onChange={handleBatchChange}
        >
          <option value="">Select Batch</option>
          <option key={"batch"} value={"batch"}>
            Batch 1
          </option>
        </select>
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          className="w-full mb-2"
          value={newTraining.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="targetDate"
          placeholder="Target Date"
          className="w-full mb-2"
          value={newTraining.targetDate}
          onChange={handleChange}
        />
      </form>
    </Modal>
  );
};

export default CreateTraining;
