import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { 
  Avatar, 
  Box, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  Typography, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Person as PersonIcon, 
  AccountCircle as AccountCircleIcon,
  CalendarToday as CalendarIcon,
  Update as UpdateIcon
} from '@mui/icons-material';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4">Loading profile...</Typography>
        </Box>
      </Container>
    );
  }

  const { attributes, createdAt, updatedAt } = user;
  const { email, firstName, lastName, username } = attributes;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar 
          sx={{ 
            width: 120, 
            height: 120, 
            fontSize: '3rem',
            bgcolor: 'primary.main',
            mb: 2
          }}
        >
          {getInitials(firstName, lastName)}
        </Avatar>
        <Typography variant="h4" gutterBottom>
          {firstName} {lastName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          @{username}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Full Name" secondary={`${firstName} ${lastName}`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Username" secondary={username} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Account Created" secondary={formatDate(createdAt)} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <UpdateIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Last Updated" secondary={formatDate(updatedAt)} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

