import React from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Typography
} from '@mui/material';
import {
  Person,
  Settings,
  Help,
  ExitToApp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

export const UserMenu = ({ anchorEl, onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: { width: 220, mt: 1.5 }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ width: 40, height: 40, mr: 1 }}>U</Avatar>
          <Box>
            <Typography variant="subtitle1">Usuario Demo</Typography>
            <Typography variant="body2" color="text.secondary">
              usuario@demo.com
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <MenuItem onClick={() => handleMenuClick(ROUTES.PROFILE)}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        <ListItemText>Mi Perfil</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick(ROUTES.SETTINGS)}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText>Configuración</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick(ROUTES.HELP)}>
        <ListItemIcon>
          <Help fontSize="small" />
        </ListItemIcon>
        <ListItemText>Ayuda</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onLogout}>
        <ListItemIcon>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        <ListItemText>Cerrar Sesión</ListItemText>
      </MenuItem>
    </Menu>
  );
};