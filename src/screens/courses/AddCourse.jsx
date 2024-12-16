import Button from "../../components/Button";
import Modal from "../../components/Modal";
import MultiSelect from "../../components/MultiSelect";

const AddCourse = ({
  open,
  onClose,
  handleSave,
  courseName,
  department,
  trainer,
  selectedVideos,
  newVideos,
  videos,
  setCourseName,
  setDepartment,
  setTrainer,
  setSelectedVideos,
  handleFileUpload,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add new course"
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
      <>
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            className="w-full"
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select
            value={department}
            className="w-full"
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div className="form-group">
          <label>Trainer:</label>
          <select
            className="w-full"
            value={trainer}
            onChange={(e) => setTrainer(e.target.value)}
          >
            <option value="">Select Trainer</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>
        <div className="form-group">
          <label>Select Videos:</label>
          <MultiSelect
            options={videos}
            onChange={(e) =>
              setSelectedVideos(
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
            placeholder="Choose Videos"
          />
        </div>
        <div className="form-group">
          <label>Upload New Videos:</label>
          <input
            className="w-full"
            type="file"
            accept="video/*"
            multiple
            onChange={handleFileUpload}
          />
          <ul>
            {newVideos.map((video, index) => (
              <li key={index}>{video}</li>
            ))}
          </ul>
        </div>
      </>
    </Modal>
  );
};

export default AddCourse;
