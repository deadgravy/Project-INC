import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/Sidebar';
import Modal from '../components/spfd/modal';
import '../styles/spfd.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {GanttChart } from "../components/spfd/ganttChart";
import { addDays } from 'date-fns';

const SingleProductFlow = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState([])
  
  useEffect(() =>{
    
  })

  return (
    <React.StrictMode>
      <div className='singlProductFlow row p-0 w-100p'>

        <div className='po-sidebar sidebar col-2'>    {/* sidebar */}
            <SideBar/>
        </div>
        
        <div className='po-display col-10'>
          
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

          <div className='Row3'>                           {/*  Modal */}
            <div className='col-2'>
              <button onClick={() => setIsOpen(true)}>Select Recipe</button>
              <Modal open = {isOpen} onClose = {() => setIsOpen(false)}modal/>
            </div>
          </div>
          
          <div className='pt-2 Row4'>                      {/*  GanttChart */}
            <div className='col-12'>
              <GanttChart/>
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
