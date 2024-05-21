import React, { useContext } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../../../contexts/auth.context';
import logo from '../../../assets/logo/IMG_final.png';
import AutocompleteInput from '../../google/autocomplete/autocomplete-input';

import './navbar.css';

const renderNavLinkActive = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const pending = user?.target_user.filter(request => request.status.toLowerCase() === 'pending');

  const handlePlaceChange = ({ lat, lng, address }) => {
    navigate({
      pathname: '/products',
      search: `?lat=${lat}&lng=${lng}&address=${address}`
    });
  };

  return (
    <div className="navbar d-flex columns justify-content-around">
      <div className="logo d-flex align-items-center">
        <Link to="/home" className="div-logo d-flex justify-content-center align-items-center">
          <img className="img-logo" src={logo} alt="logo" />
        </Link>
      </div>

    
      <div className="search-bar d-flex align-items-center">
          <AutocompleteInput className="input-search-bar form-control bg-search rounded-pill" onPlaceChange={handlePlaceChange} />
      </div>

      <div className="nav-items d-flex justify-content-center">
        <ul className="nav-ul d-flex justify-content-around align-items-center">
          {!user && (
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

          {user && (
            <>
              <div className="nav-links d-flex justify-content-center align-items-center">
                <li className="nav-mailbox d-flex justify-content-center align-items-center">
                  <NavLink className={renderNavLinkActive} to="/profile/mailbox">
                    <i className="icon-mailbox fa fa-envelope-o"></i>
                    {(pending.length > 0) && (
                      <span className="red-point"></span>
                    )}
                  </NavLink>
                </li>
              </div>

              <div className="nav-links d-flex justify-content-center align-items-center">
                <div className="d-flex align-items-center " type="button">
                  <Link to="/profile" className="nav-item-img">
                    <img className="rounded-circle object-fit-cover" src={user.avatar} alt="Avatar" width="55" height="55"/>
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