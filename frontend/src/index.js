import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductionOverview from './pages/ProductionOverview';
import TodayProduction from './pages/TodayProduction';
import SingleProductFlow from './pages/SingleProductFlow';
import AddUser from './pages/AddUser';
import EquipUtilDashboard from './pages/EquipUtilDashboard';
import EUDWeekly from './pages/EUDWeekly';
import EUS from './pages/EUS';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './components/login/RequireAuth';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import Unauthorized from './pages/Unauthorized';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />

          {/* Protected routes */}
          <Route element={<RequireAuth allowedRoles={['admin', 'user']} />}>
            <Route
              path='productionOverview/:id'
              element={<ProductionOverview />}
            />
            <Route path='todaysProduction' element={<TodayProduction />} />

            <Route
              path='equipmentUtilisationDashboard'
              element={<EquipUtilDashboard />}
            />
            <Route path='equipmentUtilisationSnapshot' element={<EUS />} />
            <Route path='profile' element={<Profile />} />
            <Route path='singleProductFlow' element={<SingleProductFlow />} />
            <Route
              exact
              path='equipmentUtilisationDashboard'
              element={<EquipUtilDashboard />}
            />
            <Route
              path='equipmentUtilisationDashboard/weekly'
              element={<EUDWeekly />}
            />

            <Route path='unauthorized' element={<Unauthorized />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path='users' element={<UserManagement />} />
            <Route path='addUser' element={<AddUser />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
