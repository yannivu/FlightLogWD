import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import PublicRoute from './PublicRoutes';
import AuthModule from '../pages/AuthPage';
import AuthRegister from './auth/AuthRegister';
import AuthLogin from './auth/AuthLogin';
import FlightPage from '../pages/FlightPage';
import UserFlights from '../pages/UserFlights';
import MapPage2D from '../pages/2DMapPage';
import Profile from '../pages/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes - accessible only when logged out */}
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthModule />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthRegister />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PublicRoute>
            <AuthModule />
          </PublicRoute>
        }
      />

      {/* Protected routes - accessible only when logged in */}
      <Route
        path="/flights"
        element={
          <ProtectedRoute>
            <FlightPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-flights"
        element={
          <ProtectedRoute>
            <UserFlights />
          </ProtectedRoute>
        }
      />
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapPage2D />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
