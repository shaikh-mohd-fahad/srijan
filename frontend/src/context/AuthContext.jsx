// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [mainUser,setMainUser]=useState(localStorage.getItem('user') || null);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
  };

  const mainUsr = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setMainUser(user);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout,mainUsr,mainUser }}>
      {children}
    </AuthContext.Provider>
  );
};
