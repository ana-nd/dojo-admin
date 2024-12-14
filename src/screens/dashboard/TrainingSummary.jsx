import { useState } from "react";
import MonthPicker from "./MonthPicker";
import "./styles.css";

const TrainingSummary = () => {
  // Training Summary Cards Data
  const trainingSummary = {
    newOperatorsJoined: 20,
    newOperatorsTrained: 15,
    totalTrainingPlan: 50,
    totalTrainingActual: 40,
  };

  const [selectedMonth, setSelectedMonth] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const handleMonthChange = (month, year) => {
    setSelectedMonth({ month, year });
  };
  
  return (
    <div className="training-summary card">
      <div
        className="flex space-between align-center"
        style={{ marginBottom: "16px" }}
      >
        <h3>Training Summary</h3>
        <MonthPicker onChange={handleMonthChange} />
      </div>
      <div className="summary-cards">
        <div className="card-item green">
          <h4>New Operators Joined</h4>
          <p>{trainingSummary.newOperatorsJoined}</p>
        </div>
        <div className="card-item orange">
          <h4>New Operators Trained</h4>
          <p>{trainingSummary.newOperatorsTrained}</p>
        </div>
        <div className="card-item blue">
          <h4>Total Training Plan</h4>
          <p>{trainingSummary.totalTrainingPlan}</p>
        </div>
        <div className="card-item red">
          <h4>Total Training Actual</h4>
          <p>{trainingSummary.totalTrainingActual}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainingSummary;
