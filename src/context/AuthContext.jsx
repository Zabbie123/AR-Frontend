// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await authService.getProfile();
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching profile:', error);
          localStorage.removeItem('token');
        }
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // const login = async (email, password) => {
  //   const response = await authService.login(email, password);

  //   const { user, token } = response.data;

  //   // Store token in localStorage
  //   localStorage.setItem('token', token);
  //   setUser(user);
  //   setIsAuthenticated(true);

  //   return response.data;
  // };

  const login = async (email, password) => {
    const response = await authService.login(email, password);

    const { user, token } = response.data;

    // ✅ Store both user and token together in localStorage
    const userData = { ...user, token };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);

    // ✅ Update state properly
    setUser(userData);
    setIsAuthenticated(true);

    return userData;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);

    const { user, token } = response.data;

    localStorage.setItem('token', token);
    setUser(user);
    setIsAuthenticated(true);

    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;