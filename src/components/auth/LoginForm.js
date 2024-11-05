import React from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

const LoginForm = ({ credentials, onChange, onSubmit, isLogin }) => {
  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h5" gutterBottom>
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        <form onSubmit={onSubmit}>
          {/* Email field */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={onChange}
            margin="normal"
            required
          />
          {/* Password field */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
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

export default LoginForm;
