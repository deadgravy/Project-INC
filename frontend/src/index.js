import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductionOverview from './pages/ProductionOverview';
import TodayProduction from './pages/TodayProduction';
import SingleProductFlow from './pages/SingleProductFlow';
import SignUp from './pages/SignUp';
import EquipUtilDashboard from './pages/EquipUtilDashboard';
import EUDWeekly from './pages/EUDWeekly';
import EUS from './pages/EUS';
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './components/login/RequireAuth';
import Login from './pages/Login';
import ResetPW from './pages/ResetPassword'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='signUp' element={<SignUp />} />
          <Route path='resetPassword' element={<ResetPW />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
