import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Parse from 'parse'; 

const AddFlight = ({ addFlight }) => {
  const [flightDetails, setFlightDetails] = useState({
    passengerName: '',
    airlineName: '',
    flightNumber: '',
    departureAirportCode: '',
    arrivalAirportCode: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFlightDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new Parse Object for the Flights class
    const Flight = Parse.Object.extend('Flight');
    const newFlight = new Flight();

    // Set flight details to the Parse object
    newFlight.set('passengerName', flightDetails.passengerName);
    newFlight.set('airlineName', flightDetails.airlineName);
    newFlight.set('flightNumber', parseInt(flightDetails.flightNumber, 10)); // Ensure flight number is an integer
    newFlight.set('departureAirportCode', flightDetails.departureAirportCode);
    newFlight.set('arrivalAirportCode', flightDetails.arrivalAirportCode);

    try {
      // Save the flight to the database
      const savedFlight = await newFlight.save();

      // Update the UI with the saved flight
      addFlight(savedFlight.attributes);

      // Reset the form
      setFlightDetails({
        passengerName: '',
        airlineName: '',
        flightNumber: '',
        departureAirportCode: '',
        arrivalAirportCode: '',
      });
    } catch (error) {
      console.error('Error saving flight:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add Flight
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Passenger Name"
              name="passengerName"
              value={flightDetails.passengerName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Airline Name"
              name="airlineName"
              value={flightDetails.airlineName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Flight Number"
              name="flightNumber"
              value={flightDetails.flightNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Departure Airport"
              name="departureAirportCode"
              value={flightDetails.departureAirportCode}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 3 }}
              helperText="e.g., JFK"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Arrival Airport"
              name="arrivalAirportCode"
              value={flightDetails.arrivalAirportCode}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 3 }}
              helperText="e.g., LAX"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Flight
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddFlight;