import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlightPage from '../pages/FlightPage';
import UserFlights from '../pages/UserFlights';

const AppRoutes = () => {
  return (
    <Routes>
  
      {/* Flights Route */}
      <Route path="/*" element={<FlightPage />} />

      {/* My Flights Route */}
      <Route path="/flights" element={<UserFlights />} />

    </Routes>
  );
};

export default AppRoutes;
