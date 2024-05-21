import React, { useContext } from 'react';
import AuthContext from '../../../contexts/auth.context';
import Stars from '../../stars/stars-profile/stars-profile';
import { Link, NavLink } from 'react-router-dom';

import './nav-user.css';

const renderNavLinkActive = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

function NavUser() {
  const { user, doLogout } = useContext(AuthContext);

  if (!user || user === undefined) return <h1>Loading...</h1>

  return (
    <div className="nav-user d-flex align-items-center">
      <div className="nav-user-info d-flex justify-content-center align-items-center">
        <Link style={{ textDecoration: 'none', color: 'black'}} to={`/users/${user.id}`}>
          <div className="info-user d-flex justify-content-center align-items-center">
            <div>
              <img className="rounded-circle object-fit-cover" src={user.avatar} alt="Avatar" width="150" height="150"/>
            </div>
            
            <div className="name-user d-flex flex-column justify-content-center">
              <h2>{user.name} {user.lastName}</h2>
              <h4>{user.username}</h4>
              <div className="info-rating d-flex flex-columns align-items-center">
                <Stars />
              </div>
            </div>
          </div>
        </Link>
      </div>

      <ul className="nav-user-options d-flex align-items-end">
        <div className="nav-links d-flex justify-content-center align-items-center">
          <li className="nav-user-item"><NavLink className={renderNavLinkActive} to="/profile/favorites">Favorites</NavLink></li> 
        </div>

        <div className="nav-links d-flex justify-content-center align-items-center">
          <li className="nav-user-item"><NavLink className={renderNavLinkActive} to="/profile">My products</NavLink></li> 
        </div>

        <div className="nav-links d-flex justify-content-center align-items-center">
          <li className="nav-user-item"><NavLink className={renderNavLinkActive} to="/profile/mailbox">Requests</NavLink></li> 
        </div>

        <div className="nav-links d-flex justify-content-center align-items-center">
          <li type="button" onClick={doLogout} className="logout">Logout</li> 
        </div>
      </ul>
    </div>
  )
}

export default NavUser;