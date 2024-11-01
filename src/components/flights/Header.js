import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Flight as FlightIcon,
  FlightTakeoff as FlightTakeoffIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Header = ({ title = 'Flights App' }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleUserMenuClose();
    navigate('/auth');
  };

  const navLinks = [
    {
      title: 'Flights',
      path: '/flights',
      icon: <FlightIcon />,
    },
    {
      title: 'My Flights',
      path: '/my-flights',
      icon: <FlightTakeoffIcon />,
    },
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {navLinks.map((item) => (
          <ListItem button key={item.title} component={RouterLink} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        {user ? (
          <>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={RouterLink} to="/auth">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Login/Register" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Mobile view: Hamburger menu */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* App Logo and Title */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: isMobile ? 1 : 0,
            }}
          >
            {/* Replace with your logo if available */}
            <FlightIcon sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h6" component="div" noWrap>
              {title}
            </Typography>
          </Box>

          {/* Desktop view: Navigation buttons */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
              {navLinks.map((item) => (
                <Button
                  key={item.title}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{ textTransform: 'none', mr: 2 }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          )}

          {/* User Avatar and Menu */}
          {user ? (
            <Box sx={{ ml: 'auto' }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleUserMenuOpen}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openUserMenu ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openUserMenu ? 'true' : undefined}
                >
                  <Avatar alt={user.get('firstName')} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openUserMenu}
                onClose={handleUserMenuClose}
                onClick={handleUserMenuClose}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    mt: 1.5,
                    minWidth: 150,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem component={RouterLink} to="/profile">
                  <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            !isMobile && (
              <Button
                color="inherit"
                component={RouterLink}
                to="/auth"
                startIcon={<AccountCircleIcon />}
                sx={{ textTransform: 'none', ml: 2 }}
              >
                Login/Register
              </Button>
            )
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;
