import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated by reading from localStorage
  const isAuthenticated = localStorage.getItem("valid");

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
