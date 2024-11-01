// src/pages/UserFlights.js
import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, List, CircularProgress, Box, Snackbar, Alert } from '@mui/material';
import Flight from '../components/flights/Flight';
import { fetchUserFlights } from '../services/flightService';
import { AuthContext } from '../contexts/AuthContext';

const UserFlights = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching flights
  const [error, setError] = useState(null); // Error state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const loadUserFlights = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const userFlights = await fetchUserFlights(user);
        setFlights(userFlights);
        setSnackbar({
          open: true,
          message: 'Your flights loaded successfully.',
          severity: 'success',
        });
      } catch (err) {
        setError('Failed to load your flights. Please try again later.');
        setSnackbar({
          open: true,
          message: 'Failed to load your flights.',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserFlights();
  }, [user]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (authLoading || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        My Flights
      </Typography>
      {flights.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          You have no flights scheduled. Start by adding a new flight!
        </Typography>
      ) : (
        <List>
          {flights.map((flight) => (
            <Flight key={flight.id} flight={flight} />
          ))}
        </List>
      )}
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      {/* Error Message */}
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={3000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default UserFlights;
