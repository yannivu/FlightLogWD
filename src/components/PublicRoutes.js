import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PublicRoute = ({ children }) => {
  // Access user and loading state from AuthContext
  const { user, loading } = useContext(AuthContext);

  // If user authentication status is still loading, don't render anything yet
  if (loading) {
    return null; // Render nothing until loading is complete
  }

  // If no user is authenticated, render the children (public component); 
  // otherwise, redirect to the /flights page
  return !user ? children : <Navigate to="/flights" replace />;
};

export default PublicRoute;
