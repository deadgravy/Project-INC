import { grey } from '@mui/material/colors';
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

export function GanttChart({
  selectedProductFlow,
  plsShowEPA,
  resetSelectedProductFlow,
}) {
  const columns = [
    { type: 'string', id: 'Equipment' },
    { type: 'string', id: 'Recipe' },
    { type: 'datetime', id: 'Start' },
    { type: 'datetime', id: 'End' },
  ];
  const [ganttData, setGanttData] = useState([]);
  const options = { height: 400, gantt: { trackHeight: 30 } };

  useEffect(() => {
    const formattedStartDate = selectedProductFlow.startDate
      .toLocaleDateString('zh-CN')
      .substring(0, 10)
      .replaceAll('/', '-');
    const formattedEndDate = selectedProductFlow.endDate
      .toLocaleDateString('zh-CN')
      .substring(0, 10)
      .replaceAll('/', '-');
    fetch(
      `/api/getSingleProductWithNameDate/${formattedStartDate}/${formattedEndDate}/${selectedProductFlow.recipeName}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
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
          console.log('rows', rows);
          if (rows.length > 0) {
            setGanttData([columns, ...rows]);
            plsShowEPA(true);
          } else {
            setGanttData([]);
            plsShowEPA(false);
          }
        }
      });
  }, [selectedProductFlow.endDate]);

  return (
    <>
      {ganttData.length > 0 ? (
        <Chart
          chartType='Timeline'
          width='100%'
          height='50%'
          data={ganttData}
          options={options}
        />
      ) : (
        <div>
          <h6
            style={{
              backgroundColor: '#d3d3d3',
              color: '#f36b25',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}
          >
            No Data Found! Please Select Again.
          </h6>
        </div>
      )}
    </>
  );
}
