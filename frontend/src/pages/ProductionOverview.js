import React, { useEffect, useState } from 'react';
import ChartComponent from '../components/pod/ChartComponent';
import BoxComponent from '../components/pod/Boxe';
import LineChart from '../components/pod/LineChart.js';
import { Route, Link, Routes, useParams } from 'react-router-dom';
import Modal from '../components/pod/Modal';
import ErrorPage from '../components/pod/ErrorPage.js';
import SideBar from '../components/sidebar/Sidebar';
import Loading from '../components/pod/loading';
import '../styles/pod.css';
import Toggler from '../components/general/Toggler';
import BarChart from '../components/pod/BarChart'; // import BarChart from '../components/pod/BarChart';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import SearchBar from '../components/pod/SearchBar';
import moment from 'moment';

const ProductionOverview = () => {
  const [prodOverviewData, setProdOverviewData] = useState('');
  const [allProductData, setAllProductData] = useState('');
  const [prodCount, setProdCount] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [graph, setGraph] = useState('LineChart');
  const [selectedProductFlow, setSelectedProductFlow] = useState({
    startDate: '2021-08-10',
    endDate: '2021-08-21',
  });
  const [startDate, setStartDate] = useState(new Date('2021-08-10'));
  const [endDate, setEndDate] = useState(new Date('2021-08-21'));
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();
  // This is for the select (Do it yourself) - George

  function handleChange(e) {
    setGraph(() => e.target.value);
  }

  function convertToMilli(days, hours, seconds, mins) {
    const daysToMilli = days * 24 * 60 * 60 * 1000;
    const hoursToMilli = hours * 60 * 60 * 1000;
    const secondsToMilli = seconds * 1000;
    const minsToMilli = mins * 60 * 1000;

    return daysToMilli + hoursToMilli + secondsToMilli + minsToMilli;
  }

  function getData(data) {
    let dataArr = [];
    // console.log(data.data.length);
    for (let i = 0; i < data.data.length; i++) {
      const avg = data.data[i].avg;
      let mins = avg.minutes;
      let seconds = avg.seconds;
      let hours = avg.hours;
      let days = avg.days;

      if (hours === undefined || hours == null) {
        hours = 0;
      }

      if (days === undefined || days == null) {
        days = 0;
      }

      if (mins === undefined || mins == null) {
        mins = 0;
      }

      if (seconds === undefined || seconds == null) {
        seconds = 0;
      }

      // console.log("Days: " + days);
      // console.log("Hours: " + hours);
      // console.log("Mins: " + mins);
      // console.log("Seconds: " + seconds);

      const milliseconds = convertToMilli(days, hours, seconds, mins);

      dataArr.push({ value: milliseconds });
    }

    return dataArr;
  }

  // console.log(dateRange[0] + "shelby");
  console.log(selectedProductFlow.startDate);

  useEffect(() => {
    setIsloading(true);
    const startDateStr = moment(startDate).format('YYYY-MM-DD');
    const endDateStr = moment(endDate).format('YYYY-MM-DD');

    Promise.all([
      fetch(`http://localhost:4000/api/getRecipesById/${params.id}`).then(
        (res) => res.json()
      ),
      fetch('http://localhost:4000/api/getAllRecipeAndID').then((res) =>
        res.json()
      ),
      fetch(
        `http://localhost:4000/api/prodCount/${startDateStr}/${endDateStr}`
      ).then((res) => res.json()),
    ])
      .then(([result1, result2, result3]) => {
        setProdOverviewData({
          data: result1.data,
          value: getData(result1),
        });
        setAllProductData({
          data: result2.data,
        });
        setProdCount({
          data: result3.data,
        });
        console.log('john', result3.data);
        setIsloading(false);
      })
      .catch((error) => console.log('error', error));
    // fetch(`http://localhost:4000/api/data/data2/${params.id}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // Below should be just setProdOverviewData(data), where data is your full backend data.
    //     // console.log(data);
    //     setProdOverviewData({
    //       data: data.data,
    //       value: getData(data),
    //     });
    //     setIsloading(false);
    //   });
  }, [endDate]);
  const [modal, setModal] = useState(false);
  var x = 30;

  const onDateSelected = (dates) => {
    const [start, end] = dates;
    if (end) {
      setIsOpen(false);
    }
    setStartDate(start);
    setEndDate(end);
  };
  //http://localhost:4000/api/data/data1
  return (
    <div className='productionOverview row p-0'>
      <div className='po-sidebar sidebar col-2'>
        <SideBar />
      </div>
      <div className='po-display col-10 px-4 py-6'>
        <h1>Production Overview Dashboard</h1>
        <div className='row level mb-2'>
          <div className='col-12 search w-100p'>
            <SearchBar data1={allProductData} />
            <div>
              <Modal data1={allProductData} />
            </div>
          </div>
        </div>
        <div className='App'>
          {!isLoading ? (
            <div>
              <div className='row'>
                <ErrorPage>
                  <ChartComponent data={prodOverviewData} />
                  <BoxComponent data={prodOverviewData} />
                </ErrorPage>
              </div>
              <div className='usersChoice col-12 w-100p mt-4'>
                <div>
                  <DatePicker
                    placeholderText='Please Select Date'
                    dateFormat='yyyy-MM-dd'
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    // minDate={new Date(dateRange[0])}
                    // maxDate={addDays(new Date(dateRange[0], 4))}
                    onChange={onDateSelected}
                    isClearable={true}
                    open={isOpen}
                    onInputClick={() => setIsOpen(true)}
                    onClickOutside={() => setIsOpen(false)}
                  />
                </div>
                <FormControl className='col-3'>
                  <InputLabel id='demo-simple-select-label'>
                    Pick a Graph
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={graph}
                    label='Age'
                    onChange={handleChange}
                  >
                    <MenuItem value='LineChart'> Line Chart</MenuItem>
                    <MenuItem value='BarChart'>Bar Chart</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div
                className='row'
                style={{ display: graph === 'LineChart' ? 'block' : 'none' }}
              >
                {prodCount.data?.length > 0 ? (
                  <LineChart data={prodCount} />
                ) : (
                  <h1>No data for this date range</h1>
                )}
              </div>
              <div
                className='row'
                style={{ display: graph === 'BarChart' ? 'block' : 'none' }}
              >
                {prodCount.data?.length > 0 && <BarChart data={prodCount} />}
              </div>
            </div>
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionOverview;
