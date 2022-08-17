import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import MachineConnectivity from '../components/eus/MachineConnectivity';
import EquipmentFrequency from '../components/eus/EquipmentFrequency';
import '../styles/eus.css';
import '../styles/toggler.css';
import 'intro.js/introjs.css';
import { Steps, Hints } from 'intro.js-react';
import introJs from 'intro.js';
<style>
  .modal{' '}
  {{
    top: '0 !important',
  }}
</style>;

const EUS = () => {
  const [machineConnectivityData, setMachineConnectivityData] = useState(null);
  const [allEquipments, setAllEquipments] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const initialStep = 0;

  //Intro.js
  const steps = [
    {
      element: '#title',
      intro:
        'Welcome to the Equipment Utilisation Snapshot! This page aims to give you a better understanding of the equipment frequency and machine status in real time',
    },
    {
      element: '#panel1a-header',
      intro:
        'This is the machine connectivity section! This will give you an indication whether a machine is connected to the database currently. ',
    },
    {
      element: '#cards',
      intro:
        'This part shows all the machines in your database. For your reference, red means disconnected whilst green means connected',
    },
    {
      element: '.equipFreq',
      intro:
        'This section will show the equipment frequency based on type of counter and date selected',
    },
    {
      element: '#freqData',
      intro:
        'Here will show the data upon the current date by default but as there is no data currently, it will show no data is shown.',
    },
    {
      element: '#modal',
      intro:
        'To make changes to what is displayed on the graph, we have created a modal for you to make your choice. Here is where you can change the date and type of counters. Furthermore, there is a data comparison choice.',
    },
    {
      element: '#legend',
      intro:
        'The legend will correspond with the equipments in the graph shown by color coding.',
    },
  ];

  const onExit = () => {
    setStepsEnabled(false);
  };

  const toggleSteps = () => {
    setStepsEnabled(true);
  };

  // Calling /machines/ & /machinesConnecitivity/
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/api/machineConnectivity').then((res) =>
        res.json()
      ),
      fetch('http://localhost:4000/api/machines').then((res) => res.json()),
      fetch('http://localhost:4000/api/getAllEquipments').then((res) =>
        res.json()
      ),
    ])
      .then(([machineConnectivityData, machinesData, allEquipments]) => {
        let tempArr = machineConnectivityData.data;
        for (let m = 0; m < machinesData.data.length; m++) {
          let found = false;
          for (let mcd = 0; mcd < machineConnectivityData.data.length; mcd++) {
            if (
              machinesData.data[m].machine_id ===
              machineConnectivityData.data[mcd].client_no
            ) {
              found = true;
            }
          }
          if (found === false) {
            let jsonStructure = {
              client_no: machinesData.data[m].machine_id,
              ttl: 10,
              created_at: null,
              machine_name: machinesData.data[m].machine_name,
              location_id: null,
            };
            tempArr.push(jsonStructure);
          } else {
            found = false;
          }
        }
        // Setting the data
        setMachineConnectivityData({
          data: tempArr,
        });
        setAllEquipments({
          data: allEquipments,
        });
        setIsloading(false);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <div className='EUS row'>
      <div className='eus-sidebar col-2'>
        <Sidebar />
      </div>
      <div className='eus-display col-10 px-4 py-6'>
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={onExit}
        />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h1 id='title'>Equipment Utilisation Snapshot</h1>
          <button style={{ marginLeft: 20 }} onClick={toggleSteps}>
            Toggle Steps
          </button>
        </div>
        {!isLoading ? (
          <div className='eus-components'>
            <div className='machineConnectivity'>
              <MachineConnectivity data={machineConnectivityData} />
            </div>
            <div className='equipmentDetails mt-4'>
              <EquipmentFrequency allEquipments={allEquipments} />
            </div>
          </div>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    </div>
  );
};

export default EUS;
