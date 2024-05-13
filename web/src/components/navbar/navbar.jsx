import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth.context';

import './navbar.css';

function Navbar() {
  const context = useContext(AuthContext);  

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/home">
            <h1>Swap</h1>
          </Link>
        </div>

        <div className="btns-user">
          {!context.user && (
            <>
              <Link to="/login">
                <button type="button" className="btn-login btn btn-sm mx-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="btn-register btn btn-sm mx-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                  Register
                </button>
              </Link>
            </>
          )}
          {context.user && (
            <div className="d-flex">
              <div className="mx-3">
                <button type="button" className="btn-add-product btn btn-sm mx-1 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                  Add my product
                </button>
              </div>
              <div className="dropdown d-flex align-items-center gap-2 rounded-pill user-navbar" type="button">
                <span data-bs-toggle="dropdown">{context.user.username}</span>
                <img className="rounded-circle object-fit-cover" data-bs-toggle="dropdown" src={context.user.avatar} alt="Avatar" width="55" height="55"/>
            
                <ul className="dropdown-menu dropdown-menu">
                  <li>
                    <Link to="/profile">
                      <button className="btn-profile dropdown-item">See profile</button>
                    </Link>
                  </li>
                  <li>
                    <button onClick={context.doLogout} className="dropdown-item">Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar;