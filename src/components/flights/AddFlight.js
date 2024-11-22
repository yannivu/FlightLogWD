import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Autocomplete,
} from '@mui/material';
import algoliasearch from 'algoliasearch/lite';

const INDEX = 'Airline';

const searchClient = algoliasearch(
  'U9F4V3JVO0',
  'd06eb0d72bb6d1d1cbf13f96992324da'
);

const fetchAirlines = async (query) => {
  if (!query) return [];
  const { results } = await searchClient.search([
    { indexName: INDEX, query, params: { hitsPerPage: 5 } },
  ]);
  return results[0]?.hits || [];
};

const AddFlight = ({ addFlight }) => {
  const [passengerName, setPassengerName] = useState('');
  const [departureAirportCode, setDepartureAirportCode] = useState('');
  const [arrivalAirportCode, setArrivalAirportCode] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [airlineName, setAirlineName] = useState('');
  const [airlineId, setAirlineId] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [error, setError] = useState(null);
  const [airlineOptions, setAirlineOptions] = useState([]);

  const handleAirlineSearch = async (event) => {
    const query = event.target.value;
    setAirlineName(query);
    if (query.length > 0) {
      const airlines = await fetchAirlines(query);
      setAirlineOptions(airlines);
    } else {
      setAirlineOptions([]);
    }
  };

  const handleSuggestionClick = (event, value) => {
    if (value) {
      setAirlineName(value.name);
      setAirlineId(value.objectId);
    } else {
      setAirlineName('');
      setAirlineId('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passengerName || !departureAirportCode || !arrivalAirportCode || !flightNumber || !airlineId || !departureDate || !arrivalDate) {
      setError('All fields are required.');
      return;
    }

    if (arrivalDate <= departureDate) {
      setError('Arrival time must be after departure time.');
      return;
    }

    const newFlight = {
      passengerName,
      departureAirportCode,
      arrivalAirportCode,
      flightNumber: Number(flightNumber),
      airlineId,
      departureDate,
      arrivalDate,
      airlineName,
    };

    addFlight(newFlight);
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
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
          </Grid>

          {/* Airline Selection */}
          <Grid item xs={12} sm={6}>
            <Autocomplete
              freeSolo
              disableClearable
              options={airlineOptions}
              getOptionLabel={(option) => option.name || ''}
              inputValue={airlineName}
              onInputChange={handleAirlineSearch}
              onChange={handleSuggestionClick}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Airline"
                  margin="normal"
                  fullWidth
                  required
                />
              )}
            />
          </Grid>

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

          {/* Other Fields */}
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

          <Grid item xs={12} sm={6}>
            <TextField
              label="Departure Date and Time"
              type="datetime-local"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Arrival Date and Time"
              type="datetime-local"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              required
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Flight
            </Button>
          </Grid>

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