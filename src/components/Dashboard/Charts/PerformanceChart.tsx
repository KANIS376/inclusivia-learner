
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Math",
    average: 78,
    highest: 95,
    lowest: 60,
  },
  {
    name: "Science",
    average: 82,
    highest: 98,
    lowest: 65,
  },
  {
    name: "English",
    average: 85,
    highest: 96,
    lowest: 72,
  },
  {
    name: "History",
    average: 75,
    highest: 93,
    lowest: 58,
  },
  {
    name: "Art",
    average: 88,
    highest: 100,
    lowest: 75,
  },
  {
    name: "CS",
    average: 80,
    highest: 94,
    lowest: 62,
  },
];

const PerformanceChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="average" fill="#8884d8" />
          <Bar dataKey="highest" fill="#82ca9d" />
          <Bar dataKey="lowest" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
