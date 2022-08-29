import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import moment from 'moment';

export function LineChart({ selectedProductFlow }) {
  const [data, setData] = useState(null);
  const options = {
    chart: {
      title: 'Legend',
      subtitle: 'y-axis is the total time used in minutes (rounded up)',
    },
  };
  useEffect(() => {
    if (selectedProductFlow.equipment) {
      fetch(
        `/api/getEquipmentUsageByName/${selectedProductFlow.recipeName}/${selectedProductFlow.equipment}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 'success') {
            // console.log('Date:', result.data[0].date)
            // console.log('Time:', result.data[0].total_time)
            // const formattedTime = parseInt(result.data[0].data[1].total_time)
            let tempData = [];
            for (let i = 0; i < result.data.length; i++) {
              tempData.push([
                moment(result.data[i].date).format('YYYY-MM-DD'),
                parseInt(result.data[i].total_time),
              ]);
            }
            console.log({ tempData });

            setData([['Date', selectedProductFlow.equipment], ...tempData]);
          }
        });
    }
  }, [selectedProductFlow.equipment, selectedProductFlow.recipeName]);

  return (
    <>
      {data && selectedProductFlow.equipment && (
        <Chart
          chartType='Line'
          width='100%'
          height='400px'
          data={data}
          options={options}
        />
      )}
      {!selectedProductFlow.equipment && (
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
            Please Select An Equipment!
          </h6>
        </div>
      )}
    </>
  );
}
