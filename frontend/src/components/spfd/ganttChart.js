import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";


export function GanttChart({selectedProductFlow}) {
  const columns = [
    { type: "string", id: "Equipment" },
    { type: "string", id: "Recipe" },
    { type: "datetime", id: "Start" },
    { type: "datetime", id: "End" }
  ];
  const [ganttData, setGanttData] = useState([]);
  const options = {height: 400, gantt: {trackHeight: 30}};

  useEffect(() =>{
    const formattedStartDate = selectedProductFlow.startDate.toLocaleDateString('zh-CN').substring(0,10).replaceAll("/", "-");
    const formattedEndDate = selectedProductFlow.endDate.toLocaleDateString('zh-CN').substring(0,10).replaceAll("/", "-");

    fetch(`http://localhost:4000/api/getSingleProductWithNameDate/${formattedStartDate}/${formattedEndDate}/${selectedProductFlow.recipeName}`)
    .then((res) => res.json())
    .then(data => {
      if (data.status === "success") {
        // console.log('data ', data)
        const formattedRows = data.data.map((item) => Object.values(item));
        // console.log(formattedRows)
        const rows = formattedRows.map((row) => {
          const formattedStartDate = new Date(row[2]);
          const formattedEndDate = new Date(row[3]);
          return row
          .slice(0, 2)
          .concat([formattedStartDate, formattedEndDate]);
        });
        console.log("rows", rows);
        if(rows.length > 0){
          setGanttData([columns, ...rows]);
        }
      }
    })
  },[])

  return (
    <>
      {ganttData.length > 0 ? (
          <Chart
            chartType="Timeline"
            width="100%"
            height="50%"
            data={ganttData}
            options={options}
          />
 
        ) : <div>No Data Found! Please select again.</div>
      }
    </>
  );
}