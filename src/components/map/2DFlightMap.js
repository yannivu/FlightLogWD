import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemText, CircularProgress, Card, CardContent, Chip, Grid, Divider } from '@mui/material';
import { Flight, Speed, Height, DirectionsRun } from '@mui/icons-material';
import flightIcon from '../../assets/static/images/airplane.png';
import data from '../../assets/static/data/active.json';

const FlightMap2D = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        // TODO: If we were pulling directly from the API, we would make an API call like this:
        // const response = await fetch(https://api.aviationstack.com/v1/flights?access_key=<ACCESS_KEY>&flight_status=active, {
        //   headers : { 
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        //   }
        // });
        // const data = await response.json();

        const filteredFlights = data.data.filter(flight => 
          flight.live !== null && 
          flight.live.latitude != null && 
          flight.live.longitude != null
        );
        setFlights(filteredFlights);
        console.log('Fetched flight data:', filteredFlights);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight data:', error);
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const customIcon = new Icon({
    iconUrl: flightIcon,
    iconSize: [32, 32],
  });

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
    if (mapRef.current) {
      mapRef.current.flyTo([flight.live.latitude, flight.live.longitude], 8);
    }
  };

  const MapController = () => {
    const map = useMap();
    mapRef.current = map;
    return null;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      <Paper elevation={3} sx={{ width: '300px', overflowY: 'auto', p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Active Flights
        </Typography>
        <List>
          {flights.map((flight, index) => (
            <React.Fragment key={flight.flight.iata}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleFlightClick(flight)}>
                  <ListItemText
                    primary={`${flight.airline.name} ${flight.flight.iata}`}
                    secondary={`${flight.departure.iata} → ${flight.arrival.iata}`}
                  />
                </ListItemButton>
              </ListItem>
              {index < flights.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
        <MapContainer center={[30, 0]} zoom={3} style={{ height: '100%', width: '100%' }}>
          <MapController />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {flights.map((flight) => (
            <React.Fragment key={flight.flight.iata}>
              <Marker
                position={[flight.live.latitude, flight.live.longitude]}
                icon={customIcon}
              >
                <Popup>
                  <Card sx={{ minWidth: 275, maxWidth: 400 }}>
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {flight.airline.name} - {flight.flight.iata}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            From: {flight.departure.airport} ({flight.departure.iata})
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            To: {flight.arrival.airport} ({flight.arrival.iata})
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 2 }}>
                        <Chip icon={<Flight />} label={`Status: ${flight.flight_status}`} sx={{ mr: 1, mb: 1 }} />
                        <Chip icon={<Speed />} label={`Speed: ${Math.round(flight.live.speed_horizontal)} km/h`} sx={{ mr: 1, mb: 1 }} />
                        <Chip icon={<Height />} label={`Altitude: ${Math.round(flight.live.altitude)} m`} sx={{ mr: 1, mb: 1 }} />
                        <Chip icon={<DirectionsRun />} label={`On Ground: ${flight.live.is_ground ? 'Yes' : 'No'}`} sx={{ mb: 1 }} />
                      </Box>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        Last Updated: {new Date(flight.live.updated).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
          {selectedFlight && (
            <Marker
              position={[selectedFlight.live.latitude, selectedFlight.live.longitude]}
              icon={customIcon}
            >
              <Popup autoOpen>
                <Card sx={{ minWidth: 275, maxWidth: 400 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {selectedFlight.airline.name} - {selectedFlight.flight.iata}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          From: {selectedFlight.departure.airport} ({selectedFlight.departure.iata})
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          To: {selectedFlight.arrival.airport} ({selectedFlight.arrival.iata})
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                      <Chip icon={<Flight />} label={`Status: ${selectedFlight.flight_status}`} sx={{ mr: 1, mb: 1 }} />
                      <Chip icon={<Speed />} label={`Speed: ${Math.round(selectedFlight.live.speed_horizontal)} km/h`} sx={{ mr: 1, mb: 1 }} />
                      <Chip icon={<Height />} label={`Altitude: ${Math.round(selectedFlight.live.altitude)} m`} sx={{ mr: 1, mb: 1 }} />
                      <Chip icon={<DirectionsRun />} label={`On Ground: ${selectedFlight.live.is_ground ? 'Yes' : 'No'}`} sx={{ mb: 1 }} />
                    </Box>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Last Updated: {new Date(selectedFlight.live.updated).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default FlightMap2D;

