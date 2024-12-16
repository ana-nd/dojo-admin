import { useState, useEffect } from "react";
import axiosInstance from "../../interceptor/axiosInstance";
import "./styles.css";
import Button from "../../components/Button";
import CreateTraining from "./CreateTraining";

const Training = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [trainings, setTrainings] = useState([]);
  const [batches, setBatches] = useState([]);
  const [batch, setBatch] = useState([]);

  const [newTraining, setNewTraining] = useState({
    name: "",
    batch: "",
    targetDate: "",
    startDate: "",
    trainer: "",
    course: "",
  });

  const [showCreateTraining, setShowCreateTraining] = useState(false);
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

  // Handle input changes for batch creation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTraining((prevBatch) => ({ ...prevBatch, [name]: value }));
  };

  // Handle trainer selection
  const handleTrainerChange = (e) => {
    setNewTraining((prevBatch) => ({ ...prevBatch, trainer: e.target.value }));
  };

  // Handle department selection
  const handleBatchChange = (e) => {
    setNewTraining((prevTraining) => ({
      ...prevTraining,
      batch: e.target.value,
    }));
  };

  // Handle batch creation
  const handleCreateTraining = async () => {
    // // Prepare the payload for the API
    // const payload = {
    //   batch_name: newTraining.name,
    //   start_date: newTraining.startDate || null,
    //   end_date: newTraining.targetDate || null,
    //   trainer: newTraining.trainer || null,
    //   department: newTraining.department || null,
    //   selected_user: newTraining.trainer ? [] : newTraining.users, // Empty array if there's a trainer
    // };
    // try {
    //   // Send the data to the backend
    //   const response = await axiosInstance.post(
    //     `${API_URL}/batch/create/`,
    //     payload
    //   );
    //   console.log("Batch created successfully:", response.data);
    //   // Update the batch list and reset form
    //   setTrainings([...trainings, { ...newTraining, id: Date.now() }]);
    //   setShowCreateTraining(false);
    //   setNewTraining({
    //     name: "",
    //     department: "",
    //     users: [],
    //     startDate: "",
    //     targetDate: "",
    //     trainer: "",
    //   });
    // } catch (error) {
    //   console.error("Error creating batch:", error);
    // }
  };

  return (
    <div className="batch-management-container">
      {showAll && (
        <>
          <div className="header">
            <Button
              variant="success"
              onClick={() => setShowCreateTraining(true)}
            >
              Create Training
            </Button>
          </div>

          {/* Display Batches in Card View */}
          <div className="batches-container">
            {trainings.length > 0 ? (
              trainings.map((batch) => (
                <div className="batch-card" key={batch.id}>
                  <h3>{batch.batch_name}</h3>
                  <p>Trainer: {batch.trainer_data}</p>
                  <p>
                    No of Attendees:{" "}
                    {batch.selected_user_data
                      ? batch.selected_user_data.length
                      : 0}
                  </p>
                  <p>Department: {batch.department_name}</p>
                </div>
              ))
            ) : (
              <p>No trainings available</p>
            )}
          </div>
        </>
      )}

      <CreateTraining
        open={showCreateTraining}
        onClose={() => setShowCreateTraining(false)}
        newTraining={newTraining}
        handleSave={handleCreateTraining}
        handleChange={handleChange}
        handleTrainerChange={handleTrainerChange}
        handleBatchChange={handleBatchChange}
      />
    </div>
  );
};

export default Training;
