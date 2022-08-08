import React from 'react';
import { Chart } from 'react-google-charts';
import { UsageChartColours } from './UsageChartData';

const headerdata = ['Equipment Name', 'Recipe Name', 'Start', 'End'];

export const options = {
  colors: UsageChartColours,
  timeline: {
    groupByRowLabel: true,
    showBarLabels: false,
  },
};

export function UsageChart(data) {
  let data1 = data.data.data;
  let usageArr = [];
  usageArr.push(headerdata);
  for (let i = 0; i < data1.length; i++) {
    usageArr.push(Object.values(data1[i]));
  }

  if (Object.keys(data1[0])[0] === 'day') {
    var first = new Date(usageArr[1][2]);
    for (let i = 1; i < usageArr.length; i++) {
      var firstDay = first.getDay();
      console.log(firstDay);
      var startdate = new Date(usageArr[i][2]);
      var enddate = new Date(usageArr[i][3]);
      var startMilli = startdate.getTime();
      var endMilli = enddate.getTime();
      var dayNum = startdate.getDay();

      if (dayNum !== firstDay) {
        if (dayNum === 0) {
          dayNum = 7;
        } else if (dayNum < firstDay) {
          dayNum += 7;
        }
        let diff = dayNum - firstDay;
        let diffInMs = diff * 86400000;
        startMilli -= diffInMs;
        endMilli -= diffInMs;
      }
      usageArr[i][2] = startMilli;
      usageArr[i][3] = endMilli;
    }
  } else {
    for (let i = 1; i < usageArr.length; i++) {
      usageArr[i][2] = new Date(usageArr[i][2]);
      usageArr[i][3] = new Date(usageArr[i][3]);
    }
  }

  return (
    <>
      <Chart
        chartType='Timeline'
        data={usageArr}
        width='98%'
        height='450px'
        options={options}
      />
    </>
  );
}
