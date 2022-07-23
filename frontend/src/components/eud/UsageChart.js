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
  },
};

export function UsageChart(data) {
  let data1 = data.data.data;
  for (let i = 0; i < data1.length; i++) {
    data1[i][2] = new Date(data1[i][2]);
    data1[i][3] = new Date(data1[i][3]);
  }

  return (
    <>
      <Chart
        chartType='Timeline'
        data={data.data.data}
        width='95%'
        height='500px'
        options={{
          colors: [
            '#9f8059',
            '#2f4f4f',
            '#556b2f',
            '#8b4513',
            '#6b8e23',
            '#2e8b57',
            '#7f0000',
            '#191970',
            '#006400',
            '#708090',
            '#bc8f8f',
          ],
        }}
      />
    </>
  );
}
