import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const AuthModule = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Side: Text and Buttons */}
        <Grid item xs={12} md={6}>
          <Typography variant={isSmallScreen ? "h4" : "h3"} component="h1" gutterBottom>
            Welcome to <span style={{ color: theme.palette.primary.main }}>Flight Tracker</span>
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Your ultimate solution to manage and monitor flights effortlessly. Whether you're planning a trip, tracking your flights, or viewing live flight paths, Flight Tracker has got you covered.
          </Typography>

          {/* Random stuff explaining */}
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <FlightTakeoffIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Search Flights
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Easily search for flights based on your preferences and requirements.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <FlightTakeoffIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      View Your Flights
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Keep track of all your booked flights in one place.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <FlightTakeoffIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Live Flight Map
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Visualize live flight paths and monitor selected flights in real-time.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <FlightTakeoffIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Notifications
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Receive timely updates and notifications about your flights.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Login In Buttons */}
          <Box sx={{ mt: 6, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/register"
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
          </Box>
        </Grid>

        {/* Right Side: Illustration or Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="static/images/landing-page.jpg"
            alt="Flight Illustration"
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: 3,
              objectFit: 'cover',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthModule;
