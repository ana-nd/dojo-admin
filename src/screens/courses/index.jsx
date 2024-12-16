import { useState } from "react";
import "./styles.css";
import Button from "../../components/Button";

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      thumbnail:
        "https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN",
      name: "React Basics",
      totalVideos: 10,
      trainer: "John Doe",
    },
    {
      id: 2,
      thumbnail: "https://www.filepicker.io/api/file/S5atf80QTb2tZOScHsiW",
      name: "JavaScript Advanced",
      totalVideos: 8,
      trainer: "Jane Smith",
    },
  ]);

  const [videos, setVideos] = useState([
    "intro-to-react.mp4",
    "state-management.mp4",
    "advanced-hooks.mp4",
    "javascript-fundamentals.mp4",
    "closures-and-scopes.mp4",
    "async-await.mp4",
  ]);

  const [isModalOpen, setModalOpen] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [department, setDepartment] = useState("");
  const [trainer, setTrainer] = useState("");
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [newVideos, setNewVideos] = useState([]);

  const handleAddCourse = () => {
    if (
      !courseName ||
      !trainer ||
      (!selectedVideos.length && !newVideos.length)
    ) {
      alert("Please fill all required fields and add videos!");
      return;
    }

    const newCourse = {
      id: courses.length + 1,
      thumbnail: "https://via.placeholder.com/150", // Placeholder thumbnail
      name: courseName,
      totalVideos: selectedVideos.length + newVideos.length,
      trainer,
    };

    setCourses([...courses, newCourse]);
    setVideos([...videos, ...newVideos]); // Add new videos to global video list
    setModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCourseName("");
    setDepartment("");
    setTrainer("");
    setSelectedVideos([]);
    setNewVideos([]);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => file.name);
    setNewVideos((prev) => [...prev, ...files]);
  };

  return (
    <div className="course-container">
      <div className="header">
        <Button variant="success" onClick={() => setModalOpen(true)}>
          Add Course
        </Button>
      </div>
      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <img
              src={course.thumbnail}
              alt={course.name}
              className="course-thumbnail"
            />
            <h3>{course.name}</h3>
            <p>
              <strong>Total Videos:</strong> {course.totalVideos}
            </p>
            <p>
              <strong>Trainer:</strong> {course.trainer}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Course</h2>
            <div className="form-group">
              <label>Course Name:</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <select
                value={department}
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
              <select
                multiple
                value={selectedVideos}
                onChange={(e) =>
                  setSelectedVideos(
                    Array.from(e.target.selectedOptions, (o) => o.value)
                  )
                }
              >
                {videos.map((video, index) => (
                  <option key={index} value={video}>
                    {video}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Upload New Videos:</label>
              <input type="file" multiple onChange={handleFileUpload} />
              <ul>
                {newVideos.map((video, index) => (
                  <li key={index}>{video}</li>
                ))}
              </ul>
            </div>
            <div className="modal-actions">
              <button onClick={handleAddCourse} className="btn-primary">
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
