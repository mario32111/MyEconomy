// src/shared/components/Navigation/NavBarComponents/NotificationsMenu.jsx
import React, { useState, useEffect } from 'react';
import { 
  Menu, MenuItem, Typography, Box, Divider, Badge, IconButton,
  Button
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
// Importar función individual
import { isProfileComplete } from '../../../services/profileService';

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [profileComplete, setProfileComplete] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el perfil está completo cuando el usuario está autenticado
    const checkProfileCompletion = async () => {
      if (user?.id) {
        try {
          const complete = await isProfileComplete(user.id);
          setProfileComplete(complete);
          
          // Si el perfil no está completo, agregar una notificación
          if (!complete) {
            setNotifications(prev => {
              // Verificar si ya existe la notificación
              const exists = prev.some(n => n.id === 'profile-incomplete');
              if (!exists) {
                return [
                  {
                    id: 'profile-incomplete',
                    title: 'Completa tu perfil financiero',
                    message: 'Personaliza tu experiencia completando tu información financiera.',
                    action: '/profile',
                    priority: 'high'
                  },
                  ...prev
                ];
              }
              return prev;
            });
          }
        } catch (error) {
          console.error("Error al verificar perfil:", error);
        }
      }
    };
    
    if (user) {
      checkProfileCompletion();
    }
    
  }, [user]);

  // Cargar notificaciones de ejemplo solo una vez al montar el componente
  useEffect(() => {
    setNotifications(prev => [
      ...prev,
      { id: 1, title: 'Nueva funcionalidad disponible', message: 'Ahora puedes crear metas de ahorro personalizadas.' },
      { id: 2, title: 'Recordatorio de pago', message: 'Tienes un pago programado para mañana.' },
      { id: 3, title: 'Meta alcanzada', message: '¡Felicitaciones! Has alcanzado tu meta de ahorro mensual.' }
    ]);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification) => {
    handleClose();
    if (notification.action) {
      navigate(notification.action);
    }
  };

  // Filtrar notificaciones duplicadas por ID
  const uniqueNotifications = notifications.filter((notification, index, self) =>
    index === self.findIndex((n) => n.id === notification.id)
  );

  return (
    <>
    <IconButton 
      color="inherit" 
      onClick={handleClick}
      size="large"
    >
      <Badge badgeContent={uniqueNotifications.length} color="error">
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
      
      {uniqueNotifications.length === 0 ? (
        <MenuItem>
          <Box sx={{ py: 1 }}>
            <Typography variant="body2" color="text.secondary">
              No tienes notificaciones nuevas
            </Typography>
          </Box>
        </MenuItem>
      ) : (
        uniqueNotifications.map((notification) => (
          <MenuItem 
            key={notification.id} 
            onClick={() => handleNotificationClick(notification)}
            sx={{
              bgcolor: notification.priority === 'high' ? 'rgba(255, 0, 0, 0.05)' : 'inherit',
              borderLeft: notification.priority === 'high' ? '4px solid #f44336' : 'none'
            }}
          >
            <Box sx={{ py: 1 }}>
              <Typography variant="subtitle2">{notification.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {notification.message}
              </Typography>
              {notification.id === 'profile-incomplete' && (
                <Button 
                  variant="outlined" 
                  size="small" 
                  color="primary" 
                  sx={{ mt: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/profile');
                    handleClose();
                  }}
                >
                  Completar perfil
                </Button>
              )}
            </Box>
          </MenuItem>
        ))
      )}
      
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