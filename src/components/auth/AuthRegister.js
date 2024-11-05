import React, { useEffect, useState, useContext } from 'react';
import { createUser } from '../../services/AuthService';
import AuthForm from './AuthForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const AuthRegister = () => {
  // Access the login function from AuthContext to set the authenticated user in global state
  const { login } = useContext(AuthContext);
  // Initialize navigation hook to redirect after successful registration
  const navigate = useNavigate();

  // Local state for storing new user details entered in the registration form
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // State to trigger registration effect when form is submitted
  const [add, setAdd] = useState(false);

  // State to control snackbar visibility and content for user feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // useEffect hook to handle user registration when `add` state changes to true
  useEffect(() => {
    const registerUser = async () => {
      if (add) {
        const userCreated = await createUser(newUser); // Call createUser service to register new user
        if (userCreated) {
          // If registration succeeds, log the user in, show success message, and navigate
          login(userCreated);
          setSnackbar({
            open: true,
            message: `${userCreated.get('firstName')}, you successfully registered!`,
            severity: 'success',
          });
          navigate('/flights'); // Redirect to flights page
        } else {
          // If registration fails, show an error message in the snackbar
          setSnackbar({
            open: true,
            message: 'Registration failed. Please try again.',
            severity: 'error',
          });
        }
        setAdd(false); // Reset `add` to prevent repeated registration attempts
      }
    };

    registerUser();
  }, [add, newUser, login, navigate]);

  // Handle input changes in the registration form, updating `newUser` state fields
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle form submission by setting `add` to true, triggering the registration useEffect
  const onSubmitHandler = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    setAdd(true); // Trigger registration effect
  };

  // Close the snackbar when it times out or is manually closed
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      {/* Render AuthForm component for registration, passing necessary props for handling input and submit */}
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isLogin={false} // Pass indicator to form component to display registration-specific fields
      />

      {/* Snackbar component for displaying success or error feedback */}
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

export default AuthRegister;
