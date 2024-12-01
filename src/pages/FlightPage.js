import React, { useState, useEffect, useContext } from 'react';
import { Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import SearchBar from '../components/flights/SearchBar';
import AddFlight from '../components/flights/AddFlight';
import FlightList from '../components/flights/FlightList';
import { addNewFlight, fetchAllFlights } from '../services/flightService';
import { AuthContext } from '../contexts/AuthContext';
import { Container } from '@mui/material';

const FlightPage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  // Fetch all flights on component mount (optional)
  useEffect(() => {
    const loadFlights = async () => {
      setLoading(true);
      try {
        const fetchedFlights = await fetchAllFlights();
        setFlights(fetchedFlights);
        setSnackbarMessage('Flights loaded successfully.');
        setSnackbarSeverity('success');
      } catch (error) {
        setSnackbarMessage('Failed to load flights.');
        setSnackbarSeverity('error');
      } finally {
        setLoading(false);
      }
    };

    loadFlights();
  }, []);

  // Handler to add a new flight
  const handleAddFlight = async (newFlight) => {
    if (!user) {
      setSnackbarMessage('You must be logged in to add a flight.');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      const savedFlight = await addNewFlight(newFlight, user);
      setFlights((prevFlights) => [...prevFlights, savedFlight]);
      setSnackbarMessage('Flight added successfully.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Failed to add flight.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // Handler to close the snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Filter flights based on search query
  const filteredFlights = flights.filter((flight) =>
    flight.passengerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Container>
        <Box my={4}>
          <SearchBar setSearchQuery={setSearchQuery} />
          <AddFlight addFlight={handleAddFlight} />
          <FlightList flights={filteredFlights} />
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </Container>
    </>
  );
};

export default FlightPage;
