
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Week 1",
    attendance: 95,
    participation: 85,
    homework: 78,
  },
  {
    name: "Week 2",
    attendance: 92,
    participation: 82,
    homework: 80,
  },
  {
    name: "Week 3",
    attendance: 90,
    participation: 88,
    homework: 85,
  },
  {
    name: "Week 4",
    attendance: 93,
    participation: 90,
    homework: 88,
  },
  {
    name: "Week 5",
    attendance: 95,
    participation: 92,
    homework: 90,
  },
  {
    name: "Week 6",
    attendance: 97,
    participation: 94,
    homework: 92,
  },
];

const EngagementChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[50, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="participation" stroke="#82ca9d" />
          <Line type="monotone" dataKey="homework" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;
