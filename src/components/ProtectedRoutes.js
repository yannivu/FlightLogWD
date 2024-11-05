import React, { useContext } from 'react'; // Import React and the useContext hook
import { Navigate } from 'react-router-dom'; // Import Navigate component from react-router-dom for navigation
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext to access authentication state

// Define the ProtectedRoute component which takes children as a prop
const ProtectedRoute = ({ children }) => {
  // Use the useContext hook to get the user and loading state from AuthContext
  const { user, loading } = useContext(AuthContext);

  // If the authentication state is still loading, return null (render nothing)
  if (loading) {
    return null; 
  }

  // If the user is authenticated, render the children components
  // Otherwise, navigate to the "/auth" route
  return user ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute; // Export the ProtectedRoute component as the default export