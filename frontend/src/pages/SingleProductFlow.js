import React, { useState, useEffect } from 'react';
import SideBar from '../components/sidebar/Sidebar';
import Modal from '../components/spfd/modal';
import '../styles/spfd.css';
import {GanttChart } from "../components/spfd/ganttChart";


const SingleProductFlow = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProductFlow, setSelectedProductFlow] = useState({
    "recipeName": "Product H",
    "startDate": new Date('2021-08-09'),
    "endDate": new Date('2021-08-13')
  })
  console.log("selectedProductFlow: ", selectedProductFlow);
  // const [selectedEquipment, setSelectedEquipment] = useState([])
  // const [ganttChart, setGanttChart] = useState([])
  
  useEffect(() =>{
    Promise.all([
        // fetch('http://localhost:4000/api/getAllRecipeName').then((res) => res.json()),

        // fetch('http://localhost:4000/api/getSingleProductWithNameDate/${dateRange[0]}/${dateRange[1]}/${recipe.name}').then((res) => res.json()),

        // fetch('http://localhost:4000/api/getSingleProductEquipment/:startDate/:endDate/:name').then((res) => res.json()),

        // fetch('http://localhost:4000/api/getEquipmentUsageByName/:name/:ename').then((res) => res.json())
        
        ])
        // .then(([result1, result2, result3, result4]) => {
        //   console.log("result1", result1);
        //   setRecipes(result1.data);
        //   const recipes = result1.data
          
        //   // setGanttChart({
        //   //   data: result2.data
        //   // })
        // })
        .catch((error) => console.log('error', error));
},[])



// const radioButtonStyle = {
//   hight: 
// }



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
                  <GanttChart selectedProductFlow={selectedProductFlow} setSelectedProductFlow={setSelectedProductFlow}/>
                )
              }
              
            </div>
          </div>

        </div>
      </div>
  )
}

export default SingleProductFlow;
