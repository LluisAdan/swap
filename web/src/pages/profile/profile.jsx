import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth.context';
import { Link } from 'react-router-dom';

import './profile.css';


function Profile() {
  const context = useContext(AuthContext);

  return (
    <>
    {!context.user && (
      <h1>Loading...</h1>
    )}

    {context.user && (
      <>
        <div className="container info-user d-flex">
          <div>
            <img className="rounded-circle object-fit-cover" data-bs-toggle="dropdown" src={context.user?.avatar} alt="Avatar" width="150" height="150"/>
          </div>
          <div className="name-user d-flex flex-column justify-content-center">
            <h2>{context.user.name} {context.user.lastName}</h2>
            <h4>{context.user.username}</h4>
            <div className="info-rating d-flex flex-columns">
              <i className="fa fa-star-o"></i>
              <i className="fa fa-star-o"></i>
              <i className="fa fa-star-o"></i>
              <i className="fa fa-star-o"></i>
              <i className="fa fa-star-o"></i>
              AVERAGE RATING
            </div>
          </div>
          <Link to="/edit-profile">
            <button className="btn btn-secondary edit-profile">Edit profile</button>
          </Link>
        </div>
        <hr />
      </>
    )}
    </>
  )
}

export default Profile;