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
import moment from 'moment';
import Modal from './Modal';

const EquipmentDetails = ({ allEquipments }) => {
  const allEquipmentsData = allEquipments.data.data;
  const [totalData, setTotalData] = useState(null);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [equipmentFrequencyData, setEquipmentFrequencyData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [counter, setCounter] = useState(-1);
  const [parentCounter, setParentCounter] = useState(-1);
  const [update, setUpdate] = useState(false);

  const handleUserUpdate = (startDate, endDate, counter) => {
    setUpdate(true);
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    console.log(startDate)
    setStartDate(startDate);
    setEndDate(endDate);
    setCounter(counter);
  };

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
    if (update) {
      Promise.all([
        fetch('http://localhost:4000/api/getAllEquipmentStartOrStop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            start: `${startDate}`,
            end: `${endDate}`,
            startOrStop: `${counter}`,
          }),
        }).then((res) => res.json()),
      ])
        .then(([totalData]) => {
          setTotalData(totalData.data);
          console.log(totalData);
        })
        .catch((error) => console.log('error', error));
    }
  }, []);

  useEffect(() => {
    if (totalData && update) {
      fetch(`http://localhost:4000/api/getEquipmentStartOrStopCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: `${startDate}`,
          end: `${endDate}`,
          startOrStop: `${counter}`,
          equipmentid: allEquipmentsData.map((eq) => eq.equipmentid),
          totalDataLength: totalData.length,
        }),
      })
        .then((res) => res.json())
        .then((res) => setEquipmentFrequencyData(res.data));
    }
  }, [totalData, update]);

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
        <div className='col-10'>
          <div className='w-60p u-text-center'>
            <h4 className='mt-2'>{date}</h4>
            <VictoryPie
              colorScale={colorScheme}
              data={equipmentFrequencyData}
              innerRadius={100}
              padAngle={2}
              labelRadius={({ innerRadius }) => innerRadius + 15}
              cornerRadius={5}
              style={{
                labels: { fill: 'white', fontSize: 20, fontWeight: 'bold' },
              }}
            />
          </div>
        </div>
        <div className='col-2' align='center'>
          <h4>Start Count</h4>
          <Modal
            handleUserUpdate={handleUserUpdate}
            parentCounter={parentCounter}
            setParentCounter={setParentCounter}
          />
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
