import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Navbar from './pages/navbar/navbar';
import Products from './pages/products/products';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>

  )
}

export default App;
