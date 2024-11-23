import React from 'react';
import { List, Paper, Typography } from '@mui/material';
import Flight from './Flight';

// FlightList component to display a list of upcoming flights
const FlightList = ({ flights }) => {
  // Get the current date and time
  const now = new Date();

  // Filter flights to include only those with a future departure time
  const upcomingFlights = flights
    .filter((flight) => new Date(flight.departureDate) > now)
    .sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate)); // Sort by soonest departure time

  return (
    // Paper component for a card-like container with elevation
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
      {/* Typography component for the title */}
      <Typography variant="h6" gutterBottom>
        Upcoming Flights
      </Typography>
      {/* Conditional rendering based on the length of upcomingFlights array */}
      {upcomingFlights.length === 0 ? (
        // Message when no upcoming flights are found
        <Typography variant="body1">No upcoming flights.</Typography>
      ) : (
        // List component to display the list of upcoming flights
        <List>
          {/* Mapping through upcomingFlights array and rendering Flight component for each flight */}
          {upcomingFlights.map((flight) => (
            <Flight key={flight.id} flight={flight} />
          ))}
        </List>
      )}
    </Paper>
  );
};

export default FlightList;