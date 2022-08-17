import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
 
export default function DropDown({selectedProductFlow, setEquipmentNameFromDropdown}) {
  const [dropDown, setDropDown] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const formattedStartDate = selectedProductFlow.startDate.toLocaleDateString('zh-CN').substring(0,10).replaceAll("/", "-");
  const formattedEndDate = selectedProductFlow.endDate.toLocaleDateString('zh-CN').substring(0,10).replaceAll("/", "-");
  // const options = [
 
  // 'TWICE',
  // 'ITZY',
  // 'NMIXX'
  // ];
  // const options = dropDown
  
  useEffect(() =>{
    fetch(`http://localhost:4000/api/getSingleProductEquipment/${formattedStartDate}/${formattedEndDate}/${selectedProductFlow.recipeName}`)
      .then((res) => res.json())
      .then(data => {
        if(data.status === "success") {
          const formattedEquip = data.data.map((equipment) => equipment.equip_name)
          console.log(formattedEquip);
          setDropDown(Array.from(new Set([...formattedEquip])))
        }
    })
    setSelectedEquipment("");
    setEquipmentNameFromDropdown("")

  },[selectedProductFlow.recipeName])
 
  const onSelected = ({value, lable}) => {
    console.log(value);
    setEquipmentNameFromDropdown(value)
    setSelectedEquipment(value);
  }
  return(
   
    <Dropdown value={selectedEquipment} onChange={onSelected} options={dropDown}  placeholder='Please Select an Equipment'/>
  );
}
