import React from 'react';
import { Chart } from 'react-google-charts';

const leng = [
  ['Year', 'Sales'],
  ['2014', 1000],
  ['2015', 1170],
  ['2016', 660],
  ['2017', 1030],
];
function DataForGraph(data) {
  var dataArr = [['Date', 'Production Count']];
  console.log(data.data.length + 'fkkkkk');
  for (let i = 0; i < data.data.length; i++) {
    dataArr.push([data.data[i].date_trunc, data.data[i].count]);
  }
  return dataArr;
}
// export const BarChartData = [['Date', 'Coun']];

export const options = {
  chart: {
    title: 'Company Performance',
    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
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
