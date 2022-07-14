import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import ProductChart from '../components/tpd/ProductChart';
import TableComponent from '../components/tpd/TableComponent';
import TextField from '@mui/material/TextField';
import HorizontalScroller from 'react-horizontal-scroll-container';
import { Tab } from '@mui/material';
// import "../styles/todayProduction.css"
// testing
const TodayProduction = () => {
  const [completedProductsData, setCompletedProductsData] = useState(null);
  const [toBeCompletedProductsData, setToBeCompletedProductsData] = useState(null);
  const [equipmentStatusData, setEquipmentStatusData] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  // useEffect
  useEffect(() => {
    setIsloading(true);

    Promise.all([
      fetch("http://localhost:4000/api/getCompletedProducts").then((res) => res.json()),
      fetch("http://localhost:4000/api/getProductsToComplete").then((res) => res.json()),
      fetch("http://localhost:4000/api/getEquipmentStatus").then((res) => res.json()),
    ])
      .then(([result1, result2, result3]) => {
        setCompletedProductsData({
          data: result1.data,
          value: [{ value: 50 }, { value: 50 }],
        });
        setToBeCompletedProductsData({
          data: result2.data,
        });
        setEquipmentStatusData({
          data: result3.data
        });
        setEquipmentStatusData({
          data: result3.data
        });
        setIsloading(false);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <div className='App'>
      {!isLoading ? (
        <div>
          <div className='tpdHeader'>Today's Production Dashboard</div>
          <div className='liveEquipHeader'>Live Equipment Usage</div>
          <div className='textField'>
            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              label='Search'
            />
          </div>
          <div className='Row1'>
            <TableComponent />
          </div>
          <div className='productHeader'>Completed Products as of Today</div>
          <div className='textField'>
            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              label='Search'
            />
          </div>
          <div className='Row2'>
            <div className='chartContainer'>
              <div class='p-3 bg-white-500 u-shadow-lg u-round-xs'>
                <ProductChart
                  data1={completedProductsData}
                  data2={toBeCompletedProductsData}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div> Loading... </div> // TODO: Loading loading spinner or loading component
      )}
    </div>
  );
};

export default TodayProduction;
