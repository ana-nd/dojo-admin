import { useState } from "react";
import "./styles.css";
import Button from "../../components/Button";
import CreateBatch from "./CreateBatch";

// Dummy data for departments and users
const dummyDepartments = [
  "ASSOCIATE",
  "ASST MANAGER-I",
  "ASST. GENERAL MANAGER-II",
  "ASST. MANAGER-II",
  "EXECUTIVE -I",
  "EXECUTIVE -II",
  "EXECUTIVE -III",
  "GENERAL MANAGER-I",
  "MANAGER-I",
  "MANAGER-II",
  "TRAINEE D.E.T AND G.E.T",
  "VICE PRESIDENT",
  "OPERATOR",
];
const dummyUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Sam Brown" },
  { id: 4, name: "Lisa White" },
];

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [newBatch, setNewBatch] = useState({
    name: "",
    department: "",
    users: [],
    targetDate: "",
    startDate: "",
    trainer: "",
  });

  const [showCreateBatch, setShowCreateBatch] = useState(false);

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
    setShowCreateBatch(false); // Close the modal
    setNewBatch({
      name: "",
      department: "",
      users: [],
      targetDate: "",
      startDate: "",
      trainer: "",
    }); // Reset form
  };

  return (
    <div className="batch-management-container">
      <div className="header">
        <Button variant="success" onClick={() => setShowCreateBatch(true)}>
          Create Batch
        </Button>
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
      <CreateBatch
        open={showCreateBatch}
        onClose={() => setShowCreateBatch(false)}
        newBatch={newBatch}
        departments={dummyDepartments}
        users={dummyUsers}
        handleSave={handleCreateBatch}
        handleChange={handleChange}
        handleDepartmentChange={handleDepartmentChange}
        handleUserSelection={handleUserSelection}
      />
    </div>
  );
};

export default BatchManagement;
