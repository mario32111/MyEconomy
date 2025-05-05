import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const MobileMenu = ({ open, onClose, navigationItems, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 280 }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">MyEconomy</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          (!item.auth || (item.auth && isAuthenticated)) && (
            <ListItem 
              button 
              key={item.title}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          )
        ))}
      </List>
    </Drawer>
  );
};