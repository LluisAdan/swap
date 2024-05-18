import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import CreateUser from './pages/create-user';
import UpdateUser from './pages/update-user';
import Login from './components/users/login-user-form/login-user-form';
import Navbar from './components/ui/navbar/navbar';
import { AlertProvider } from './contexts/alert-context/alert.context';
import Profile from './pages/profile';
import CreateProduct from './pages/create-product';
import Products from './pages/products';
import ProductDetail from './pages/product';
import PrivateRoute from './guards/private-route';
import CreateRequest from './pages/create-request';
import Footer from './components/ui/footer/footer';

import './app.css';

function App() {
  return (
    <>
      <main className="swap">
        <Navbar />
        <div className="container content">
          <AlertProvider>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/register" element={<CreateUser />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users/:id" element={<PrivateRoute><UpdateUser /></PrivateRoute>} />
              <Route path="products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/create-product" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
              <Route path="/products/:id/create-request" element={<PrivateRoute><CreateRequest /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </AlertProvider>
        </div>
      </main>
      {/*<Footer />*/}
    </>
  )
}

export default App;