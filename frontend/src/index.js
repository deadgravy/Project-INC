import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ProductionOverview from "./pages/ProductionOverview";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/sidebar/Sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
const sidebar = ReactDOM.createRoot(document.getElementById("sidebar"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path='/' element={<App />} />
        <Route path='productionOverview/:id' element={<ProductionOverview />} />
        <Route path='signUp' element={<SignUp />} />
=======
        <Route path="/" element={<App />} />
        {/* <Route path="productionOverview" element={<ProductionOverview />} /> */}
        <Route path="productionOverview/:id" element={<ProductionOverview />} />
>>>>>>> 47f99c101f6ce95cbf82c612f80163d8305f1ded
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

sidebar.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>
);
