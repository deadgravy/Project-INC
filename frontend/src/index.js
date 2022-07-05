import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ProductionOverview from './pages/ProductionOverview';
import TodayProduction from './pages/TodayProduction';
import SignUp from './pages/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='productionOverview/:id' element={<ProductionOverview />} />
        <Route path='todaysProduction' element={<TodayProduction />} />
        <Route path='signUp' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
=======
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<App />} />
      <Route path="productionOverview" element={<ProductionOverview />} />
    </Routes>
  </BrowserRouter>
>>>>>>> 7ae010e4 (changed path to login in index.js line 11)
);
