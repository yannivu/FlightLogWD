import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* Navigation Buttons */}
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/flights">
            My Flights
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
          {/* Add more buttons as needed */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
