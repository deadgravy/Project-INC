import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";


export function GanttChart({selectedProductFlow, setSelectedProductFlow}) {
<<<<<<< HEAD
  // const [ganttChart, setGanttChart] = useState([]);
  const columns = [
    { type: "string", id: "Equipment" },
    { type: "string", id: "Recipe" },
    { type: "datetime", id: "Start" },
    { type: "datetime", id: "End" }
  ];
  
  const rows = [
    ['Coconut Grater','Sub E', new Date ('2021-08-09T19:25:56.000Z'), new Date ('2021-08-09T19:59:32.000Z')],
    ['Small Cooker Mixer', 'Sub E', new Date ('2021-08-09T21:32:21.000Z'), new Date ('2021-08-09T22:03:11.000Z')],
    ['Coconut Grater', 'Sub E', new Date ('2021-08-12T19:36:33.000Z'), new Date ('2021-08-12T19:57:27.000Z')],
    ['Small Cooker Mixer', 'Sub E', new Date ('2021-08-12T21:59:35.000Z'), new Date ('2021-08-12T22:04:42.000Z')]
  ]
  // const rows = ganttChart.map(item => Object.values(item)) ;
  // let rows = [];
  // const data = [columns, ...rows]
  const [ganttData, setGanttData] = useState([]);
  const options = {height: 400, gantt: {trackHeight: 30}};
  const formattedStartDate = selectedProductFlow.startDate.toLocaleDateString('zh-CN').substring(0,10).replaceAll("/", "-");
  const formattedEndDate = selectedProductFlow.endDate.toLocaleDateString('zh-CN').substring(0,10).replaceAll("/", "-");

  useEffect(() =>{
    fetch(`http://localhost:4000/api/getSingleProductWithNameDate/${formattedStartDate}/${formattedEndDate}/${selectedProductFlow.recipeName}`)
      .then((res) => res.json())
      .then(data => {
        if (data.status === "success") {
          console.log('data ', data)
          const formattedRows = data.data.map((item) => Object.values(item));
          console.log(formattedRows)
          const rows = formattedRows.map((row) => {
            const formattedStartDate = new Date(row[2]);
            const formattedEndDate = new Date(row[3]);
            return row
              .slice(0, 2)
              .concat([formattedStartDate, formattedEndDate]);
          });
          console.log("rows", rows);
          setGanttData([columns, ...rows]);
          
          // if(l < 1) {
          //   console.log('No Data Found')
          // } else {
          // console.log(l)
          // }
          // setGanttChart(data.data)
        }
        // if(data.status === "success") {
        //   const FormattedRows = data.data.map(item => {
        //     const l = Object.values(item);
        //     console.log('before '+l)
        //     const tempEndDate = new Date(l.pop());
        //     const tempStartDate = new Date(l.pop());
        //     const endDate = new Date (tempEndDate.getFullYear(), tempEndDate.getMonth(), tempEndDate.getDay(), tempEndDate.getHours(), tempEndDate.getMinutes(), tempEndDate.getSeconds());
        //     const startDate = new Date (tempStartDate.getFullYear(), tempStartDate.getMonth(), tempStartDate.getDay(), tempStartDate.getHours(), tempStartDate.getMinutes(), tempStartDate.getSeconds());
        //     l.push(startDate);
        //     l.push(endDate);
        //     console.log(l);
        //     return l
        //   })
          
        //   // setGanttData([columns, ...ganttData])
        //   // if(l < 1) {
        //   //   console.log('No Data Found')
        //   // } else {
        //   // console.log(l)
        //   // }    
        //   // setGanttChart(data.data)
        // }
    })
  },[])

  return (
    
      ganttData.length > 0 ? (
        <Chart
          chartType="Timeline"
          width="100%"
          height="50%"
          data={ganttData}
          options={options}
        />
      ) : (console.log('No Data Found'))//err message stuff
     
    

=======
  const [ganttChart, setGanttChart] = useState([]);
  const columns = [
    { type: "string", label: "Equipment Name" },
    { type: "string", label: "Recipe Name" },
    { type: "date", label: "Start Time" },
    { type: "date", label: "End Time" },
    // { type: "object", label: "Total Duration" },
    { type: 'number', label: "Date" },
  ];
  // const rows = ganttChart.map(flow => Object.values(flow)) ;
  const rows = [['Small Cooker Mixer','Sub E', new Date (2021,8,10), new Date (2021,8,13), 100 ]]
  
  const data = [columns, ...rows];
  const options = {height: 400, gantt: {trackHeight: 30}};
// 2021-08-10/2021-08-13/Sub%20E

const formattedStartDate = selectedProductFlow.startDate.toLocaleDateString('zh-CN').substring(0,10).replaceAll("/", "-");

const formattedEndDate = selectedProductFlow.endDate.toLocaleDateString('zh-CN').substring(0,10).replaceAll("/", "-");

  useEffect(() =>{
    fetch(`http://localhost:4000/api/getSingleProductWithNameDate/${formattedStartDate}/${formattedEndDate}/${selectedProductFlow.recipeName}`)
      .then((res) => res.json())
      .then(data => {
        if(data.status === "success") {
          const t = data.data.map(flow => Object.values(flow))
          console.log(t)       
          setGanttChart(data.data)
        }
    })
  },[])

  return (

    <Chart
      chartType="Gantt"
      width="100%"
      height="50%"
      data={data}
      options={options}
    />
>>>>>>> a9336ea6 (got problem with GanntChart)
  );
}

// import React from "react";
// import { Chart } from "react-google-charts";

// const columns = [
//   { type: "string", label: "Taskkk ID" },
//   { type: "string", label: "Task Name" },
//   { type: "string", label: "Resource" },
//   { type: "date", label: "Start Date" },
//   { type: "date", label: "End Date" },
//   { type: "number", label: "Duration" },
//   { type: "number", label: "Percent Complete" },
//   { type: "string", label: "Dependencies" },
// ];

// const rows = [
//   [
//     "2014Spring",
//     "Spring 2014",
//     "spring",
//     new Date(2014, 2, 22),
//     new Date(2014, 5, 20),
//     null,
//     100,
//     null,
//   ],
//   [
//     "2014Summer",
//     "Summer 2014",
//     "summer",
//     new Date(2014, 5, 21),
//     new Date(2014, 8, 20),
//     null,
//     100,
//     null,
//   ],
//   [
//     "2014Autumn",
//     "Autumn 2014",
//     "autumn",
//     new Date(2014, 8, 21),
//     new Date(2014, 11, 20),
//     null,
//     100,
//     null,
//   ],
//   [
//     "2014Winter",
//     "Winter 2014",
//     "winter",
//     new Date(2014, 11, 21),
//     new Date(2015, 2, 21),
//     null,
//     100,
//     null,
//   ],
//   [
//     "2015Spring",
//     "Spring 2015",
//     "spring",
//     new Date(2015, 2, 22),
//     new Date(2015, 5, 20),
//     null,
//     50,
//     null,
//   ],
//   [
//     "2015Summer",
//     "Summer 2015",
//     "summer",
//     new Date(2015, 5, 21),
//     new Date(2015, 8, 20),
//     null,
//     0,
//     null,
//   ],
//   [
//     "2015Autumn",
//     "Autumn 2015",
//     "autumn",
//     new Date(2015, 8, 21),
//     new Date(2015, 11, 20),
//     null,
//     0,
//     null,
//   ],
//   [
//     "2015Winter",
//     "Winter 2015",
//     "winter",
//     new Date(2015, 11, 21),
//     new Date(2016, 2, 21),
//     null,
//     0,
//     null,
//   ],
//   [
//     "Football",
//     "Football Season",
//     "sports",
//     new Date(2014, 8, 4),
//     new Date(2015, 1, 1),
//     null,
//     100,
//     null,
//   ],
//   [
//     "Baseball",
//     "Baseball Season",
//     "sports",
//     new Date(2015, 2, 31),
//     new Date(2015, 9, 20),
//     null,
//     14,
//     null,
//   ],
//   [
//     "Basketball",
//     "Basketball Season",
//     "sports",
//     new Date(2014, 9, 28),
//     new Date(2015, 5, 20),
//     null,
//     86,
//     null,
//   ],
//   [
//     "Hockey",
//     "Hockey Season",
//     "sports",
//     new Date(2014, 9, 8),
//     new Date(2015, 5, 21),
//     null,
//     89,
//     null,
//   ],
// ];

// export const data = [columns, ...rows];

// export const options = {
//   height: 400,
//   gantt: {
//     trackHeight: 30,
//   },
// };

// export function GanttChart() {
//   return (
//     <Chart
//       chartType="Gantt"
//       width="100%"
//       height="50%"
//       data={data}
//       options={options}
//     />
//   );
// }