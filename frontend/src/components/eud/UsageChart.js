import React from 'react';
import { Chart } from 'react-google-charts';

const headerdata = ['Equipment Name', 'Recipe Name', 'Start', 'End'];

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
  usageArr.push(headerdata);
  for (let i = 0; i < data1.length; i++) {
    console.log(data1[i]);
    usageArr.push(Object.values(data1[i]));
  }
  console.log('is the mistake here?');

  console.log(usageArr);

  for (let i = 1; i < usageArr.length; i++) {
    usageArr[i][2] = new Date(usageArr[i][2]);
    usageArr[i][3] = new Date(usageArr[i][3]);
  }

  console.log('pls help');
  console.log(usageArr[0]);

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
