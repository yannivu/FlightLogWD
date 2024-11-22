import React from 'react';
import { ListItem, ListItemText, Divider } from '@mui/material';

// Flight component to display flight details
const Flight = ({ flight }) => {
  // Constructing the secondary text with airline and route information
  const secondaryText = (
    <>
      <strong>Airline:</strong> {flight.airline} <br />
      <strong>Route:</strong> {flight.departureAirportCode.toUpperCase()} &rarr; {flight.arrivalAirportCode.toUpperCase()}<br />
      <strong>Departure:</strong> {new Date(flight.departureDate).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric' })}<br />
      <strong>Arrival:</strong> {new Date(flight.arrivalDate).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric' })}<br />
      <strong>Flight Number:</strong> {flight.flightNumber}
    </>
  );

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={flight.passengerName}
          secondary={secondaryText}
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default Flight;
