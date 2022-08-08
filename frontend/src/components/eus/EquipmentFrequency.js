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
  const equipmentFrequencyData = [
    { x: 5, y: 10 },
    { x: 14, y: 25 },
    { x: 9, y: 20 },
    { x: 11, y: 20 },
    { x: 3, y: 5 },
    { x: 10, y: 20 },
  ];

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
    '#DFCFBE'
  ];
  return (
    <Accordion>
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
          <Legend allEquipmentData={allEquipmentsData} colorScheme={colorScheme}/>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default EquipmentDetails;
