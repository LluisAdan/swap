import React, { createContext, useState, useEffect } from "react";
import { getProfile, login, logout } from '../services/api.service';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(null);
  const navigate = useNavigate();

  async function fetchProfile() {
    const response = await getProfile();
    setUser(response.data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) fetchProfile();
    else setUser(null)
  }, []);

  async function doLogin(data) {
    await login(data);
    fetchProfile();
  }

  function doLogout() {
    setUser(null);
    logout();
    navigate('/');
  }

  const value = {
    user,
    updateUser,
    doLogin,
    doLogout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext;