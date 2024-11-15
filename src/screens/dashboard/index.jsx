import React from "react";
import BarChart from "./components/BarChart";
import { barChartData, lineData, pieData, shiftData } from "./data";
import LineChart from "./components/LineChart";
import "./styles.css";
import PieChart from "./components/PieChart";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dasboard-header" />
      <div className="dashboard-content">
        <div className="container flex gap-16">
          <div className="container-left">
            <div className="flex gap-16">
              <div
                className="card emp-total-card text-center"
                style={{
                  background: "#5975ed",
                }}
              >
                <p className="label">Total Employees</p>
                <h2 className="count">200</h2>
              </div>
              <div
                className="card emp-total-card text-center"
                style={{
                  background: "#70b75a",
                }}
              >
                <p className="label">On Time</p>
                <h2 className="count">120</h2>
              </div>
              <div
                className="card emp-total-card text-center"
                style={{
                  background: "#eaaf43",
                }}
              >
                <p className="label">Late</p>
                <h2 className="count">50</h2>
              </div>
              <div
                className="card emp-total-card text-center"
                style={{ background: "#ec6666" }}
              >
                <p className="label">Absent</p>
                <h2 className="count">30</h2>
              </div>
            </div>
            <div className="flex gap-16">
              <div className="card" style={{ marginTop: "1rem" }}>
                <BarChart data={barChartData} />
              </div>
            </div>
            <div className="flex gap-16">
              <div className="card" style={{ marginTop: "1rem" }}>
                <BarChart data={shiftData} />
              </div>
            </div>
          </div>
          <div className="container-right">
            <div className="flex gap-16" style={{ marginBottom: "1rem" }}>
              <div className="card">
                <PieChart data={pieData} />
              </div>
            </div>
            <div className="flex gap-16">
              <div className="card">
                <LineChart data={lineData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
