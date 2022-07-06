import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ProductionOverview from './pages/ProductionOverview';
import TodaysProduction from './pages/TodayProduction';
import SignUp from './pages/SignUp';
import Sidebar from './components/sidebar/Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
const sidebar = ReactDOM.createRoot(document.getElementById('sidebar'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='productionOverview/:id' element={<ProductionOverview />} />
        <Route path= 'todaysProduction' element={<TodaysProduction />} />
        <Route path='signUp' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

sidebar.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>
);
