import React, { useState } from 'react';
import './styles.css';

// Dummy attendance data (replace with your API data)
const dummyData = [
  { id: 1, name: 'John Doe', status: 'Present', date: '2024-12-01' },
  { id: 2, name: 'Jane Smith', status: 'Absent', date: '2024-12-01' },
  { id: 3, name: 'Sam Brown', status: 'Present', date: '2024-12-02' },
  // Add more data here
];

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState(dummyData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Open/Close Upload Modal
  const showUploadModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  // Handle file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploaded file:', file);
      setIsModalVisible(false);  // Close modal after file upload
      // Here, you can parse the file and update the attendance data if needed
    }
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <button className="upload-btn" onClick={showUploadModal}>
          Upload Attendance
        </button>
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

      {/* Upload Modal */}
      {isModalVisible && (
        <div className="upload-modal">
          <div className="modal-content">
            <h2>Upload Attendance (Excel)</h2>
            <input type="file" accept=".xls,.xlsx" onChange={handleUpload} />
            <button className="close-btn" onClick={handleCancel}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
