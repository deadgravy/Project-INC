import React from 'react';
import { Chart } from 'react-google-charts';

function DataForGraph(data) {
  var dataArr = [['Date', 'Production Count']];

  for (let i = 0; i < data.data.length; i++) {
    dataArr.push([data.data[i].date, data.data[i].count]);
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
