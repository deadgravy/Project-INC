import React, { useEffect, useState } from "react";
import "../styles/tpd.css";
import ProductChart from "../components/tpd/ProductChart";
import TableComponent from "../components/tpd/TableComponent";
import { Tab } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const TodayProduction = () => {
  const [completedProductsData, setCompletedProductsData] = useState(null);
  const [toBeCompletedProductsData, setToBeCompletedProductsData] = useState(null);
  const [singleEquipmentStatusData, setSingleEquipmentStatusData] = useState(null);
  const [multiEquipmentStatusData, setMultiEquipmentStatusData] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [date, setDate] = useState(new Date());

  // useEffect
  useEffect(() => {

    setIsloading(true);

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    let filtereddate = `${yyyy}-${mm}-${dd}`;

    Promise.all([
      fetch(`http://localhost:4000/api/getCompletedProducts/${filtereddate}`).then((res) => res.json()),
      fetch(`http://localhost:4000/api/getProductsToComplete/${filtereddate}`).then((res) => res.json()),
      fetch(`http://localhost:4000/api/getSingleEquipmentStatus/${filtereddate}`).then((res) => res.json()),
      fetch(`http://localhost:4000/api/getMultiEquipmentStatus/${filtereddate}`).then((res) => res.json()),
    ])
      .then(([result1, result2, result3, result4]) => {
        console.log(result1.data);
        console.log(result2.data);
        console.log(result3.data);
        console.log(result4.data);
        setCompletedProductsData({
          data: result1.data,
          value: [{ value: 50 }, { value: 50 }],
        });
        setToBeCompletedProductsData({
          data: result2.data
        });
        setSingleEquipmentStatusData({
          data: result3.data
        });
        setMultiEquipmentStatusData({
          data: result4.data
        });
        setIsloading(false);
      })
      .catch((error) => console.log("error", error));

   
  }, [date]);

  return (
    <React.StrictMode>
    <div className='equipmentuUtilisationDashboard row p-0 w-100p'>
    <div className='po-sidebar sidebar col-2'>
          <Sidebar />
    </div>
    <div className="App">
      {!isLoading ? (
        
        <div>
          <div className="tpdHeader">
            <h1>Today's Production Dashboard</h1>
          </div>
          
          <div className="liveEquipHeader">
            <h3>Live Equipment Usage</h3>
          </div>
          <br/>
          <div className="liveEquipSection">
                <div className='col-3'>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholderText="Please Select Date"
                    dateFormat="yyyy/MM/dd"
                    maxDate={new Date('2021-08-22')}
                    isClearable={false}
                    showYearDropdown
                    />
                </div>
            <div className="Row1">
                <TableComponent data1={singleEquipmentStatusData} data2={multiEquipmentStatusData}/>
            </div>
          </div>
          <br/>
          <div className="productHeader">
            <h3>Completed Products as of Today</h3>
          </div>
          <br/>
          <div className="chartSection">
            <div className="Row2">
              <div className="chartContainer">
                  <ProductChart data1={completedProductsData} data2={toBeCompletedProductsData} />
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