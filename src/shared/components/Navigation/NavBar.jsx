import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, 
  Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Gastos', icon: <AccountBalanceWalletIcon />, path: '/expenses' },
    { text: 'Análisis', icon: <BarChartIcon />, path: '/analysis' },
    { text: 'Educación', icon: <SchoolIcon />, path: '/education' },
    { text: 'Ayuda', icon: <HelpIcon />, path: '/help' },
  ];

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {user && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 1,
              '&:hover': {
                color: 'primary.dark',
              }
            }}
          >
            MyEconomy
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {!user ? (
              <>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/login"
                  variant={location.pathname === '/login' ? 'contained' : 'text'}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/signup"
                  variant={location.pathname === '/signup' ? 'contained' : 'outlined'}
                >
                  Registrarse
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/dashboard"
                  variant={location.pathname.includes('/dashboard') ? 'contained' : 'text'}
                >
                  Dashboard
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={logout}
                >
                  Cerrar Sesión
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;