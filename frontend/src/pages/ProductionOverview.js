import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import ChartComponent from '../components/pod/ChartComponent';
import BoxComponent from '../components/pod/BoxComponent';
import LineChart from '../components/pod/LineChart.js';
import { Route, Link, Routes, useParams } from 'react-router-dom';

const ProductionOverview = () => {
  const [prodOverviewData, setProdOverviewData] = useState('');
  const [isLoading, setIsloading] = useState(true);
  const params = useParams();

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

      if (hours == undefined || hours == null) {
        hours = 0;
      }

      if (days == undefined || days == null) {
        days = 0;
      }

      if (mins == undefined || mins == null) {
        mins = 0;
      }

      if (seconds == undefined || seconds == null) {
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

  // useEffect
  useEffect(() => {
    setIsloading(true);
    fetch(`http://localhost:4000/api/data/data2/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        // Below should be just setProdOverviewData(data), where data is your full backend data.
        // console.log(data);
        setProdOverviewData({
          data: data.data,
          value: getData(data),
        });
        setIsloading(false);
      });
  }, []);

  return (
    <div className='App'>
      {!isLoading ? (
        <div>
          <div className='Row1'>
            <ChartComponent data={prodOverviewData} />
            <BoxComponent data={prodOverviewData} />
          </div>
          <div className='Row3'>
            <LineChart />
          </div>
        </div>
      ) : (
        <div> Loading... </div> // TODO: Loading loading spinner or loading component
      )}
    </div>
  );
};

export default ProductionOverview;
