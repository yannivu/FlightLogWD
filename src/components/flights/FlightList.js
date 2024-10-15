import React from 'react';
import { List, Paper, Typography } from '@mui/material';
import Flight from './Flight';

// FlightList component to display a list of flights
const FlightList = ({ flights }) => {
  return (
    // Paper component for a card-like container with elevation
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      {/* Typography component for the title */}
      <Typography variant="h6" gutterBottom>
        Flight List
      </Typography>
      {/* Conditional rendering based on the length of flights array */}
      {flights.length === 0 ? (
        // Message when no flights are found
        <Typography variant="body1">No flights found.</Typography>
      ) : (
        // List component to display the list of flights
        <List>
          {/* Mapping through flights array and rendering Flight component for each flight */}
          {flights.map((flight) => (
            <Flight key={flight.flightNumber} flight={flight} />
          ))}
        </List>
      )}
    </Paper>
  );
};

export default FlightList;
