import React, { useEffect, useState } from 'react';
import '../styles/tpd.css';
import ProductChart from '../components/tpd/ProductChart';
import TableComponent from '../components/tpd/TableComponent';
<<<<<<< HEAD
// import Modal from '../components/tpd/Modal';
import TextField from '@mui/material/TextField';
import { Tab } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';
// import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
=======
import Modal from '../components/tpd/Modal';
import TextField from '@mui/material/TextField';
import { Tab } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll';
>>>>>>> 08190f34c260c3cc0249c291abc0ad327186ed7c
// import "../styles/todayProduction.css"

const TodayProduction = () => {
  const [completedProductsData, setCompletedProductsData] = useState(null);
  const [toBeCompletedProductsData, setToBeCompletedProductsData] =
    useState(null);
  const [equipmentStatusData, setEquipmentStatusData] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  // useEffect
  useEffect(() => {
    setIsloading(true);

    Promise.all([
      fetch('http://localhost:4000/api/getCompletedProducts').then((res) =>
        res.json()
      ),
      fetch('http://localhost:4000/api/getProductsToComplete').then((res) =>
        res.json()
      ),
      fetch('http://localhost:4000/api/getEquipmentStatus').then((res) =>
        res.json()
      ),
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
          data: result3.data,
        });
        setIsloading(false);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <React.StrictMode>
      <div className='equipmentuUtilisationDashboard row p-0 w-100p'>
        <div className='po-sidebar sidebar col-2'>
          <Sidebar />
        </div>
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
                <TableComponent data={equipmentStatusData} />
              </div>
              <div className='productHeader'>
                Completed Products as of Today
              </div>
              <div className='searchAndButtonRow'>
                <div className='textField'>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    fullWidth
                    label='Search'
                  />
                </div>
                {/* <Modal data={toBeCompletedProductsData}/> */}
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
      </div>
    </React.StrictMode>
  );
};

export default TodayProduction;
