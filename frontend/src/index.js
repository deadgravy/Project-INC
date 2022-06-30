import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ProductionOverview from './pages/ProductionOverview';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='productionOverview' element={<ProductionOverview />} />
    </Routes>
  </BrowserRouter>
);
//hello world
<<<<<<< Updated upstream
=======
//Javier
>>>>>>> Stashed changes
