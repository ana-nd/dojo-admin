import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const skillColors = {
  Skill1: "#f47560",
  Skill2: "#e8c1a0",
  Skill3: "#f1e15b",
  Skill4: "#61cdbb",
  Skill5: "#97e3d5",
};

const BarChart = ({ data }) => {
  return (
    <div style={{ height: "300px" }}>
      <ResponsiveBar
        data={data}
        keys={["employees"]}
        indexBy="skill"
        layout="horizontal"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={(bar) => skillColors[bar.data.skill]} // Assigns color based on skill name
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Employees",
          legendPosition: "middle",
          legendOffset: 32,
          tickValues: Array.from({ length: 11 }, (_, i) => i * 20), // [0, 20, 40, ..., 200]
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Skills",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default BarChart;
