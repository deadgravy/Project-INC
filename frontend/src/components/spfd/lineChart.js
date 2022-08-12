import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    "Date",
    "Coconut Grater"
  ],
  ['2021-08-10', 34],
  ['2021-08-13', 22],
  ['2021-08-16', 14],
  ['2021-08-17', 15],
  ['2021-08-20', 31],
  ['2021-08-21', 18]
];

export const options = {
  chart: {
    title: "Legend",
    subtitle: "y-axis is the total time used in minutes (rounded up)",
  },
};

export function LineChart() {
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}