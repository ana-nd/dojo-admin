import { ResponsiveBar } from "@nivo/bar";
import "./styles.css";

const TrainingPlan = () => {
  // Training Plan vs Actual Bar Chart Data (Last 6 Months)
  const trainingPlanActualData = [
    { month: "Jan", planned: 10, actual: 8 },
    { month: "Feb", planned: 12, actual: 10 },
    { month: "Mar", planned: 15, actual: 13 },
    { month: "Apr", planned: 16, actual: 15 },
    { month: "May", planned: 14, actual: 12 },
    { month: "Jun", planned: 18, actual: 17 },
  ];

  return (
    <div className="chart-card">
      <h3>Training Plan vs Actual</h3>
      <div style={{ height: 300 }}>
        <ResponsiveBar
          groupMode="grouped"
          data={trainingPlanActualData}
          keys={["planned", "actual"]}
          indexBy="month"
          margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
          padding={0.2}
          innerPadding={2}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={["#1abc9c", "#f39c12"]}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", "1"]],
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendPosition: "middle",
            legendOffset: 36,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Count",
            legendPosition: "middle",
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          legends={[]}
        />
      </div>
    </div>
  );
};

export default TrainingPlan;
