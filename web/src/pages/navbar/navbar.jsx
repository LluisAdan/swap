import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <div>
          <Link to="/home">
            <h1>Swap</h1>
          </Link>
        </div>

        <div className="btns">
          <Link to="/products">
            <button type="button" className="btn-products btn btn-link mx-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
              Products
            </button>
          </Link>
        </div>

        <div className="btns-user">
          <Link to="/login">
            <button type="button" className="btn-login btn btn-link mx-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button type="button" className="btn-register btn btn-link mx-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;