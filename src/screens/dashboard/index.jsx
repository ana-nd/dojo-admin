import TrainingSummary from "./TrainingSummary";
import OperatorAttendance from "./OperatorAttendance";
import OperatorTrainings from "./OperatorTrainings";
import "./styles.css";
import TrainingPlan from "./TrainingPlan";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <TrainingSummary />
        <OperatorAttendance />
        <OperatorTrainings />
        <TrainingPlan />
      </div>
    </div>
  );
};

export default Dashboard;
