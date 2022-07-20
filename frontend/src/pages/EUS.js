import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import MachineConnectivity from '../components/eus/MachineConnectivity';
import EquipmentDetails from '../components/eus/EquipmentFrequency';
import '../styles/eus.css';
import '../styles/toggler.css';

const EUS = () => {
  const [machineConnectivityData, setMachineConnectivityData] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  // Calling /machines/ & /machinesConnecitivity/
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/api/machineConnectivity').then((res) =>
        res.json()
      ),
      fetch('http://localhost:4000/api/machines').then((res) => res.json()),
    ])
      .then(([machineConnectivityData, machinesData]) => {
        // Filtering the data
        // 1. Check if machines exists in machine connectivity
        // 2. If yes, then just let the data be
        // 3. use a json object and add to the back of machineConnectivityData
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
        <h1>Equipment Utilisation Snapshot</h1>
        {!isLoading ? (
          <div className='eus-components'>
            <div className='machineConnectivity'>
              <MachineConnectivity data={machineConnectivityData} />
            </div>
            <div className='equipmentDetails mt-4'>
              <EquipmentDetails />
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
