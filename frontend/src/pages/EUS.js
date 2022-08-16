import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import MachineConnectivity from '../components/eus/MachineConnectivity';
import EquipmentFrequency from '../components/eus/EquipmentFrequency';
import '../styles/eus.css';
import '../styles/toggler.css';
import 'intro.js/introjs.css';
import { Steps, Hints } from "intro.js-react";
<style>
  .modal {{
    top: '0 !important'
  }}
</style>

const EUS = () => {
  const [machineConnectivityData, setMachineConnectivityData] = useState(null);
  const [allEquipments, setAllEquipments] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const stepsEnabled = true;
  const initialStep = 0;

  //Intro.js
  const steps = [
    {
      element: "#title",
      intro: "test1"
    },
    {
      element: "#panel1a-header",
      intro: "test2"
    },
    {
      element: "#cards",
      intro: "test3"
    },
    {
      element: ".equipFreq",
      intro: "test4"
    },
    {
      element: "#freqData",
      intro: "test5"
    },
    {
      element: "#modal",
      intro: "test6"
    },
    {
      element: "#legend",
      intro: "test7"
    },
  ];

  const onExit = () => {
    this.setState(() => ({ stepsEnabled: false }));
  };

  const toggleSteps = () => {
    this.setState(prevState => ({ stepsEnabled: !prevState.stepsEnabled }));
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
        <h1 id='title'>Equipment Utilisation Snapshot</h1>
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
