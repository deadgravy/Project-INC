import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const MODAL_STYLES = {
  //Styles for the content
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000,
  width: 400,
  height: '90%',
  overflowY: 'auto',
};

const OVERLAY_STYLES = {
  //Styles for the background
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 1000,
};

export default function Modal({
  setIsOpen,
  selectedProductFlow,
  setSelectedProductFlow,
}) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [recipes, setRecipes] = useState([]);
  const [recipeSelected, setRecipeSelected] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/getAllRecipeName')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          setRecipes(data.data);
        }
      });
  }, []);

  const onContinue = () => {
    setIsOpen(false);
    setSelectedProductFlow({
      ...selectedProductFlow,
      recipeName: recipeSelected,
      startDate: dateRange[0],
      endDate: dateRange[1],
    });
  };

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />

      <div style={MODAL_STYLES}>
        {
          <div className='spfd-modal'>
            <div>
              <DatePicker
                placeholderText='Please Select Date'
                dateFormat='yyyy/MM/dd'
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={addDays(startDate, 4)}
                // showYearDropdown
                // dateFormatCalendar='MMMM'
                // yearDropdownItemNumber={5}
                // scrollableYearDropdown
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />
            </div>

            <div className='radio-btns'>
              {recipes.map((recipe, index) => {
                return (
                  <div
                    key={index}
                    style={{ height: '2rem' }}
                    className='radioButton'
                  >
                    <input
                      id={recipe.name}
                      name='selectedRecipe'
                      value={recipe.name}
                      className='form-ext-input'
                      type='radio'
                      onChange={(e) => {
                        console.log(e.target.value);
                        setRecipeSelected(e.target.value);
                      }}
                    />
                    <label className='form-ext-label' htmlFor={recipe.name}>
                      {recipe.name}
                    </label>
                  </div>
                );
              })}
            </div>

            <button
              className='continue-btn'
              onClick={onContinue}
              style={{ backgroundColor: 'green', color: '#FFFF' }}
            >
              Continue
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{ backgroundColor: 'red', color: '#FFFF' }}
            >
              Close
            </button>
          </div>
        }
      </div>
    </>,
    document.getElementById('portal')
  );
}
