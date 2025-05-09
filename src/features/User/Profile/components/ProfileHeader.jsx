// src/features/User/Profile/components/ProfileHeader.jsx
import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';

const ProfileHeader = ({ user }) => {
  // Obtener las iniciales del nombre del usuario
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: 'primary.main',
            fontSize: '2rem',
            mr: 3
          }}
        >
          {getInitials(user?.name)}
        </Avatar>
        <Box>
          <Typography variant="h5" gutterBottom>
            {user?.name || 'Usuario'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.email || 'usuario@ejemplo.com'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Miembro desde: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileHeader;