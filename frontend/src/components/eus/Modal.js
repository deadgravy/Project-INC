import { React, useState } from 'react';
import Toggler from '../general/Toggler';
import DatePicker from 'react-datepicker';
import CounterToggle from './CounterToggle';
import 'react-datepicker/dist/react-datepicker.css';

const Modal = ({ handleUserUpdate, parentCounter, setParentCounter }) => {
  const [compare, setCompare] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  var dd = String(startDate.getDate()).padStart(2, '0');
  var mm = String(startDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = startDate.getFullYear();
  let enddate = yyyy + '-' + mm + '-' + dd;
  let startdate = `${yyyy}-${mm}-${dd - 1}`;

  function tempFunction() {
    if (!compare) {
      handleUserUpdate(startDate, startDate, parentCounter)
    }
  }

  return (
    <div>
      <div
        className='modal modal-animated--zoom-in modal-large'
        id='basic-modal'
      >
        <a
          href='#searchModalDialog'
          className='modal-overlay close-btn'
          aria-label='Close'
        ></a>
        <div className='modal-content' role='document'>
          <div className='modal-header'>
            <a href='#components' className='u-pull-right' aria-label='Close'>
              <span className='icon'>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fas'
                  data-icon='times'
                  className='svg-inline--fa fa-times fa-w-11 fa-wrapper'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 352 512'
                >
                  <path
                    fill='currentColor'
                    d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'
                  ></path>
                </svg>
              </span>
            </a>
            <div className='modal-title'>Options Select</div>
          </div>
          <div className='modal-body u-overflow-y-scroll'>
            <h5>Steps to take</h5>
            <p>
              1. If you wish to compare graphs, please click on the "Compare"
              button
            </p>
            <p>2. Select type of counter you wish to view</p>
            <p>
              3. Select the first and end date span of a day / week / month you
              wish to compare
            </p>
            <p>
              4. Confirm your choice by clicking on the confirm changes button
            </p>
            <h6>Wish to compare graphs? Click on the button below</h6>
            <button
              className='bg-green-500 text-white'
              onClick={() => (compare ? setCompare(false) : compare)}
            >
              one date
            </button>
            <button
              className='bg-primary text-white'
              onClick={() => (compare ? compare : setCompare(true))}
            >
              compare
            </button>
            <div
              className='oneDate'
              style={{ display: compare ? 'none' : 'block' }}
            >
              <Toggler />
              <h6 className='mt-2'>Please select a start date</h6>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date('2021-08-10')}
                maxDate={new Date('2021-08-22')}
                showYearDropdown
                dateFormatCalendar='MMMM'
                yearDropdownItemNumber={15}
                scrollableYearDropdown
              />
              <h6 className='mt-2'>Please select type of counter</h6>
              <CounterToggle parentCounter={parentCounter} setParentCounter={setParentCounter} />
            </div>
            <div
              className='compare'
              style={{ display: compare ? 'block' : 'none' }}
            >
              <h4>Compare</h4>
            </div>
          </div>

          <div className='modal-footer' onClick={tempFunction}>
            <button className='u-pull-right bg-info text-white'>
              Confirm Choice
            </button>
          </div>
        </div>
      </div>

      <a href='#basic-modal'>Open Modal</a>
    </div>
  );
};

export default Modal;
