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

const ProductionOverview = () => {
  const [prodOverviewData, setProdOverviewData] = useState('');
  const [allProductData, setAllProductData] = useState('');
  const [prodCount, setProdCount] = useState('');
  const [isLoading, setIsloading] = useState(true);
  const params = useParams();
  // This is for the select (Do it yourself) - George
  const graph = 'Line Chart';
  function handleChange() {}

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
      let mins = avg?.minutes;
      let seconds = avg?.seconds;
      let hours = avg?.hours;
      let days = avg?.days;

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

      console.log('Days: ' + days);
      console.log('Hours: ' + hours);
      console.log('Mins: ' + mins);
      console.log('Seconds: ' + seconds);

      const milliseconds = convertToMilli(days, hours, seconds, mins);

      dataArr.push({ value: milliseconds });
    }

    return dataArr;
  }

  useEffect(() => {
    setIsloading(true);
    Promise.all([
      fetch(`http://localhost:4000/api/data/data2/${params.id}`).then((res) =>
        res.json()
      ),
      fetch('http://localhost:4000/api/getAllRecipe').then((res) => res.json()),
      fetch('http://localhost:4000/api/prodCount').then((res) => res.json()),
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
  }, []);
  const [modal, setModal] = useState(false);
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
            <div className='col-3'>
              <input type='search' placeholder='Search' />
            </div>
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
                  <Toggler />
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
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='row'>
                {console.log(prodCount.data.length + 'jessie')}
                <BarChart data={prodCount} />
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
