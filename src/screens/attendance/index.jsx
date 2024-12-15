import React, { useState, useEffect } from 'react';
import './styles.css';
import axiosInstance from '../../interceptor/axiosInstance';

const Attendance = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [attendanceData, setAttendanceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch attendance data
  const fetchAttendanceData = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${API_URL}/attendance/data/list/?page=${page}`);
      const fetchedData = response.data.results.map((record) => ({
        id: record.user_data.card_number,
        name: `${record.user_data.first_name} ${record.user_data.last_name}`,
        status: record.attend === 'P' ? 'Present' : 'Absent',
        date: new Date(record.create_at).toLocaleDateString(),
      }));
      setAttendanceData(fetchedData);
      setTotalPages(Math.ceil(response.data.count / rowsPerPage));
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load attendance data. Please try again later.');
      console.error('Error fetching attendance data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData(currentPage);
  }, [currentPage]);

  // Open/Close Upload Modal
  const showUploadModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  // Handle file upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await axiosInstance.post(`${API_URL}/attendance/upload/data/sheet/`, formData);
        alert('File uploaded successfully!');
        setIsModalVisible(false);
        fetchAttendanceData(currentPage); // Refresh data after upload
      } catch (err) {
        console.error('Error uploading file:', err);
        alert('File upload failed.');
      }
    }
  };

  // Generate pagination range
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3; // Number of pages to display in the middle
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) pages.push(1); // First page
    if (startPage > 2) pages.push('...'); // Ellipsis for skipped pages

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push('...'); // Ellipsis for skipped pages
    if (endPage < totalPages) pages.push(totalPages); // Last page

    return pages;
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <button className="upload-btn" onClick={showUploadModal}>
          Upload Attendance
        </button>
      </div>

      <div className="attendance-table">
        {error ? (
          <p className="error-message">{error}</p>
        ) : loading ? (
          <p>Loading attendance data...</p>
        ) : (
          <>
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

            <div className="pagination">
              <button
                onClick={() => currentPage > 1 && fetchAttendanceData(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {generatePageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && fetchAttendanceData(page)}
                  className={currentPage === page ? 'active-page' : ''}
                  disabled={typeof page !== 'number'}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => currentPage < totalPages && fetchAttendanceData(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

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
