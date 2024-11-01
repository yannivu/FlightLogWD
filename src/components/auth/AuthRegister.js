import React, { useEffect, useState, useContext } from 'react';
import { createUser } from '../../services/AuthService';
import AuthForm from './AuthForm';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const AuthRegister = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [add, setAdd] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const registerUser = async () => {
      if (add) {
        const userCreated = await createUser(newUser);
        if (userCreated) {
          login(userCreated);
          setSnackbar({
            open: true,
            message: `${userCreated.get('firstName')}, you successfully registered!`,
            severity: 'success',
          });
          navigate('/flights');
        } else {
          setSnackbar({
            open: true,
            message: 'Registration failed. Please try again.',
            severity: 'error',
          });
        }
        setAdd(false);
      }
    };

    registerUser();
  }, [add, newUser, login, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div>
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isLogin={false}
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

export default AuthRegister;
