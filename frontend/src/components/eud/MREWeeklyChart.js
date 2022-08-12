import { Chart } from 'react-google-charts';
import CircleIcon from '@mui/icons-material/Circle';
import './styles/style.css';
import { UsageChartColours } from './UsageChartData';

const headerdata = ['Equipment Name', 'Recipe Name', 'Start', 'End'];
let coloursArr = [];

export let options = {
  colors: coloursArr,
  timeline: {
    groupByRowLabel: true,
    showBarLabels: false,
  },
};

const colourAndRecipeArr = [];
Promise.all([
  fetch(`http://localhost:4000/api/getAllEquipment`).then((res) => res.json()),
]).then(([recipes]) => {
  for (let i = 0; i < recipes.data.length; i++) {
    colourAndRecipeArr.push({
      equipment: recipes.data[i].name,
      colour: UsageChartColours[i],
    });
  }
});

export function MREWeeklyChart(data) {
  const data1 = data.data.data; // returns equipment, recipe, start_time, end_time
  let usageArr = [];
  let recipeArr = [];
  let uniqueColourAndRecipes = [];

  // ensures first object from data returned gets displayed
  usageArr.push(headerdata);

  // formats data such that react-google-charts can take in
  for (let i = 0; i < data1.length; i++) {
    usageArr.push(Object.values(data1[i]));
  }

  if (data1.length === 0) {
    return;
  } else {
    if (Object.keys(data1[0])[0] === 'day') {
      var first = new Date(usageArr[1][2]);
      for (let i = 1; i < usageArr.length; i++) {
        var firstDay = first.getDay();
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
  }

  // takes all recipe names from chart and pushes to new array
  for (let x = 1; x < usageArr.length; x++) {
    recipeArr.push(usageArr[x][1]);
  }

  // removes duplicate recipe names
  let uniqueRecipe = [...new Set(recipeArr)];
  console.log(uniqueRecipe);

  if (coloursArr.length > uniqueRecipe.length || coloursArr.length > 0) {
    coloursArr = [];
  }
  console.log(options.colors);
  for (let x = 0; x < uniqueRecipe.length; x++) {
    for (let y = 0; y < colourAndRecipeArr.length; y++) {
      if (uniqueRecipe[x] === colourAndRecipeArr[y].equipment) {
        uniqueColourAndRecipes.push({
          equipment: uniqueRecipe[x],
          colour: colourAndRecipeArr[y].colour,
        });
        coloursArr.push(colourAndRecipeArr[y].colour);
      }
    }
  }

  options.colors = coloursArr;
  console.log(uniqueColourAndRecipes);
  console.log(options.colors);

  return (
    <>
      <div className='row mb-2'>
        {uniqueColourAndRecipes.length === 0 ? (
          <br></br>
        ) : (
          uniqueColourAndRecipes.map((data) => (
            <div className='alignIcon mr-2'>
              <CircleIcon className='mr-1' style={{ fill: data.colour }} />
              {data.equipment}
            </div>
          ))
        )}
      </div>
      <Chart
        chartType='Timeline'
        data={usageArr}
        width='99%'
        height='450px'
        options={options}
      />
    </>
  );
}
