import React from 'react';
import { Chart } from 'react-google-charts';

export const data = [
  [
    { type: 'string', id: 'Equipment Name' },
    { type: 'string', id: 'Recipe Name' },
    { type: 'date', id: 'Start' },
    { type: 'date', id: 'End' },
  ],
];

export const options = {
  timeline: {
    groupByRowLabel: true,
    showBarLabels: false,
  },
};

export function UsageChart(data) {
  let data1 = data.data.data;
  console.log('hello');
  console.log(data1);
  let usageArr = [];
  for (let i = 0; i < data1.length; i++) {
    usageArr.push(Object.values(data1[i]));
  }
  console.log(usageArr);

  for (let i = 0; i < usageArr.length; i++) {
    usageArr[i][2] = new Date(usageArr[i][2]);
    usageArr[i][3] = new Date(usageArr[i][3]);
  }

  return (
    <>
      <Chart
        chartType='Timeline'
        data={usageArr}
        width='95%'
        height='450px'
        options={options}
      />
    </>
  );
}
