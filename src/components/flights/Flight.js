import React from 'react';
import { ListItem, ListItemText, Divider } from '@mui/material';

const Flight = ({ flight }) => {
  const secondaryText = (
    <>
      <strong>Airline:</strong> {flight.airline} <br />
      <strong>Route:</strong> {flight.departureAirportCode.toUpperCase()} &rarr; {flight.arrivalAirportCode.toUpperCase()}
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
