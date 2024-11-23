import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Typography,
  List,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Flight from '../components/flights/Flight';
import { fetchUserFlights } from '../services/flightService';
import { AuthContext } from '../contexts/AuthContext';

const UserFlights = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [sortOption, setSortOption] = useState('earliestDeparture');

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
        setFilteredFlights(sortFlights(userFlights, 'earliestDeparture')); // Sort by default
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

  const sortFlights = (flights, option) => {
    return [...flights].sort((a, b) => {
      if (option === 'earliestDeparture') {
        return new Date(a.departureDate) - new Date(b.departureDate);
      } else if (option === 'latestDeparture') {
        return new Date(b.departureDate) - new Date(a.departureDate);
      }
        else if (option === 'earliestArrival') {
        return new Date(a.arrivalDate) - new Date(b.arrivalDate);
      }
        else if (option === 'latestArrival') {
        return new Date(b.arrivalDate) - new Date(a.arrivalDate);
      }
       else if (option === 'shortestFlight') {
        return new Date(a.arrivalDate) - new Date(a.departureDate) - (new Date(b.arrivalDate) - new Date(b.departureDate));
      }
      else if (option === 'longestFlight') {
        return new Date(b.arrivalDate) - new Date(b.departureDate) - (new Date(a.arrivalDate) - new Date(a.departureDate));
      }
      return 0;
    });
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);
    setFilteredFlights(sortFlights(flights, option));
  };

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

      {flights.length > 0 && (
        <FormControl sx={{ mb: 2, minWidth: 200 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOption}
            onChange={handleSortChange}
            label="Sort By"
          >
            <MenuItem value="earliestDeparture">Earliest Departure</MenuItem>
            <MenuItem value="latestDeparture">Latest Departure</MenuItem>
            <MenuItem value="earliestArrival">Earliest Arrival</MenuItem>
            <MenuItem value="latestArrival">Latest Arrival</MenuItem>
            <MenuItem value="shortestFlight">Shortest Flight</MenuItem>
            <MenuItem value="longestFlight">Longest Flight</MenuItem>
          </Select>
        </FormControl>
      )}

      {filteredFlights.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          You have no flights scheduled. Start by adding a new flight!
        </Typography>
      ) : (
        <List>
          {filteredFlights.map((flight) => (
            <Flight key={flight.id} flight={flight} />
          ))}
        </List>
      )}

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