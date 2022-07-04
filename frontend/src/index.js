import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ProductionOverview from './pages/ProductionOverview';
import Sidebar from './components/sidebar/Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
const sidebar = ReactDOM.createRoot(document.getElementById('sidebar'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='productionOverview' element={<ProductionOverview />} />
    </Routes>
  </BrowserRouter>
);

sidebar.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>
)