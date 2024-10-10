import React from 'react';
import { List, Paper, Typography } from '@mui/material';
import Flight from './Flight';

const FlightList = ({ flights }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Flight List
      </Typography>
      {flights.length === 0 ? (
        <Typography variant="body1">No flights found.</Typography>
      ) : (
        <List>
          {flights.map((flight) => (
            <Flight key={flight.flightNumber} flight={flight} />
          ))}
        </List>
      )}
    </Paper>
  );
};

export default FlightList;
