import React, { createContext, useState, useContext } from 'react';
import './alert-context.css';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [error, setError]= useState(null);

  const showAlert = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {error && (
        <div className="d-flex justify-content-center">
          <div className="alert alert-danger alert-errors" role="alert">
            {error}
          </div>
        </div>

      )}
      {children}
    </AlertContext.Provider>
  );
};