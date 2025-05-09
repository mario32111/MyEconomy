// src/shared/components/Navigation/NavBarComponents/ProfileMenu.jsx
import React, { useEffect, useState } from 'react';
import { 
  Menu, MenuItem, ListItemIcon, ListItemText, Divider, 
  Avatar, Box, Typography, IconButton 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userInfo, setUserInfo] = useState({
    name: 'Usuario',
    email: 'usuario@ejemplo.com',
    initial: 'U'
  });

  // Extraer la información del usuario de manera segura
  useEffect(() => {
    if (user) {
      // Intentar obtener el email de diferentes ubicaciones posibles
      const email = user.email || 
        (user.user_metadata && user.user_metadata.email) || 
        (user.data && user.data.email) || 
        'usuario@ejemplo.com';
      
      // Intentar obtener el nombre de diferentes ubicaciones posibles
      const name = user.name || 
        (user.user_metadata && user.user_metadata.name) || 
        (user.data && user.data.name) || 
        email.split('@')[0] || 
        'Usuario';
      
      // Obtener la inicial para el avatar
      const initial = (name.charAt(0) || email.charAt(0) || 'U').toUpperCase();
      
      setUserInfo({ name, email, initial });
      
      // Para depuración
      console.log("ProfileMenu - User info:", { user, extracted: { name, email, initial } });
    }
  }, [user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate('/');
  };

  return (
    <>
      <IconButton 
        color="inherit" 
        onClick={handleClick}
        size="large"
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
          {userInfo.initial}
        </Avatar>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 250 }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 1, bgcolor: 'primary.main' }}>
              {userInfo.initial}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">
                {userInfo.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userInfo.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mi Perfil" />
        </MenuItem>
        <MenuItem component={RouterLink} to="/settings" onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Ajustes" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;