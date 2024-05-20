import React, { useContext } from 'react';
import AuthContext from '../contexts/auth.context';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  
  if (user === undefined) {
    return null;
  } else if (user === null) {
    return <Navigate to="/login" />
  } else {
    return <>{children}</>
  }
}

export default PrivateRoute;