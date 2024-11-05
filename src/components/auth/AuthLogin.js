import React, { useState, useContext } from 'react';
import { loginUser } from '../../services/AuthService';
import LoginForm from './LoginForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const AuthLogin = () => {
  // Get login function from AuthContext to update authentication status globally
  const { login } = useContext(AuthContext);
  // Initialize navigation hook to programmatically navigate users upon successful login
  const navigate = useNavigate();

  // Local state for holding user input for email and password
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Local state for managing snackbar visibility and message content for feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success', // severity determines snackbar style (e.g., success or error)
  });

  // Handle input changes in the login form, updating respective state fields
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle form submission for login
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    const user = await loginUser(credentials); // Call loginUser service with user credentials

    if (user) {
      // If login is successful, update the global authentication context
      login(user);
      // Show success message in snackbar and navigate to the flights page
      setSnackbar({
        open: true,
        message: `Welcome back, ${user.get('firstName')}!`,
        severity: 'success',
      });
      navigate('/flights'); // Redirect to flights page
    } else {
      // If login fails, show error message in snackbar
      setSnackbar({
        open: true,
        message: 'Login failed. Please check your credentials.',
        severity: 'error',
      });
    }
  };

  // Close snackbar when the auto-hide duration is reached or manually closed
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      {/* Render LoginForm component, passing necessary props for handling input and submit */}
      <LoginForm
        credentials={credentials}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isLogin={true} // Pass indicator to form component to display login-specific fields
      />

      {/* Snackbar component for showing feedback messages (success/error) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000} // Automatically close snackbar after 3 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position of snackbar
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AuthLogin;
