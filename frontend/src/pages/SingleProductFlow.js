import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/Sidebar';
import '../styles/spfd.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {GanttChart } from "../components/spfd/ganttChart";
import { addDays, subDays } from 'date-fns';


const SingleProductFlow = () => {
 

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  
  
  return (
    <div className='singlProductFlow row p-0 w-100p'>

      <div className='po-sidebar sidebar col-2'>  {/* sidebar */}
          <SideBar />
      </div>

      <div className='pt-2 Row1'>                 {/* Title */}
        <h3>Single Product Flow Dashboard</h3>
      </div>
      
      <div className='Row2'>                      {/* DatePicker */}
        <div className='col-2'>
        <DatePicker
        placeholderText="Please select a date"
        dateFormat="dd/MM/yyyy"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={addDays(startDate, 4)}
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
        />    
        </div>
      </div>
      <div className='Row 3'>                     {/* GanttChart */}
        <div className='col-2'>
          <GanttChart />
        </div>
      </div>
    </div>
  )
}

export default SingleProductFlow;
