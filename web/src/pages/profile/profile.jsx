import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth.context';
import { Link } from 'react-router-dom';
import ProductsList from '../../components/products/products-list/products-list';

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
              4.3 (15)
            </div>
          </div>
          <div>
            <div>
              <Link to="/create-product">
                <button className="btn btn-secondary btn-profile">Add product</button>
              </Link>
            </div>
            <div>
              <Link to={`/users/${context.user.id}`}>
                <button className="btn btn-secondary btn-profile">Edit profile</button>
              </Link>
            </div>
          </div>
        </div>
        <hr />

        <ProductsList limit={4} page={0} />
      </>
    )}
    </>
  )
}

export default Profile;