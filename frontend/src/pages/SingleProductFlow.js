import React, { useState, useEffect } from 'react';
import SideBar from '../components/sidebar/Sidebar';
import Modal from '../components/spfd/modal';
import '../styles/spfd.css';
import {GanttChart } from "../components/spfd/ganttChart";
import DropDown from '../components/spfd/dropDown';
import { LineChart } from '../components/spfd/lineChart';
import { rgbToHex } from '@mui/material';
 
const SingleProductFlow = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProductFlow, setSelectedProductFlow] = useState({
    "recipeName": "",
    "startDate": null,
    "endDate": null,
    "equipment": ""
  })

  console.log("selectedProductFlow: ", selectedProductFlow);
 
const setEquipmentNameFromDropdown = (selectedEquipment) => {
  setSelectedProductFlow({...selectedProductFlow, equipment: selectedEquipment})
}

const plsShowEPA = (status)=>{
  setShowEPA(status);
}

// const showEPA = () => {
//   if(havedata){
    
//   }
// }

const resetSelectedProductFlow = () => {
  setSelectedProductFlow(
    {
  "recipeName": "",
  "startDate": null,
  "endDate": null,
  "equipment": ""
  })
}

const [showEPA,setShowEPA] = useState(false);
 
return (
    <div className='singlProductFlow row p-0 w-100p'>
      <div className='po-sidebar sidebar col-2'>         {/* sidebar */}
        <SideBar/>
      </div>
       
      <div className='po-display col-10'>
         
        <div className='pt-2 Row1'>                      {/* Title */}
          <h3>Single Product Flow Dashboard</h3>
        </div>
 
        <div className='Row3'>                           {/*  Modal */}
          <div className='col-3'>
            <button onClick={() => setIsOpen(true)}>Select Date and Recipe</button>
            { isOpen && <Modal open={isOpen} onClose={() => setIsOpen(false)} selectedProductFlow={selectedProductFlow} setSelectedProductFlow={setSelectedProductFlow} setIsOpen={setIsOpen} />}
          </div>
        </div>
       
        <div className='pt-2 Row4'>                      {/*  GanttChart */}
          <div className='col-12'>
            {
              selectedProductFlow.startDate !== null && (
                <GanttChart selectedProductFlow={selectedProductFlow} resetSelectedProductFlow={resetSelectedProductFlow}
                plsShowEPA={plsShowEPA}/>
              )
            }
            {
              selectedProductFlow.startDate === null && (
                <div>
                  <h4 style={{color: '#f36b25' ,display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
                    Welcome to Single Product Flow Dashboard.
                  </h4>
                  <p style={{textAlign: 'center', height: 100}}>
                    Please Select Date and Recipe Above!
                  </p>
                </div>
              )
            }
             
          </div>
        </div>
            
        {showEPA && (
          <>
            <div className='pt-2 Row5'>
              <h4>Equipment Production Analysis</h4>
            </div>
 
            <div className='Row6'>
              <div className='col-3'>
                <DropDown selectedProductFlow={selectedProductFlow} setEquipmentNameFromDropdown={setEquipmentNameFromDropdown}/>
              </div>
            </div>
 
            <div className='pt-3 Row7'>
              <div className='col-12'>
                {
                  selectedProductFlow.equipment && (
                    <LineChart selectedProductFlow={selectedProductFlow}/>
                  )
                }
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
 
export default SingleProductFlow;