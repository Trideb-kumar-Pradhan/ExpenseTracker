import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Styles from "./BarChartExpenses.module.css";
import { Hidden } from "@mui/material";

const BarChartComponent = ({ data }) => {
  // Sort the data by value in descending order
  const sortedData = data.slice().sort((a, b) => b.value - a.value);
  // Take top 3 categories
  const top3Data = sortedData.slice(0, 3);

  return (
    <>
      <h2 className={Styles.Heading}>Top Expenses</h2>

      <div className={Styles.BarContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={top3Data} layout="vertical">
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="value" barSize={30} className={Styles.bar} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BarChartComponent;
