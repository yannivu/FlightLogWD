import React from 'react';
import { TextField, Button, Container, Box } from '@mui/material';

// AuthForm component definition
const AuthForm = ({ user, onChange, onSubmit, isLogin }) => {
  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <form onSubmit={onSubmit}>
          {/* Render first name and last name fields only if it's not a login form */}
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
          {/* Email field */}
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
          {/* Password field */}
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
          {/* Submit button */}
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
