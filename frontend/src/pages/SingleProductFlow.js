import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'
import '../styles/spfd.css';
import 'react-datepicker/dist/react-datepicker.css'

// still in progress
function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDate = (date) => {
    setStartDate(date);
    setEndDate(null);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };


  return (
    <div className="App" id="container">
      <div className="input-container">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
        <h3 id="font-style">SSingle Product Flow Dashboard</h3>
        <div id="light" style={{ display: 'flex', float: 'left' }}>
          <DatePicker id="startDate-css"
            placeholderText='Start Date'
            dateFormat='dd/MM/yyyy'
            selected={startDate}
            onChange={handleStartDate}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
          />
          <span>   <b> - </b>    </span>
          <DatePicker id="endDate-css"
            placeholderText='End Date'
            dateFormat='dd/MM/yyyy'
            selected={endDate}
            minDate={startDate}
            isClearable
            onChange={handleEndDate}
          />
          <p style={{ fontSize: 15, color: 'grey', width: 200 }}>Up to 5 days</p>
        </div>
        <div className='dropdown'>

        </div>
      </div >
    </div >

  );
}


export default App;
