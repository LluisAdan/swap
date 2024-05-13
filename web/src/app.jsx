import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Navbar from './components/navbar/navbar';
import ProductsList from './components/products/products-list/products-list';
import EditProfile from './pages/edit-profile/edit-profile';
import { AlertProvider } from './contexts/alert-context/alert.context';
import NavFilter from './components/nav-filter/nav-filter';
import Profile from './pages/profile/profile';

function App() {
  return (
    <>
      <Navbar />
      <NavFilter />
      <div className="container">
        <AlertProvider>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:id" element={<EditProfile />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </AlertProvider>
      </div>
    </>

  )
}

export default App;
