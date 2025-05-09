// src/shared/components/Navigation/NavBarComponents/NotificationsMenu.jsx
import React from 'react';
import { 
  Menu, MenuItem, Typography, Box, Divider, Badge, IconButton 
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Notificaciones de ejemplo
const notifications = [
  { id: 1, title: 'Nueva funcionalidad disponible', message: 'Ahora puedes crear metas de ahorro personalizadas.' },
  { id: 2, title: 'Recordatorio de pago', message: 'Tienes un pago programado para mañana.' },
  { id: 3, title: 'Meta alcanzada', message: '¡Felicitaciones! Has alcanzado tu meta de ahorro mensual.' }
];

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton 
        color="inherit" 
        onClick={handleClick}
        size="large"
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Notificaciones</Typography>
        </Box>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleClose}>
            <Box sx={{ py: 1 }}>
              <Typography variant="subtitle2">{notification.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {notification.message}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleClose}>
          <Typography color="primary" align="center" sx={{ width: '100%' }}>
            Ver todas las notificaciones
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationsMenu;