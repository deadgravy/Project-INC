import { UsageChart } from '../components/eud/UsageChart';
import React, { useState, useEffect } from 'react';
import SideBar from '../components/sidebar/Sidebar';

const EquipUtilDashboard = () => {
  const [singleUsage, setSingleUsage] = useState('');
  const [multipleUsage, setMultipleUsage] = useState('');
  const [isLoading, setIsloading] = useState(true);

  // useEffect
  useEffect(() => {
    setIsloading(true);

    Promise.all([
      fetch('http://localhost:4000/api/getSingleUsage').then((res) =>
        res.json()
      ),
      fetch('http://localhost:4000/api/getMultipleUsage').then((res) =>
        res.json()
      ),
    ]).then(([result1, result2]) => {
      setSingleUsage({
        data: result1.data,
        value: [{ value: 50 }, { value: 50 }],
      });
      setMultipleUsage({
        data: result2.data,
      });

      setIsloading(false);
    });
  }, []);

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
                  <h1>Equipment Utilisation Dashboard</h1>
                </div>
                <div className='Row2'>
                  <h3>Single Recipe Equipment</h3>
                </div>
                <div className='Row3'>
                  <UsageChart data={singleUsage} />
                </div>
                <div className='Row4'>
                  <h3>Multiple Recipe Equipment</h3>
                </div>
                <div className='Row5'>
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
