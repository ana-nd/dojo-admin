import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import "./styles.css";

const OperatorAttendance = () => {
  // Operator Attendance Pie Chart Data
  const attendanceData = [
    { id: "Present", label: "Present", value: 80 },
    { id: "Absent", label: "Absent", value: 20 },
  ];

  const total = attendanceData.reduce((acc, item) => acc + item.value, 0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="chart-card">
      <div
        className="flex space-between align-center"
        style={{ marginBottom: "16px" }}
      >
        <h3>Operator Attendance</h3>{" "}
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>
      <div className="flex space-between gap-16">
        <div className="attendance-summary">
          <div className="summary-item total">
            <p>Total Employees</p>
            <strong>{total}</strong>
          </div>
          <div className="summary-item present">
            <p>Present</p>
            <strong>{attendanceData[0].value}</strong>
          </div>
          <div className="summary-item absent">
            <p>Absent</p>
            <strong>{attendanceData[1].value}</strong>
          </div>
        </div>
        <div style={{ height: 300, width: "70%" }}>
          <ResponsivePie
            data={attendanceData}
            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            innerRadius={0}
            padAngle={1}
            cornerRadius={4}
            colors={["#b2fab4", "#ff7f7f"]}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
            enableRadialLabels={false}
            enableSlicesLabels={true}
            sliceLabel={(d) => `${d.value}%`}
          />
        </div>
      </div>
    </div>
  );
};

export default OperatorAttendance;
