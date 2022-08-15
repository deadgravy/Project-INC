import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const MODAL_STYLES = {                                     //Styles for the content
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {                                   //Styles for the background
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 1000,
  overflowY: "auto"
}

export default function Modal({ setIsOpen, selectedProductFlow, setSelectedProductFlow }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [recipes, setRecipes] = useState([]);
  
  

  useEffect(() =>{
    fetch('http://localhost:4000/api/getAllRecipeName')
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        if(data.status === "success") {
          setRecipes(data.data)
        }
    })
  },[])

  return ReactDom.createPortal (
    <>
      <div style={OVERLAY_STYLES}/>
      <div style={MODAL_STYLES}>
        {
          <form>
            <div>
                  <DatePicker
                    placeholderText="Please Select Date"
                    dateFormat="yyyy/MM/dd"
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={addDays(startDate, 4)}
                    onChange={(update) => {
                      setDateRange(update)
                    }}
                    isClearable={true}
                  />
                </div>

                <div>
                  {recipes.map((recipe, index) => {
                    return (
                      <div key={index} style={{height: "1rem"}} className='radioButton'>
                        <input
                          id={recipe.name}
                          name={recipe.name}
                          className='form-ext-input'
                          type='radio'
                          onChange={() => {
                            setSelectedProductFlow({...selectedProductFlow, recipeName: recipe.name, startDate: dateRange[0], endDate: dateRange[1]})
                          }}
                        />
                        <label className='form-ext-label' htmlFor={recipe.name}>
                          {recipe.name}
                        </label>
                      </div>
                    )
                  })}
                </div>
          </form> 
        }
        {}
        <button onClick={() => setIsOpen(false)}>Continue</button>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </>,
    document.getElementById('portal')
  )
}