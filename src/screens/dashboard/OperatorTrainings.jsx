import { ResponsiveLine } from "@nivo/line";
import "./styles.css";

const OperatorTrainings = () => {
  // Operator Trainings Line Graph Data (Last 6 Months)
  const operatorTrainingsData = [
    {
      id: "Joined",
      data: [
        { x: "Jan", y: 10 },
        { x: "Feb", y: 12 },
        { x: "Mar", y: 8 },
        { x: "Apr", y: 14 },
        { x: "May", y: 11 },
        { x: "Jun", y: 13 },
      ],
    },
    {
      id: "Trained",
      data: [
        { x: "Jan", y: 8 },
        { x: "Feb", y: 9 },
        { x: "Mar", y: 7 },
        { x: "Apr", y: 10 },
        { x: "May", y: 9 },
        { x: "Jun", y: 11 },
      ],
    },
  ];

  return (
    <div className="chart-card">
      <h3>Operator Trainings (Joined vs Trained)</h3>
      <div style={{ height: 300 }}>
        <ResponsiveLine
          data={operatorTrainingsData}
          margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="cardinal"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          colors={{ scheme: "paired" }}
          enableGridX={false}
          enableGridY={false}
          lineWidth={0}
          enablePoints={false}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableArea={true}
          areaOpacity={1}
          enableSlices="x"
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[]}
        />
      </div>
    </div>
  );
};

export default OperatorTrainings;
