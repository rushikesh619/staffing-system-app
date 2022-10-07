import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VendorDetails from './pages/vendorDetailsPage/VendorDetailsPage';
import DrawerAppBar from './component/navBar/navBar';
import Dashboard from './pages/dashboard/dashboard';
import './App.css';

function App() {
  return (
    <div>
      <DrawerAppBar />
      <BrowserRouter>
        <Routes>
          <Route path="/VendorDetailsPage" element={<VendorDetails />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
