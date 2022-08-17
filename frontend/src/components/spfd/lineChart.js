<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9a1e1323ce26410ff797164eca61b08a54a81865
import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import moment from 'moment';

export function LineChart({selectedProductFlow}) {
  const [data,setData]= useState(null);
<<<<<<< HEAD
  const datatest = [
    [
      "Date",
      "L-Sealer"
    ],
    ["2021-08-12T16:00:00.000Z", 34],
    ["2021-08-15T16:00:00.000Z", 22],
    ["2021-08-19T16:00:00.000Z", 14],
  ];
=======
  // const datatest = [
  //   [
  //     "Date",
  //     "L-Sealer"
  //   ],
  //   ["2021-08-12T16:00:00.000Z", 34],
  //   ["2021-08-15T16:00:00.000Z", 22],
  //   ["2021-08-19T16:00:00.000Z", 14],
  // ];
>>>>>>> 9a1e1323ce26410ff797164eca61b08a54a81865
  const options = {
    chart: {
      title: "Legend",
      subtitle: "y-axis is the total time used in minutes (rounded up)",
    },
  };
  useEffect(() => {
    if(selectedProductFlow.equipment){
      fetch(`http://localhost:4000/api/getEquipmentUsageByName/${selectedProductFlow.recipeName}/${selectedProductFlow.equipment}`)
    .then((res) => res.json())
    .then(result => {
      if (result.status === "success"){
        console.log('Date:', result.data[0].date)
        console.log('Time:', result.data[0].total_time)
        // const formattedTime = parseInt(result.data[0].data[1].total_time)
        let tempData = [];
        for(let i = 0; i < result.data.length; i++){
          tempData.push([moment(result.data[i].date).format('YYYY-MM-DD'), parseInt(result.data[i].total_time)])
        }
        console.log({tempData});

        setData([ 
          [
            "Date",
            selectedProductFlow.equipment
          ],
          ...tempData
        ])
      }
    })
    }
    

  },[selectedProductFlow.equipment])

  return (

    <>
    {data && <Chart
<<<<<<< HEAD
=======
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
>>>>>>> 693d3699 (added drop down and line chart)
=======
>>>>>>> 9a1e1323ce26410ff797164eca61b08a54a81865
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
<<<<<<< HEAD
<<<<<<< HEAD
    />}
    
    </>
    
=======
    />
>>>>>>> 693d3699 (added drop down and line chart)
=======
    />}
    </>

>>>>>>> 9a1e1323ce26410ff797164eca61b08a54a81865
  );
}