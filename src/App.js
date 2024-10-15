import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/flights/Header';
import AppRoutes from './components/AppRoutes';
const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Header title="Flight App" />
      <Container maxWidth="md">
        <AppRoutes /> {/* Render the routes */}
      </Container>
    </Router>
  );
};

export default App;
