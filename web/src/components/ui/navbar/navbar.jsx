import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../../contexts/auth.context';
import logo from '../../../assets/logo/logo.png';

import './navbar.css';

const renderNavLinkActive = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function Navbar() {
  const context = useContext(AuthContext);

  const pending = context.user?.target_user.filter(request => request.status === 'pending');

  return (
    <div className="navbar d-flex columns justify-content-around">
      <div className="logo d-flex align-items-center">
        <Link to="/home" className="div-logo d-flex justify-content-center align-items-center">
          <img className="img-logo" src={logo} alt="logo" />
        </Link>
      </div>

    
      <div className="search-bar d-flex align-items-center">
          <input className="input-search-bar form-control bg-search rounded-pill" placeholder="Search product" id="searchInput" type="text" />
      </div>

      <div className="nav-items d-flex justify-content-center">
        <ul className="nav-ul d-flex justify-content-around align-items-center">
          {!context.user && (
            <>
            <div className="nav-links d-flex justify-content-center align-items-center">
              <li className="nav-item"><NavLink className={renderNavLinkActive} to="/login">Log in</NavLink></li>
            </div>

            <div className="nav-links d-flex justify-content-center align-items-center">
              <li className="nav-item"><NavLink className={renderNavLinkActive} to="/register">Register</NavLink></li>
            </div> 

            <div className="nav-links d-flex justify-content-center align-items-center">
              <li className="nav-item add-product"><NavLink className={renderNavLinkActive} to="/login">Add product</NavLink></li> 
            </div>
            </>
          )}

          {context.user && (
            <>
              <div className="nav-links d-flex justify-content-center align-items-center">
                <li className="nav-mailbox d-flex justify-content-center align-items-center">
                  <NavLink className={renderNavLinkActive} to="/profile/mailbox">
                    <i className={`icon-mailbox fa fa-envelope-o ${pending?.length > 0 ? 'text-danger' : ''}`}></i>
                  </NavLink>
                </li>
              </div>

              <div className="nav-links d-flex justify-content-center align-items-center">
                <div className="d-flex align-items-center " type="button">
                  <Link to="/profile" className="nav-item-img">
                    <img className="rounded-circle object-fit-cover" src={context.user.avatar} alt="Avatar" width="55" height="55"/>
                  </Link>
                </div>
              </div>
                            
              <div className="nav-links d-flex justify-content-center align-items-center">
                <li className="nav-item add-product"><NavLink className={renderNavLinkActive} to="/create-product">Add product</NavLink></li> 
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar;