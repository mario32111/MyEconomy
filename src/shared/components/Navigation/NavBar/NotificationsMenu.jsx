import React from 'react';
import {
  Menu,
  MenuItem,
  Typography,
  Box,
  IconButton,
  Divider
} from '@mui/material';
import { Close } from '@mui/icons-material';

export const NotificationsMenu = ({ anchorEl, onClose }) => {
  const notifications = [
    {
      id: 1,
      title: 'Nueva funcionalidad disponible',
      message: 'Ahora puedes crear metas de ahorro personalizadas.',
      time: '2 min'
    },
    {
      id: 2,
      title: 'Recordatorio de pago',
      message: 'Tienes un pago programado para mañana.',
      time: '1 hora'
    },
    {
      id: 3,
      title: 'Meta alcanzada',
      message: '¡Felicitaciones! Has alcanzado tu meta de ahorro mensual.',
      time: '2 horas'
    }
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          maxHeight: 400,
          mt: 1.5
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Notificaciones</Typography>
        <IconButton size="small" onClick={onClose}>
          <Close fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      {notifications.map((notification) => (
        <MenuItem key={notification.id} onClick={onClose}>
          <Box sx={{ py: 1 }}>
            <Typography variant="subtitle2">{notification.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {notification.message}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              hace {notification.time}
            </Typography>
          </Box>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={onClose}>
        <Typography color="primary" align="center" sx={{ width: '100%' }}>
          Ver todas las notificaciones
        </Typography>
      </MenuItem>
    </Menu>
  );
};