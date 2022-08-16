import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function DropDown({selectedProductFlow}) {
  const [dropDown, setDropDown] = useState([]);
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
  },[])

  const onSelected = ({value, lable}) => {
    console.log(value);
    setEquipmentNameFromDropdown(value)
  }
  return( 
    
    <Dropdown onChange={onSelected} options={dropDown}  placeholder='Please select an equipment'/>
  );
}