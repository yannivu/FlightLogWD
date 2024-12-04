import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Grid,
  Divider,
} from '@mui/material';
import { Flight, Speed, Height, DirectionsRun } from '@mui/icons-material';
import flightIcon from '../../assets/static/images/airplane.png';
import data from '../../assets/static/data/active.json';
import { fetchAirportLongLatByCode } from '../../services/AirlineService';
import { fetchAllFlights } from '../../services/flightService';

const FlightMap2D = () => {
  // Combined state for active and upcoming flights
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        // Fetch active flights from JSON
        const activeFlights = data.data.filter(
          (flight) =>
            flight.live !== null &&
            flight.live.latitude != null &&
            flight.live.longitude != null
        );

        // Normalize active flights to include a 'type' property
        const normalizedActiveFlights = activeFlights.map((flight) => ({
          ...flight,
          type: 'active',
        }));

        // Fetch upcoming flights from API or service
        const allFlights = await fetchAllFlights();
        const upcomingFlightsRaw = allFlights
          .filter((flight) => new Date(flight.departureDate) > new Date())
          .sort(
            (a, b) =>
              new Date(a.departureDate) - new Date(b.departureDate)
          ); // Sort by soonest departure time

        // Fetch departure and arrival coordinates for upcoming flights
        const upcomingFlights = await Promise.all(
          upcomingFlightsRaw.map(async (flight) => {
            const departure = await fetchAirportLongLatByCode(
              flight.departureAirportCode
            );
            const arrival = await fetchAirportLongLatByCode(
              flight.arrivalAirportCode
            );
            return {
              ...flight,
              departure,
              arrival,
              type: 'upcoming',
            };
          })
        );

        console.log("Upcoming11: ", upcomingFlights);

        // Normalize upcoming flights to match active flights schema where possible
        const normalizedUpcomingFlights = upcomingFlights.map((flight) => ({
          flight: {
            iata: flight.flightNumber,
            airline: {
              name: flight.airline,
            },
          },
          departure: flight.departure,
          arrival: flight.arrival,
          arrivalAirport: flight.arrivalAirportCode,
          departureAirport: flight.departureAirportCode,
          live: {
            latitude: flight.departure[0].latitude, // Assuming initial position is departure
            longitude: flight.departure[0].longitude,
            speed_horizontal: 0, // No speed info for upcoming flights
            altitude: 0, // No altitude info for upcoming flights
            is_ground: true, // Upcoming flights are on ground
            updated: flight.departureDate, // Use departureDate as the last update
          },
          flight_status: 'Scheduled',
          passengerName: flight.passengerName,
          departureDate: flight.departureDate,
          arrivalDate: flight.arrivalDate,
          id: flight.id,
          type: 'upcoming', // Distinguish flight type
        }));

        // Combine active and upcoming flights
        const combinedFlights = [
          ...normalizedActiveFlights,
          ...normalizedUpcomingFlights,
        ];
        console.log('Active Flights:', normalizedActiveFlights);
        console.log('Upcoming Flights:', normalizedUpcomingFlights);

        setFlights(combinedFlights);
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
      const position = [flight.live.latitude, flight.live.longitude];
      mapRef.current.flyTo(position, 8);
    }
  };

  const MapController = () => {
    const map = useMap();
    mapRef.current = map;
    return null;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      <Paper
        elevation={3}
        sx={{ width: '300px', overflowY: 'auto', p: 2 }}
      >
        <Typography variant="h6" gutterBottom>
          {`Flights (${flights.length})`}
        </Typography>
        <List>
          {flights.map((flight, index) => (
            <React.Fragment key={`${flight.type}-${flight.flight.iata}-${flight.id || index}`}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleFlightClick(flight)}>
                  <ListItemText
                    primary={
                      flight.type === 'active'
                        ? `${flight.airline.name} ${flight.flight.iata}`
                        : `${flight.flight.airline.name} - Flight ${flight.flight.iata}`
                      }
                    secondary={
                      flight.type === 'active'
                        ? `${flight.departure.iata} → ${flight.arrival.iata}`
                        : `${flight.departureAirport} → ${flight.arrivalAirport}`
                    }
                  />
                </ListItemButton>
              </ListItem>
              {index < flights.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Box sx={{ flexGrow: 1 }}>
        <MapContainer
          center={[30, 0]}
          zoom={3}
          style={{ height: '100%', width: '100%' }}
        >
          <MapController />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {flights.map((flight, index) => {
            const position =[flight.live.latitude, flight.live.longitude];
            return (
              <Marker
                key={`${flight.type}-${flight.flight.iata}-${flight.id || index}`}
                position={position}
                icon={customIcon}
              >
                <Popup>
                  <Card sx={{ minWidth: 275, maxWidth: 400 }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                      >
                        {flight.type === 'active'
                          ? `${flight.airline.name} - ${flight.flight.iata}`
                          : `${flight.flight.airline.name} - Flight ${flight.flight.iata}`}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            From:{' '}
                            {flight.type === 'active'
                              ? `${flight.departure.airport} (${flight.departure.iata})`
                              : `${flight.departureAirport}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            To:{' '}
                            {flight.type === 'active'
                              ? `${flight.arrival.airport} (${flight.arrival.iata})`
                              : `${flight.arrivalAirport}`}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 2 }}>
                        <Chip
                          icon={<Flight />}
                          label={`Status: ${
                            flight.type === 'active'
                              ? flight.flight_status
                              : flight.type === 'upcoming'
                              ? 'Scheduled'
                              : 'Unknown'
                          }`}
                          sx={{ mr: 1, mb: 1 }}
                        />
                        {flight.type === 'active' && (
                          <>
                            <Chip
                              icon={<Speed />}
                              label={`Speed: ${Math.round(
                                flight.live.speed_horizontal
                              )} km/h`}
                              sx={{ mr: 1, mb: 1 }}
                            />
                            <Chip
                              icon={<Height />}
                              label={`Altitude: ${Math.round(
                                flight.live.altitude
                              )} m`}
                              sx={{ mr: 1, mb: 1 }}
                            />
                            <Chip
                              icon={<DirectionsRun />}
                              label={`On Ground: ${
                                flight.live.is_ground ? 'Yes' : 'No'
                              }`}
                              sx={{ mb: 1 }}
                            />
                          </>
                        )}
                        {flight.type === 'upcoming' && (
                          <>
                            <Chip
                              icon={<Flight />}
                              label={`Passenger: ${flight.passengerName}`}
                              sx={{ mr: 1, mb: 1 }}
                            />
                            <Chip
                              icon={<DirectionsRun />}
                              label={`Status: On Ground`}
                              sx={{ mb: 1 }}
                            />
                          </>
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        {flight.type === 'active'
                          ? `Last Updated: ${new Date(
                              flight.live.updated
                            ).toLocaleString()}`
                          : `Departure: ${new Date(
                              flight.departureDate
                            ).toLocaleString()}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Popup>
              </Marker>
            );
          })}
          {selectedFlight && (
            <Marker
              position={[selectedFlight.live.latitude, selectedFlight.live.longitude]}
              icon={customIcon}
            >
              <Popup autoOpen>
                <Card sx={{ minWidth: 275, maxWidth: 400 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                    >
                      {selectedFlight.type === 'active'
                        ? `${selectedFlight.airline.name} - ${selectedFlight.flight.iata}`
                        : `${selectedFlight.flight.airline.name} - Flight ${selectedFlight.flight.iata}`}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          From:{' '}
                          {selectedFlight.type === 'active'
                            ? `${selectedFlight.departure.airport} (${selectedFlight.departure.iata})`
                            : `${selectedFlight.departureAirport}`}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          To:{' '}
                          {selectedFlight.type === 'active'
                            ? `${selectedFlight.arrival.airport} (${selectedFlight.arrival.iata})`
                            : `${selectedFlight.arrivalAirport}`}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        icon={<Flight />}
                        label={`Status: ${
                          selectedFlight.type === 'active'
                            ? selectedFlight.flight_status
                            : 'Scheduled'
                        }`}
                        sx={{ mr: 1, mb: 1 }}
                      />
                      {selectedFlight.type === 'active' && (
                        <>
                          <Chip
                            icon={<Speed />}
                            label={`Speed: ${Math.round(
                              selectedFlight.live.speed_horizontal
                            )} km/h`}
                            sx={{ mr: 1, mb: 1 }}
                          />
                          <Chip
                            icon={<Height />}
                            label={`Altitude: ${Math.round(
                              selectedFlight.live.altitude
                            )} m`}
                            sx={{ mr: 1, mb: 1 }}
                          />
                          <Chip
                            icon={<DirectionsRun />}
                            label={`On Ground: ${
                              selectedFlight.live.is_ground ? 'Yes' : 'No'
                            }`}
                            sx={{ mb: 1 }}
                          />
                        </>
                      )}
                      {selectedFlight.type === 'upcoming' && (
                        <>
                          <Chip
                            icon={<Flight />}
                            label={`Passenger: ${selectedFlight.passengerName}`}
                            sx={{ mr: 1, mb: 1 }}
                          />
                          <Chip
                            icon={<DirectionsRun />}
                            label={`Status: On Ground`}
                            sx={{ mb: 1 }}
                          />
                        </>
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      {selectedFlight.type === 'active'
                        ? `Last Updated: ${new Date(
                            selectedFlight.live.updated
                          ).toLocaleString()}`
                        : `Departure: ${new Date(
                            selectedFlight.departureDate
                          ).toLocaleString()}`}
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