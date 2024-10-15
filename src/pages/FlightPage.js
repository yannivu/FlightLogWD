import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import SearchBar from '../components/flights/SearchBar';
import AddFlight from '../components/flights/AddFlight';
import FlightList from '../components/flights/FlightList';
import { addNewFlight, fetchAllFlights } from '../services/flightService';

const FlightPage = () => {
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch flights on component mount
  useEffect(() => {
    const loadFlights = async () => {
      setLoading(true);
      try {
        const fetchedFlights = await fetchAllFlights();
        setFlights(fetchedFlights);
        setSnackbarMessage('Flights loaded successfully.');
      } catch (error) {
        setSnackbarMessage('Failed to load flights.');
      } finally {
        setLoading(false);
      }
    };

    loadFlights();
  }, []);

  // Handler to add a new flight
  const handleAddFlight = async (newFlight) => {
    try {
      const savedFlight = await addNewFlight(newFlight);
      setFlights((prevFlights) => [...prevFlights, savedFlight]);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Failed to add flight.');
    }
  };

  // Handler to close the snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // Filter flights based on search query
  const filteredFlights = flights.filter((flight) =>
    flight.passengerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Box my={4}>
        <SearchBar setSearchQuery={setSearchQuery} />
        <AddFlight addFlight={handleAddFlight} />
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <FlightList flights={filteredFlights} />
        )}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};


export default FlightPage;
