import React, { useState, useEffect } from 'react';
import { Container, Box, CssBaseline, Snackbar, Alert, CircularProgress } from '@mui/material';
import Header from './components/Header';
import AddFlight from './components/AddFlight';
import FlightList from './components/FlightList';
import SearchBar from './components/SearchBar';
import * as ENV from './environment.js'
import Parse from 'parse';

const appId = ENV.REACT_APP_PARSE_APP_ID;
const jsKey = ENV.REACT_APP_PARSE_JAVASCRIPT_KEY;
const serverUrl = ENV.REACT_APP_PARSE_HOST_URL;

Parse.initialize(appId, jsKey);
Parse.serverURL = serverUrl;

const App = () => {
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchAllFlights = async () => {
    setLoading(true);
    const query = new Parse.Query("Flight");
    query.include("airline"); // Include airline object in the query
    const results = await query.find();

    const fetchedFlights = results.map(item => {
      const flightData = {
        passengerName: item.get("passengerName"),
        departureAirportCode: item.get("departureAirportCode"),
        arrivalAirportCode: item.get("arrivalAirportCode"),
        flightNumber: item.get("flightNumber"),
        airline: item.get("airline").get("name") // Relational query to get airline name from the airline class
      };
      return flightData;
    });

    setFlights(fetchedFlights); // Update state w ith fetched flights
    setLoading(false);
  };

  fetchAllFlights();
}, []);

  const addFlight = (newFlight) => {
    setFlights((prevFlights) => [...prevFlights, newFlight]);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };


  const filteredFlights = flights.filter((flight) =>
    flight.passengerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <CssBaseline />
      <Header title="Flight App" />
      <Container maxWidth="md">
        <Box my={4}>
          <SearchBar setSearchQuery={setSearchQuery} />
          <AddFlight addFlight={addFlight} />
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <FlightList flights={filteredFlights} />
          )}
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Flight added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};


export default App;
