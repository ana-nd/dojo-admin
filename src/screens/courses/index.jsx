import { useState } from "react";
import "./styles.css";
import Button from "../../components/Button";
import AddCourse from "./AddCourse";

const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      thumbnail:
        "https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN",
      name: "React Basics",
      totalVideos: 10,
      trainer: "John Doe",
      department: "Department 1",
    },
    {
      id: 2,
      thumbnail: "https://www.filepicker.io/api/file/S5atf80QTb2tZOScHsiW",
      name: "JavaScript Advanced",
      totalVideos: 8,
      trainer: "Jane Smith",
      department: "Department 2",
    },
    {
      id: 3,
      thumbnail:
        "https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN",
      name: "React Basics",
      totalVideos: 10,
      trainer: "John Doe",
      department: "Department 1",
    },
    {
      id: 4,
      thumbnail:
        "https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN",
      name: "React Basics",
      totalVideos: 10,
      trainer: "John Doe",
      department: "Department 1",
    },
    {
      id: 5,
      thumbnail: "https://www.filepicker.io/api/file/S5atf80QTb2tZOScHsiW",
      name: "JavaScript Advanced",
      totalVideos: 8,
      trainer: "Jane Smith",
      department: "Department 2",
    },
    {
      id: 6,
      thumbnail: "https://www.filepicker.io/api/file/S5atf80QTb2tZOScHsiW",
      name: "JavaScript Advanced",
      totalVideos: 8,
      trainer: "Jane Smith",
      department: "Department 2",
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

  const [showAddCourse, setShowAddCourse] = useState(false);

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
    setShowAddCourse(false);
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
        <Button variant="success" onClick={() => setShowAddCourse(true)}>
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
            <div className="p-2">
              <h3>{course.name}</h3>
              <p>
                <strong>Department:</strong> {course.department}
              </p>
              <p>
                <strong>Trainer:</strong> {course.trainer}
              </p>
              <p>
                <strong>Total Videos:</strong> {course.totalVideos}
              </p>
            </div>
          </div>
        ))}
      </div>
      <AddCourse
        open={showAddCourse}
        onClose={() => setShowAddCourse(false)}
        handleSave={handleAddCourse}
        courseName={courseName}
        department={department}
        trainer={trainer}
        selectedVideos={selectedVideos}
        newVideos={newVideos}
        videos={videos}
        setCourseName={setCourseName}
        setDepartment={setDepartment}
        setTrainer={setTrainer}
        setSelectedVideos={setSelectedVideos}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default Courses;
