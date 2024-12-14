import React, { useState } from 'react';
import './styles.css';

// Dummy data for departments and users
const dummyDepartments = ['HR', 'IT', 'Finance', 'Operations'];
const dummyUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Sam Brown' },
  { id: 4, name: 'Lisa White' },
];

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [newBatch, setNewBatch] = useState({
    name: '',
    department: '',
    users: [],
    targetDate: '',
    startDate: '',
    trainer: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBatch({ ...newBatch, [name]: value });
  };

  // Handle department selection change
  const handleDepartmentChange = (e) => {
    setNewBatch({ ...newBatch, department: e.target.value });
  };

  // Handle user list selection
  const handleUserSelection = (e) => {
    const value = e.target.value;
    const selectedUsers = newBatch.users.includes(value)
      ? newBatch.users.filter((user) => user !== value)
      : [...newBatch.users, value];
    setNewBatch({ ...newBatch, users: selectedUsers });
  };

  // Handle batch creation
  const handleCreateBatch = () => {
    setBatches([...batches, { ...newBatch, id: Date.now() }]);
    setIsModalVisible(false); // Close the modal
    setNewBatch({
      name: '',
      department: '',
      users: [],
      targetDate: '',
      startDate: '',
      trainer: '',
    }); // Reset form
  };

  // Open/Close modal for adding a batch
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <div className="batch-management-container">
      <div className="header">
        <button className="add-batch-btn" onClick={toggleModal}>
          Create Batch
        </button>
      </div>

      {/* Display Batches in Card View */}
      <div className="batches-container">
        {batches.length > 0 ? (
          batches.map((batch) => (
            <div className="batch-card" key={batch.id}>
              <h3>{batch.name}</h3>
              <p>Trainer: {batch.trainer}</p>
              <p>No of Attendees: {batch.users.length}</p>
              <p>Department: {batch.department}</p>
            </div>
          ))
        ) : (
          <p>No batches available</p>
        )}
      </div>

      {/* Batch Creation Modal */}
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Batch</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Batch Name"
                value={newBatch.name}
                onChange={handleChange}
              />
              <select
                name="department"
                value={newBatch.department}
                onChange={handleDepartmentChange}
              >
                <option value="">Select Department</option>
                {dummyDepartments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <select
                name="users"
                multiple
                value={newBatch.users}
                onChange={handleUserSelection}
              >
                {dummyUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="targetDate"
                placeholder="Target Date"
                value={newBatch.targetDate}
                onChange={handleChange}
              />
              <input
                type="date"
                name="startDate"
                placeholder="Start Date"
                value={newBatch.startDate}
                onChange={handleChange}
              />
              <input
                type="text"
                name="trainer"
                placeholder="Trainer Name"
                value={newBatch.trainer}
                onChange={handleChange}
              />
            </form>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleCreateBatch}>
                Save
              </button>
              <button className="cancel-btn" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchManagement;
