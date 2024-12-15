import { useState } from "react";
import "./styles.css";
import UploadAttendance from "./UploadAttendance";
import Button from "../../components/Button";

// Dummy attendance data (replace with your API data)
const dummyData = [
  { id: 1, name: "John Doe", status: "Present", date: "2024-12-01" },
  { id: 2, name: "Jane Smith", status: "Absent", date: "2024-12-01" },
  { id: 3, name: "Sam Brown", status: "Present", date: "2024-12-02" },
  // Add more data here
];

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState(dummyData);
  const [showUplaodModal, setShowUplaodModal] = useState(false);

  const handleFileUpload = () => {
    setShowUplaodModal(false); // Close modal after file upload
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <Button variant="success" onClick={() => setShowUplaodModal(true)}>
          Upload Attendance
        </Button>
      </div>
      {/* Attendance Table */}
      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Emp Id/Card No</th>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.status}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UploadAttendance
        open={showUplaodModal}
        onClose={() => setShowUplaodModal(false)}
        handleUpload={handleFileUpload}
      />
    </div>
  );
};

export default Attendance;
