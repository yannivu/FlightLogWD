import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
