import { React, useState } from 'react';
import Toggler from '../general/Toggler';
import DatePicker from 'react-datepicker';
import CounterToggle from './CounterToggle';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const Modal = ({ handleUserUpdate, parentCounter, setParentCounter }) => {
  const [compare, setCompare] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [buttonState, setButtonState] = useState('toggle-button1');
  const [firstStartDate, setFirstStartDate] = useState(new Date());
  const [secondStartDate, setSecondStartDate] = useState(new Date());

  let endDate = '';

  function tempFunction() {
    if (!compare) {
      if (buttonState === 'toggle-button1') {
        handleUserUpdate(startDate, startDate, parentCounter, false);
      } else if (buttonState === 'toggle-button2') {
        endDate = moment(moment(startDate, 'YYYY-MM-DD').add(6, 'days')).format(
          'YYYY-MM-DD'
        );
        handleUserUpdate(startDate, endDate, parentCounter, false);
      } else if (buttonState === 'toggle-button3') {
        let selectedStartMonth = moment(startDate, 'YYYY-MM-DD')
          .startOf('month')
          .format('YYYY-MM-DD');
        endDate = moment(startDate, 'YYYY-MM-DD')
          .endOf('month')
          .format('YYYY-MM-DD');
        handleUserUpdate(selectedStartMonth, endDate, parentCounter, false);
      }
    } else {
      if (buttonState === 'toggle-button1') {
        handleUserUpdate(firstStartDate, firstStartDate, parentCounter, false);
        setTimeout(
          () =>
            handleUserUpdate(
              secondStartDate,
              secondStartDate,
              parentCounter,
              true
            ),
          1000
        );
      } else if (buttonState === 'toggle-button2') {
        let firstEndDate = moment(
          moment(firstStartDate, 'YYYY-MM-DD').add(6, 'days')
        ).format('YYYY-MM-DD');
        handleUserUpdate(firstStartDate, firstEndDate, parentCounter, false);

        let secondEndDate = moment(
          moment(secondStartDate, 'YYYY-MM-DD').add(6, 'days')
        ).format('YYYY-MM-DD');
        handleUserUpdate(secondStartDate, secondEndDate, parentCounter, true);
      } else if (buttonState === 'toggle-button3') {
        let firstSelectedStartMonth = moment(firstStartDate, 'YYYY-MM-DD')
          .startOf('month')
          .format('YYYY-MM-DD');
        endDate = moment(firstStartDate, 'YYYY-MM-DD')
          .endOf('month')
          .format('YYYY-MM-DD');
        handleUserUpdate(
          firstSelectedStartMonth,
          endDate,
          parentCounter,
          false
        );

        let secondSelectedStartMonth = moment(secondStartDate, 'YYYY-MM-DD')
          .startOf('month')
          .format('YYYY-MM-DD');
        endDate = moment(secondStartDate, 'YYYY-MM-DD')
          .endOf('month')
          .format('YYYY-MM-DD');
        handleUserUpdate(
          secondSelectedStartMonth,
          endDate,
          parentCounter,
          true
        );
      }
    }
  }

  return (
    <div>
      <div className='modal modal-large' id='basic-modal'>
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
              <Toggler
                buttonState={buttonState}
                setButtonState={setButtonState}
              />
              <h6 className='mt-2'>Please select type of counter</h6>
              <CounterToggle
                parentCounter={parentCounter}
                setParentCounter={setParentCounter}
              />
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
            </div>
            <div
              className='compare'
              style={{ display: compare ? 'block' : 'none' }}
            >
              <Toggler
                buttonState={buttonState}
                setButtonState={setButtonState}
              />
              <h6 className='mt-2'>Please select type of counter</h6>
              <CounterToggle
                parentCounter={parentCounter}
                setParentCounter={setParentCounter}
              />
              <h6 className='mt-2'>
                Please select a start date for first graph
              </h6>
              <DatePicker
                selected={firstStartDate}
                onChange={(date) => setFirstStartDate(date)}
                minDate={new Date('2021-08-10')}
                maxDate={new Date('2021-08-22')}
                showYearDropdown
                dateFormatCalendar='MMMM'
                yearDropdownItemNumber={15}
                scrollableYearDropdown
              />
              <h6 className='mt-2'>
                Please select a start date for second graph
              </h6>
              <DatePicker
                selected={secondStartDate}
                onChange={(date) => setSecondStartDate(date)}
                minDate={new Date('2021-08-10')}
                maxDate={new Date('2021-08-22')}
                showYearDropdown
                dateFormatCalendar='MMMM'
                yearDropdownItemNumber={15}
                scrollableYearDropdown
              />
            </div>
          </div>

          <div className='modal-footer' onClick={tempFunction}>
            <a href='#components'>
              <button className='u-pull-right bg-info text-white'>
                Confirm Choice
              </button>
            </a>
          </div>
        </div>
      </div>

      <a href='#basic-modal' id='modal'>Open Modal</a>
    </div>
  );
};

export default Modal;
