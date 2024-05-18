import React, { useContext } from 'react';
import AuthContext from '../contexts/auth.context';
import { Navigate } from 'react-router-dom';

function PrivateRoute() {
  const { user } =useContext(AuthContext);
  if (!user) {
    return <Navigate to="login" />
  }
  return (
    <div></div>
  )
}

export default PrivateRoute;