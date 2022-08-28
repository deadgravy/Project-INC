import { Chart } from 'react-google-charts';
import CircleIcon from '@mui/icons-material/Circle';
import './styles/style.css';
import { UsageChartColours } from './UsageChartData';
import { useEffect, useState } from 'react';

export function UsageChart({ data }) {
  let data1 = data.data; // returns equipment, recipe, start_time, end_time

  const [usageArrChart, setUsageArrChart] = useState([]);
  const [legend, setLegend] = useState([]);

  useEffect(() => {
    const colourAndRecipeArr = [];
    let usageArr = [];

    fetch(`http://localhost:4000/api/getAllRecipeName`)
      .then((res) => res.json())
      .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          colourAndRecipeArr.push({
            recipe: result.data[i].name,
            colour: UsageChartColours[i],
          });
        }
        // color-recipe map
        console.log('colourAndRecipeArr', colourAndRecipeArr);
        // Create color array based on recipe names
        data1.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
        console.log('data1(after sorting)', data1);
        // Create the colorArr based on color-recipe object (colourAndRecipeArr)
        const colorArr = data1.map((item) => {
          let foundCR = colourAndRecipeArr.find(
            (cr) => cr.recipe === item.recipe
          );
          // console.log(`Recipe: ${item.recipe} color is ${foundCR.colour}`);
          return foundCR.colour;
        });

        console.log('colorArr', colorArr);
        // setColoursArrChart(Array.from(new Set([...colorArr])));

        // Create Legend based on unique colorArr
        // let tempLegend = [];
        const tempLegend = Array.from(new Set([...colorArr])).map((color) => {
          let foundCR = colourAndRecipeArr.find((cr) => cr.colour === color);
          return foundCR;
        });

        // console.log(tempLegend);
        setLegend(tempLegend);

        // Recreate the header
        // Suggested Sol: https://stackoverflow.com/questions/23268616/color-in-googles-timeline-chart-bars-based-in-the-a-specific-value
        usageArr.push([
          { type: 'string', id: 'Equipment Name' },
          { type: 'string', id: 'Recipe' },
          { type: 'string', role: 'style' },
          { type: 'date', id: 'Start' },
          { type: 'date', id: 'End' },
        ]);

        // formats data such that react-google-charts can take in
        for (let i = 0; i < data1.length; i++) {
          // console.log(Object.values(data1[i]));
          const arr = Object.values(data1[i]);
          arr.splice(2, 0, `color: ${colorArr[i]}`);
          // console.log(arr);
          // usageArr.push(Object.values(data1[i]));
          usageArr.push(arr);
        }

        for (let i = 1; i < usageArr.length; i++) {
          usageArr[i][3] = new Date(usageArr[i][3]);
          usageArr[i][4] = new Date(usageArr[i][4]);
        }

        console.log('usageArr', usageArr);
        setUsageArrChart(usageArr);
      });
  }, [data1]);

  return (
    <>
      <div className='row mb-2 colourLegend'>
        {legend.length === 0 ? (
          <br></br>
        ) : (
          legend.map((data) => (
            <div className='alignIcon mr-2'>
              <CircleIcon className='mr-1' style={{ fill: data.colour }} />
              {data.recipe}
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
