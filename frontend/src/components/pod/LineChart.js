// import React, { Component } from 'react';
// import Chart from 'react-google-charts';

// class LineChart extends Component {
//   render() {
//     return (
//       <div>
//         <h1>Line Chart for Student marks in subjects</h1>
//         <Chart
//           width={'500px'}
//           height={'500px'}
//           chartType='LineChart'
//           loader={<div>Loading Line Chart</div>}
// data={[
//   ['Student', 'English', 'Maths', 'History', 'Geography'],
//   ['A', 80, 70, 45, 87],
//   ['B', 90, 47, 88, 90],
//   ['C', 88, 67, 82, 95],
//   ['D', 50, 70, 56, 63],
// ]}
//           options={{
//             title: 'Exam Performance',
//             hAxis: { title: 'Student', titleTextStyle: { color: '#333' } },
//             vAxis: { title: 'marks', minValue: 0 },
//             chartArea: { width: '50%', height: '50%' },
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default LineChart;

import React from 'react';
import { Chart } from 'react-google-charts';

var temp = [
  ['Date', 'English'],
  ['A', 80],
  ['B', 90],
  ['C', 88],
  ['D', 50],
];

function DataForGraph(data) {
  var dataArr = [['Date', 'Production Count']];
  var count = 0;
  for (let i = 0; i < data.data.length; i++) {
    count = Number(data.data[i].count);
    dataArr.push([data.data[i].date, count]);
  }
  console.log(dataArr + 'jessielim');
  // dataArr.push(['A', 50]);
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
      chartType='LineChart'
      width='100%'
      height='400px'
      data={DataForGraph(data)}
      //data={temp}
      options={options}
    />
  );
}
