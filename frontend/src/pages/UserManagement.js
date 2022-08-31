import React, { useState, useEffect } from 'react';
import SideBar from '../components/sidebar/Sidebar';

import { UserTable } from '../components/user/UserTable';

const EquipUtilDashboard = () => {
  const [users, setUsers] = useState(null);

  const [isLoading, setIsloading] = useState(true);

  // useEffect
  useEffect(() => {
    setIsloading(true);

    Promise.all([
      fetch(`http://localhost:4000/api/getAllUsers`).then((res) => res.json()),
    ]).then(([result]) => {
      setUsers({
        data: result.data,
      });

      setIsloading(false);
    });
  }, []);

  return (
    <React.StrictMode>
      <div className='userManagement row p-0 w-100p'>
        <div className='po-sidebar sidebar col-2'>
          <SideBar />
        </div>
        <div className='po-display col-10'>
          <div className='App'>
            {!isLoading ? (
              <div>
                <div className='pt-2 Row1'>
                  <h2>Users</h2>
                </div>
                <div className='Row2'>
                  <UserTable data={users} />
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
