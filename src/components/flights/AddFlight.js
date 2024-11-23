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

const searchClient = algoliasearch(
  'U9F4V3JVO0',
  'd06eb0d72bb6d1d1cbf13f96992324da'
);

const fetchAirlines = async (query) => {
  if (!query) return [];
  const { results } = await searchClient.search([
    { indexName: 'Airline', query, params: { hitsPerPage: 5 } },
  ]);
  return results[0]?.hits || [];
};

const fetchAirports = async (query) => {
  if (!query) return [];
  const { results } = await searchClient.search([
    { indexName: 'Airport', query, params: { hitsPerPage: 5 } },
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
  const [departureAirportOptions, setDepartureAirportOptions] = useState([]);
  const [arrivalAirportOptions, setArrivalAirportOptions] = useState([]);

  const handleAirlineSearch = async (event, value) => {
    setAirlineName(value);
    if (value.length > 0) {
      const airlines = await fetchAirlines(value);
      setAirlineOptions(airlines);
    } else {
      setAirlineOptions([]);
    }
  };

  const handleDepartureSearch = async (event, value) => {
    if (value.length > 0) {
      const airports = await fetchAirports(value);
      setDepartureAirportOptions(airports);
    } else {
      setDepartureAirportOptions([]);
    }
  };
  
  const handleArrivalSearch = async (event, value) => {
    if (value.length > 0) {
      const airports = await fetchAirports(value);
      setArrivalAirportOptions(airports);
    } else {
      setArrivalAirportOptions([]);
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

  const handleDepartureClick = (event, value) => {
    if (value) {
      setDepartureAirportCode(value.IATA);
    } else {
      setDepartureAirportCode('');
    }
  };

  const handleArrivalClick = (event, value) => {
    if (value) {
      setArrivalAirportCode(value.IATA);
    } else {
      setArrivalAirportCode('');
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

          <Grid item xs={12} sm={2.4}>
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

          {/* Departure Airport */}
          <Grid item xs={12} sm={4.8}>
            <Autocomplete
              freeSolo
              disableClearable
              options={departureAirportOptions}
              getOptionLabel={(option) =>
                option.Name && option.IATA ? `${option.Name} (${option.IATA})` : ''
              }
              filterOptions={(options, { inputValue }) =>
                options.filter(
                  (option) =>
                    option.Name ||
                    option.IATA
                )
              }
              onInputChange={handleDepartureSearch}
              onChange={handleDepartureClick}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Departure Airport"
                  margin="normal"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>

          {/* Arrival Airport */}
          <Grid item xs={12} sm={4.8}>
            <Autocomplete
              freeSolo
              disableClearable
              options={arrivalAirportOptions}
              getOptionLabel={(option) =>
                option.Name && option.IATA ? `${option.Name} (${option.IATA})` : ''
              }
              filterOptions={(options, { inputValue }) =>
                options.filter(
                  (option) =>
                    option.Name ||
                    option.IATA
                )
              }
              onInputChange={handleArrivalSearch}
              onChange={handleArrivalClick}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Arrival Airport"
                  margin="normal"
                  required
                  fullWidth
                />
              )}
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