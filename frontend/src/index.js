import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ProductionOverview from './pages/ProductionOverview';
import TodayProduction from './pages/TodayProduction';
import SingleProductFlow from './pages/SingleProductFlow';
import SignUp from './pages/SignUp';
import EUS from './pages/EUS';
import moment from 'moment';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='productionOverview/:id' element={<ProductionOverview />} />
        <Route path='todaysProduction' element={<TodayProduction />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path='equipmentUtilisationSnapshot' element={<EUS />} />
        <Route path='singleProductFlow' element={<SingleProductFlow />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
