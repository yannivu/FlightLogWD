import React from 'react';
import { TextField, Button, Container, Box } from '@mui/material';

const AuthForm = ({ user, onChange, onSubmit, isLogin }) => {
  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <form onSubmit={onSubmit}>
          {!isLogin && (
            <>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={user.firstName}
                onChange={onChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={onChange}
                margin="normal"
                required
              />
            </>
          )}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={onChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={onChange}
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AuthForm;
