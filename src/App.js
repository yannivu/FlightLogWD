import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Header from './components/flights/Header';
import AppRoutes from './components/AppRoutes';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Header title="Flight Tracker" />
        <AppRoutes /> {/* Render the routes */}
    </Router>
  );
};

export default App;
