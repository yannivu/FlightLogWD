import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { fetchAllAirlines } from '../../services/airlineService';

const AddFlight = ({ addFlight }) => {
  // State variables for form fields
  const [passengerName, setPassengerName] = useState('');
  const [departureAirportCode, setDepartureAirportCode] = useState('');
  const [arrivalAirportCode, setArrivalAirportCode] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [airlineId, setAirlineId] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [airlines, setAirlines] = useState([]);
  const [loadingAirlines, setLoadingAirlines] = useState(true);
  const [error, setError] = useState(null);

  // Fetch airlines data when component mounts
  useEffect(() => {
    const loadAirlines = async () => {
      try {
        const fetchedAirlines = await fetchAllAirlines();
        setAirlines(fetchedAirlines);
      } catch (err) {
        console.error("Error loading airlines:", err);
        setError("Failed to load airlines.");
      } finally {
        setLoadingAirlines(false);
      }
    };

    loadAirlines();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Enhanced validation
    if (!passengerName || !departureAirportCode || !arrivalAirportCode || 
        !flightNumber || !airlineId || !departureDate || !arrivalDate) {
      setError("All fields are required.");
      return;
    }

    
    if (arrivalDate <= departureDate) {
      setError("Arrival time must be after departure time.");
      return;
    }
  
    const newFlight = {
      passengerName,
      departureAirportCode,
      arrivalAirportCode,
      flightNumber: Number(flightNumber),
      airlineId,
      departureDate,
      arrivalDate
    };
  
    addFlight(newFlight);
  };  

  // Show loading message while fetching airlines
  if (loadingAirlines) {
    return <Box>Loading airlines...</Box>;
  }

  // Show error message if there's an error
  if (error) {
    return <Box color="error.main">{error}</Box>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add Flight
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Passenger Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Passenger Name"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          </Grid>

          {/* Airline Selection */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="airline-label">Airline</InputLabel>
              <Select
                labelId="airline-label"
                value={airlineId}
                label="Airline"
                onChange={(e) => setAirlineId(e.target.value)}
              >
                {airlines.map((airline) => (
                  <MenuItem key={airline.id} value={airline.id}>
                    {airline.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Flight Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Flight Number"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              required
              fullWidth
              type="number"
              margin="normal"
              inputProps={{ min: 0 }}
            />
          </Grid>

          {/* Departure Airport Code */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Departure Airport"
              value={departureAirportCode}
              onChange={(e) => setDepartureAirportCode(e.target.value.toUpperCase())}
              required
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 3 }}
              helperText="e.g., JFK"
            />
          </Grid>

          {/* Arrival Airport Code */}
          <Grid item xs={12} sm={3}>
            <TextField
              label="Arrival Airport"
              value={arrivalAirportCode}
              onChange={(e) => setArrivalAirportCode(e.target.value.toUpperCase())}
              required
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 3 }}
              helperText="e.g., LAX"
            />
          </Grid>

          {/* Departure Date and Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Departure Date and Time"
              type="datetime-local"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Arrival Date and Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Arrival Date and Time"
              type="datetime-local"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Flight
            </Button>
          </Grid>

          {/* Error Message */}
          {error && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default AddFlight;