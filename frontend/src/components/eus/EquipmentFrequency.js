import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Toggler from '../general/Toggler';
import CounterToggle from './CounterToggle';
import { VictoryPie } from 'victory';
import Legend from './Legend';
import { useEffect, useState } from 'react';

const EquipmentDetails = ({ allEquipments }) => {
  const allEquipmentsData = allEquipments.data.data;
  const [totalData, setTotalData] = useState(null);
  const [equipmentFrequencyData, setEquipmentFrequencyData] = useState([])

  const colorScheme = [
    '#39CEF3',
    '#f03d4d',
    '#5e5cc7',
    '#0066FF',
    '#4643e2',
    '#800080',
    '#2972fa',
    '#0dd157',
    '#fab633',
    '#fb4143',
    '#ffdadd',
    '#5468ff',
    '#34568B',
    '#FF6F61',
    '#6B5B95',
    '#92A8D1',
    '#F7CAC9',
    '#009B77',
    '#DFCFBE',
  ];

  useEffect(() => {
    Promise.all([
      fetch(
        'http://localhost:4000/api/getAllEquipmentStartOrStop/2021-08-01/2021-08-31/2'
      ).then((res) => res.json()),
    ])
      .then(([totalData]) => {
        setTotalData(totalData.data);
        // 1. I will have to run through all equipments to get the id
        // 2. Then I will have to pass in the id into /equipmentStartOrStopCount/:start/:end/:equipmentid/:startOrStop
        // 3. Get the information of the data
        // allEquipmentsData.map((equipment) => {
        //   Promise.all([
        //     fetch(
        //       `http://localhost:4000/api/getEquipmentStartOrStopCount/2021-08-01/2021-08-31/${equipment.equipmentid}/2`
        //     ).then((res) => res.json()),
        //   ]).then(([equipmentData]) => {
        //     let x = equipmentData.data.length;
        //     let y = (equipmentData.data.length / totalData.data.length) * 100;

        //     setEquipmentFrequencyData([...equipmentFrequencyData, {x: x, y: y}])
        //   });
        // });
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    if (totalData) {
      let tempArr = [];
      allEquipmentsData.map((equipment) => {
        fetch(`http://localhost:4000/api/getEquipmentStartOrStopCount/2021-08-01/2021-08-31/${equipment.equipmentid}/2`)
        .then((res) => res.json())
        .then((result) => {
          let x = result.data.length;
          let y = (result.data.length / totalData.length) * 100;
          tempArr.push({x: x, y: Math.round(y)})
        })
      })
      setEquipmentFrequencyData(tempArr);
    }
  }, [totalData])

  return (

    <Accordion>
      {equipmentFrequencyData.map((data)=> {
        console.log(data)
        console.log(equipmentFrequencyData.length)
      })}
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className='text-xl font-bold pl-2'>
          Equipment Frequency
        </Typography>
      </AccordionSummary>
      <AccordionDetails className='row py-2'>
        <div className='col-10' align='center'>
          <div className='toggler'>
            <Toggler />
          </div>
          <div className='w-60p u-text-center'>
            <h4 className='mt-2'>From 10th of August to 17th of August</h4>
            <VictoryPie
              colorScale={colorScheme}
              data={equipmentFrequencyData}
              innerRadius={100}
              padAngle={5}
              labelRadius={({ innerRadius }) => innerRadius + 15}
              cornerRadius={5}
              style={{
                labels: { fill: 'white', fontSize: 20, fontWeight: 'bold' },
              }}
            />
          </div>
        </div>
        <div className='col-2'>
          <CounterToggle />
          <Legend
            allEquipmentData={allEquipmentsData}
            colorScheme={colorScheme}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default EquipmentDetails;
