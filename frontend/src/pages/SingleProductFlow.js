import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import './spfd.css';
import 'react-datepicker/dist/react-datepicker.css'

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
        <h3 id="font-style">Single Product Flow Dashboard</h3>
        <script></script>
        <div id="light" style={{ display: 'flex', float: 'left' }}>
          <DatePicker id="startDate-css"
            placeholderText='Start Date'
            dateFormat='dd/MM/yyyy'
            selected={startDate}
            onChange={handleStartDate}
          />
          <span style={{ float: 'left' }}>   <b>-</b>    </span>
          <DatePicker id="endDate-css"
            placeholderText='End Date'
            dateFormat='dd/MM/yyyy'
            selected={endDate}
            minDate={startDate}
            maxDate={startDate + 5}
            onChange={handleEndDate}
          />
          <p style={{ fontSize: 15, color: 'grey', width: 200 }}>Up to 5 days</p>
        </div>
        <div className='dropdown'>

        </div>
      </div>
    </div >

  );

  // const [selectedDate, setSelectedDate] = useState(null)
  // return (
  //   <div className="App">
  //     <DatePicker selected={selectedDate}
  //       onChange={date => setSelectedDate(date)}
  //       dateFormat='dd/MM/yyyy'
  //       isClearable
  //       showYearDropdown
  //       scrollableMonthYearDropdown
  //     />
  //   </div>
  // );

}

export default App;
