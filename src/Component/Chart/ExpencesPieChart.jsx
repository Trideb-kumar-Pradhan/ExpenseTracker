import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4500"];

const calculateTotalSpendByCategory = (categoriesData) => {
  const categories = {};
  categoriesData.forEach((item) => {
    if (categories[item.category]) {
      categories[item.category] += item.price;
    } else {
      categories[item.category] = item.price;
    }
  });
  return Object.keys(categories).map((category, index) => ({
    name: category,
    value: categories[category],
    color: COLORS[index % COLORS.length], // Assigning color based on index
  }));
};

const CategoryPieChart = ({ categoriesData }) => {
  const pieChartData = calculateTotalSpendByCategory(categoriesData);
  return (
    <PieChart width={200} height={200}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={pieChartData}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryPieChart;
