import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/Sidebar';
import Modal from '../components/pod/Modal';
import '../styles/spfd.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {GanttChart } from "../components/spfd/ganttChart";
import { addDays } from 'date-fns';

const SingleProductFlow = () => {
 

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  
  
  return (
    <React.StrictMode>
      <div className='singlProductFlow row p-0 w-100p'>

        <div className='po-sidebar sidebar col-3'>    {/* sidebar */}
            <SideBar/>
        </div>
        
        <div className='po-display col-9'>
          
          <div className='pt-2 Row1'>                 {/* Title */}
            <h3>Single Product Flow Dashboard</h3>
          </div>
          
          <div className='Row2'>                      {/* DatePicker */}
            <div className='col-3'>
              <DatePicker
              placeholderText="Please Select Date"
              dateFormat="yyyy/MM/dd"
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

          <div className='Row3'>
            <div className='col-2'>                  {/* Need to add backend! look at adeeb one(pod)! */}   
              <Modal/>
            </div>
          </div>
          
          <div className='Row4'>                    {/*  GanttChart */}
            <div className='col-11'>
              <GanttChart />
            </div>
          </div>

          <div className='pt-5 Row5'>                      {/* Title (Equipment Production Analysis) */}
            <h4>Equipment Prodcution Analysis</h4>
          </div>

        </div>
      </div>
    </React.StrictMode>
  )
}

export default SingleProductFlow;
