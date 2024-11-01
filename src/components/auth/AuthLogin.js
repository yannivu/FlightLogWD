import React, { useState, useContext } from 'react';
import { loginUser } from '../../services/AuthService';
import LoginForm from './LoginForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const AuthLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = await loginUser(credentials);
    if (user) {
      login(user);
      setSnackbar({
        open: true,
        message: `Welcome back, ${user.get('firstName')}!`,
        severity: 'success',
      });
      navigate('/flights');
    } else {
      setSnackbar({
        open: true,
        message: 'Login failed. Please check your credentials.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <LoginForm
        credentials={credentials}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isLogin={true}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AuthLogin;
