import React from 'react';
import { Chart } from 'react-google-charts';

function DataForGraph(data) {
  var dataArr = [['Date', 'Production Count']];
  var count = 0;
  for (let i = 0; i < data.data.length; i++) {
    count = Number(data.data[i].count);
    dataArr.push([data.data[i].date, count]);
  }
  return dataArr;
}
// export const BarChartData = [['Date', 'Coun']];

export const options = {
  chart: {
    title: 'Production Count for FIRC',
    subtitle: 'Recipes produced',
  },
};

export default function Barchart({ data }) {
  console.log(data + '9-8');
  return (
    <Chart
      chartType='Bar'
      width='100%'
      height='400px'
      data={DataForGraph(data)}
      //   data={leng}
      options={options}
    />
  );
}
