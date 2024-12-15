// OperatorAttendance.jsx
import { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import "./styles.css";
import axiosInstance from "../../interceptor/axiosInstance";

const OperatorAttendance = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [attendanceData, setAttendanceData] = useState([
    { id: "Present", label: "Present", value: 0 },
    { id: "Absent", label: "Absent", value: 0 },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchAttendanceData = async (date) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/attendance/count/data/`, {
        params: { date: date.toISOString().split("T")[0] }, // Optionally pass the date as a query parameter
      });
      const data = response.data;
      setAttendanceData([
        { id: "Present", label: "Present", value: data.present_count },
        { id: "Absent", label: "Absent", value: data.absent_count },
      ]);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData(selectedDate);
  }, [selectedDate]);

  const total = attendanceData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="chart-card">
      <div
        className="flex space-between align-center"
        style={{ marginBottom: "16px" }}
      >
        <h3>Operator Attendance</h3>
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
