import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FlightPage from '../pages/FlightPage';
import UserFlights from '../pages/UserFlights';
import AuthModule from './auth/Auth.js';
import AuthRegister from './auth/AuthRegister.js';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthModule />} />
      <Route path="/register" element={<AuthRegister />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />

      {/* Flights Route */}
      <Route path="/*" element={<FlightPage />} />

      {/* My Flights Route */}
      <Route path="/flights" element={<UserFlights />} />

    </Routes>
  );
};

export default AppRoutes;
