import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/flights/Header';
import FlightPage from './pages/FlightPage';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header title="Flight App" />
      <Container maxWidth="md">
        <FlightPage />
      </Container>
    </>
  );
};

export default App;
