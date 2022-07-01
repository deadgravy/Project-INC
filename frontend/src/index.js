import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ProductionOverview from './pages/ProductionOverview';
import SignUp from './pages/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='productionOverview' element={<ProductionOverview />} />
        <Route path='signUp' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
//hello world
