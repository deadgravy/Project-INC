import { UsageChart } from '../components/eud/UsageChart';
import React, { useState, useEffect } from 'react';
import SideBar from '../components/sidebar/Sidebar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EquipUtilDashboard = () => {
  const [singleUsage, setSingleUsage] = useState(null);
  const [multipleUsage, setMultipleUsage] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());

  // useEffect
  useEffect(() => {
    setIsloading(true);

    var dd = String(startDate.getDate()).padStart(2, '0');
    var mm = String(startDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = startDate.getFullYear();

    let date = yyyy + '-' + mm + '-' + dd;
    console.log(date);

    Promise.all([
      fetch(`http://localhost:4000/api/getSingleUsage/${date}`).then((res) =>
        res.json()
      ),
      fetch(`http://localhost:4000/api/getMultipleUsage/${date}`).then((res) =>
        res.json()
      ),
    ]).then(([result1, result2]) => {
      setSingleUsage({
        data: result1.data,
      });
      setMultipleUsage({
        data: result2.data,
      });

      setIsloading(false);
    });
  }, [startDate]);

  function handleDateSelect(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;
    console.log(date);
  }

  return (
    <React.StrictMode>
      <div className='equipmentuUtilisationDashboard row p-0 w-100p'>
        <div className='po-sidebar sidebar col-2'>
          <SideBar />
        </div>
        <div className='po-display col-10'>
          <div className='App'>
            {!isLoading ? (
              <div>
                <div className='pt-2 Row1'>
                  <h2>Equipment Utilisation Dashboard</h2>
                </div>
                <div className='Row2'>
                  <div className='col-3'>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      onSelect={handleDateSelect}
                    />
                  </div>
                </div>
                <div className='Row3'>
                  <h3>Single Recipe Equipment</h3>
                </div>
                <div className='Row4'>
                  <UsageChart data={singleUsage} />
                </div>
                <div className='Row5'>
                  <h3>Multiple Recipe Equipment</h3>
                </div>
                <div className='Row6'>
                  <UsageChart data={multipleUsage} />
                </div>
              </div>
            ) : (
              <div> Loading... </div> // TODO: Loading loading spinner or loading component
            )}
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default EquipUtilDashboard;
