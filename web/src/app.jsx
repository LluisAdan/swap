import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Navbar from './components/navbar/navbar';
import ProductsList from './components/products/products-list/products-list';
import EditProfile from './pages/edit-profile/edit-profile';
import { AlertProvider } from './contexts/alert-context/alert.context';
import Profile from './pages/profile/profile';
import CreateProduct from './pages/create-product/create-product';
import ProductDetail from './pages/product-detail/product-detail';

import './app.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="container content">
        <AlertProvider>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:id" element={<EditProfile />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </AlertProvider>
      </div>
    </>
  )
}

export default App;