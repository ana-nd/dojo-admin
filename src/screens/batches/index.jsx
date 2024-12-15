import { useState, useEffect } from "react";
import axiosInstance from "../../interceptor/axiosInstance";
import "./styles.css";
import Button from "../../components/Button";
import CreateBatch from "./CreateBatch";

const BatchManagement = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [batches, setBatches] = useState([]);
  const [department, setDepartment] = useState([]);
  const [userList, setUserList] = useState([]);

  const [newBatch, setNewBatch] = useState({
    name: "",
    department: "",
    users: [],
    targetDate: "",
    startDate: "",
    trainer: "",
  });

  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [showAll, setShowAll] = useState(true);

  // Fetch batches from the API
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/batch/list/`);
        setBatches(response.data);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchBatches();
  }, []);

  // Fetch Department from the API
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/account/department/list/`);
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDepartment();
  }, []);

  // Fetch User list from the API
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/account/user/batch/data/`);
        setUserList(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserList();
  }, []);

  // Handle input changes for batch creation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBatch((prevBatch) => ({ ...prevBatch, [name]: value }));
  };

  // Handle trainer selection
  const handleTrainerChange = (e) => {
    setNewBatch((prevBatch) => ({ ...prevBatch, trainer: e.target.value }));
  };

  // Handle department selection
  const handleDepartmentChange = (e) => {
    setNewBatch((prevBatch) => ({ ...prevBatch, department: e.target.value }));
  };

  // Handle user selection for the batch
  const handleUserSelection = (e) => {
    const value = e.target.value;
    const selectedUsers = newBatch.users.includes(value)
      ? newBatch.users.filter((user) => user !== value)
      : [...newBatch.users, value];
    setNewBatch((prevBatch) => ({ ...prevBatch, users: selectedUsers }));
  };

  // Handle batch creation
  const handleCreateBatch = async () => {
    // Prepare the payload for the API
    const payload = {
      batch_name: newBatch.name,
      start_date: newBatch.startDate || null,
      end_date: newBatch.targetDate || null,
      trainer: newBatch.trainer || null,
      department: newBatch.department || null,
      selected_user: newBatch.trainer ? [] : newBatch.users, // Empty array if there's a trainer
    };

    try {
      // Send the data to the backend
      const response = await axiosInstance.post(`${API_URL}/batch/create/`, payload);
      console.log("Batch created successfully:", response.data);

      // Update the batch list and reset form
      setBatches([...batches, { ...newBatch, id: Date.now() }]);
      setShowCreateBatch(false);
      setNewBatch({
        name: "",
        department: "",
        users: [],
        startDate: "",
        targetDate: "",
        trainer: "",
      });
    } catch (error) {
      console.error("Error creating batch:", error);
    }
  };

  return (
    <div className="batch-management-container">
      {showAll && (
        <>
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
                  <h3>{batch.batch_name}</h3>
                  <p>Trainer: {batch.trainer_data}</p>
                  <p>No of Attendees: {batch.selected_user_data ? batch.selected_user_data.length : 0}</p>
                  <p>Department: {batch.department_name}</p>
                </div>
              ))
            ) : (
              <p>No batches available</p>
            )}
          </div>
        </>
      )}

      <CreateBatch
        open={showCreateBatch}
        onClose={() => setShowCreateBatch(false)}
        newBatch={newBatch}
        departments={department}
        users={userList}
        handleSave={handleCreateBatch}
        handleChange={handleChange}
        handleTrainerChange={handleTrainerChange}
        handleDepartmentChange={handleDepartmentChange}
        handleUserSelection={handleUserSelection}
      />
    </div>
  );
};

export default BatchManagement;
