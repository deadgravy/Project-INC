import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import MachineConnectivity from '../components/eus/MachineConnectivity'
import '../styles/eus.css';

const EUS = () => {
  return (
    <div className='EUS row'>
      <div className='eus-sidebar col-2'>
        <Sidebar />
      </div>
      <div className='eus-display col-10 px-4 py-6'>
        <h1>Equipment Utilisation Snapshot</h1>
        <MachineConnectivity />
      </div>
    </div>
  );
};

export default EUS;
