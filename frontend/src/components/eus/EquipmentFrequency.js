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
  const [compareDate, setCompareDate] = useState(moment().format('YYYY-MM-DD'));
  const [equipmentFrequencyData, setEquipmentFrequencyData] = useState([]);
  const [compareFrequencyData, setCompareFrequencyData] = useState([]);
  const [compare, setCompare] = useState(false);
  const [startDate, setStartDate] = useState(
    moment('2021-08-12').format('YYYY-MM-DD')
  );
  const [endDate, setEndDate] = useState(
    moment('2021-08-12').format('YYYY-MM-DD')
  );
  const [counter, setCounter] = useState(1);
  const [parentCounter, setParentCounter] = useState(1);
  const [update, setUpdate] = useState(false);
  const [counterType, setCounterType] = useState('Start');

  const handleUserUpdate = (startDate, endDate, counter, isCompareValue) => {
    setUpdate(true);
    setCompare(isCompareValue);
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    setStartDate(startDate);
    setEndDate(endDate);
    setCounter(counter);
    setCompareDate(startDate + ' to ' + endDate);
    if (!isCompareValue) {
      setDate(startDate + ' to ' + endDate);
    }
    if (counter === '1') {
      setCounterType('Start');
    } else if (counter === '2') {
      setCounterType('Stop');
    } else if (counter === '3') {
      setCounterType('Completed');
      setCounter(2);
    } else {
      setCounterType('Anomolies');
    }
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
    Promise.all([
      fetch('/api/getAllEquipmentStartOrStop', {
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
      })
      .catch((error) => console.log('error', error));
  }, [update, compare]);

  useEffect(() => {
    if (totalData && update && counter !== '4') {
      fetch(`/api/getEquipmentStartOrStopCount`, {
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
        .then((res) => {
          if (compare) {
            setCompareFrequencyData(res.data);
          }

          if (!compare) {
            setEquipmentFrequencyData(res.data);
          }
          setUpdate(false);
        });
    }
  }, [totalData, update, counter, compare]);

  useEffect(() => {
    if (counter === '4') {
      fetch(`/api/getAnomolies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: `${startDate}`,
          end: `${endDate}`,
          equipmentid: allEquipmentsData.map((eq) => eq.equipmentid),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (compare) {
            setCompareFrequencyData(res.data);
          } else {
            setEquipmentFrequencyData(res.data);
          }
          setUpdate(false);
        });
    }
  }, [update, counter, compare]);

  return (
    <Accordion defaultExpanded={true}>
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
            <div
              style={{
                display: equipmentFrequencyData.length > 0 ? 'block' : 'none',
              }}
            >
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
            <div
              style={{
                display: equipmentFrequencyData.length == 0 ? 'block' : 'none',
              }}
            >
              <h4 className='text-danger'>No Data Found</h4>
            </div>
            <div style={{ display: compare ? 'block' : 'none' }}>
              <h4 className='mt-2'>{compareDate}</h4>
              <div
                style={{
                  display: compareFrequencyData.length > 0 ? 'block' : 'none',
                }}
              >
                <VictoryPie
                  colorScale={colorScheme}
                  data={compareFrequencyData}
                  innerRadius={100}
                  padAngle={2}
                  labelRadius={({ innerRadius }) => innerRadius + 15}
                  cornerRadius={5}
                  style={{
                    labels: { fill: 'white', fontSize: 20, fontWeight: 'bold' },
                  }}
                />
              </div>
              <div
                style={{
                  display: compareFrequencyData.length == 0 ? 'block' : 'none',
                }}
              >
                <h4 className='text-danger'>No Data Found</h4>
              </div>
            </div>
          </div>
        </div>
        <div className='col-2' align='center'>
          <h4>{counterType} Count</h4>
          <Modal
            handleUserUpdate={handleUserUpdate}
            parentCounter={parentCounter}
            setParentCounter={setParentCounter}
          />
          <Legend
            equipmentFrequencyData={equipmentFrequencyData}
            colorScheme={colorScheme}
            name={'Initial Legend'}
          />
          <div style={{ display: compare ? 'block' : 'none' }}>
            <Legend
              equipmentFrequencyData={compareFrequencyData}
              colorScheme={colorScheme}
              name={'Comparison Legend'}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default EquipmentDetails;
