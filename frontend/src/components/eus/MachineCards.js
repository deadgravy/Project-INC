import moment from 'moment';
import React, { useState } from 'react';

const MachineCards = ({ data }) => {
  let [connection, setConnection] = useState(data.ttl === 10 ? 'disconnected' : 'connected');

  return (
    <div className='card'>
      <div className={'machineStatus ' + connection}></div>
      <div className='machineDetails p-2'>
        <h4>{data.machine_name ? data.machine_name : 'NULL'}</h4>
        <p className='text-md text-gray-500'>
          Last connected time: {moment(data.created_at).format('hh:mm DD/MM')}
        </p>
        <p className='text-sm text-gray-500 mb-0'>{data.client_no}</p>
      </div>
    </div>
  );
};

export default MachineCards;
