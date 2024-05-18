import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../contexts/auth.context';

import './nax-user.css';

function NavUser() {
  const { user } = useContext(AuthContext);

  return (
    <>
    {!user && (
      <h1>Loading...</h1>
    )}

    {user && (
      <div className="nav-user d-flex align-items-center">
        <Link style={{ textDecoration: 'none', color: 'black'}} to={`/users/${user.id}`}>
          <div className="container info-user d-flex justify-content-center">
            <div>
              <img className="rounded-circle object-fit-cover" src={user.avatar} alt="Avatar" width="150" height="150"/>
            </div>

            <div className="name-user d-flex flex-column justify-content-center">
              <h2>{user.name} {user.lastName}</h2>
              <h4>{user.username}</h4>
              <div className="info-rating d-flex flex-columns align-items-center">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                4.3 (15)
              </div>
            </div>
          </div>
        </Link>
      </div>
    )}
    </>
  )
}

export default NavUser;