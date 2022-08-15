import { Chart } from 'react-google-charts';
import CircleIcon from '@mui/icons-material/Circle';
import './styles/style.css';
import { UsageChartColours } from './UsageChartData';
import { useEffect, useState } from 'react';

export function WeeklyChart({ data }) {
  let data1 = data.data; // returns equipment, equipment, start_time, end_time

  const [usageArrChart, setUsageArrChart] = useState([]);
  const [legend, setLegend] = useState([]);

  useEffect(() => {
    const colourAndEquipArr = [];
    let usageArr = [];

    fetch(`http://localhost:4000/api/getAllEquipment`)
      .then((res) => res.json())
      .then((result) => {
        // loops through colours in UsageChartData.js and assigns it to each equipment
        for (let i = 0; i < result.data.length; i++) {
          colourAndEquipArr.push({
            equipment: result.data[i].name,
            colour: UsageChartColours[i],
          });
        }
        // color-equipment map
        console.log('colourAndEquipArr', colourAndEquipArr);
        // Create color array based on equipment names
        data1.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        console.log('data1(after sorting)', data1);
        // Create the colorArr based on color-equipment object (colourAndEquipArr)
        const colorArr = data1.map((item) => {
          let foundCR = colourAndEquipArr.find(
            (cr) => cr.equipment === item.equipment
          );
          // console.log(
          //   `equipment: ${item.equipment} color is ${foundCR.colour}`
          // );
          return foundCR.colour;
        });

        console.log('colorArr', colorArr);
        // setColoursArrChart(Array.from(new Set([...colorArr])));

        // Create Legend based on unique colorArr
        // let tempLegend = [];
        const tempLegend = Array.from(new Set([...colorArr])).map((color) => {
          let foundCR = colourAndEquipArr.find((cr) => cr.colour === color);
          return foundCR;
        });

        // console.log(tempLegend);
        setLegend(tempLegend);

        // Recreate the header
        // Suggested Sol: https://stackoverflow.com/questions/23268616/color-in-googles-timeline-chart-bars-based-in-the-a-specific-value
        usageArr.push([
          { type: 'string', id: 'day' },
          { type: 'string', id: 'equipment' },
          { type: 'string', role: 'style' },
          { type: 'date', id: 'Start' },
          { type: 'date', id: 'End' },
        ]);

        // formats data such that react-google-charts can take in
        for (let i = 0; i < data1.length; i++) {
          const arr = Object.values(data1[i]);
          arr.splice(2, 0, `color: ${colorArr[i]}`);
          // console.log(arr);
          // usageArr.push(Object.values(data1[i]));
          usageArr.push(arr);
        }

        // ensures rows all start from the same point
        if (data1.length === 0) {
          return;
        } else {
          if (Object.keys(data1[0])[0] === 'day') {
            var first = new Date(usageArr[1][3]);
            for (let i = 1; i < usageArr.length; i++) {
              var firstDay = first.getDay();
              var startdate = new Date(usageArr[i][3]);
              var enddate = new Date(usageArr[i][4]);
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
              usageArr[i][3] = startMilli;
              usageArr[i][4] = endMilli;
            }
          }
        }

        console.log('usageArr', usageArr);
        setUsageArrChart(usageArr);
      });
  }, [data1]);

  return (
    <>
      <div className='row mb-2'>
        {legend.length === 0 ? (
          <br></br>
        ) : (
          legend.map((data) => (
            <div className='alignIcon mr-2'>
              <CircleIcon
                className='mr-1'
                style={{ fill: data.colour, fontSize: 20, fontSize: 20 }}
              />
              <span>
                <span>{data.equipment}</span>
              </span>
            </div>
          ))
        )}
      </div>
      {usageArrChart.length > 0 && (
        <Chart
          chartType='Timeline'
          data={usageArrChart}
          width='99%'
          height='450px'
          options={{
            timeline: {
              groupByRowLabel: true,
              showBarLabels: false,
            },
          }}
        />
      )}
    </>
  );
}
