// src/features/User/Profile/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Tab, Tabs, Alert } from '@mui/material';
import { useAuth } from '../../../shared/hooks/useAuth';
import ProfileHeader from './components/ProfileHeader';
import ProfileForm from './components/ProfileForm';
import SecuritySettings from './components/SecuritySettings';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState(null);

  // Inicializar los datos del perfil con los del usuario autenticado
  useEffect(() => {
    if (user) {
      setProfileData(user);
      console.log("User data loaded in ProfilePage:", user);
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileUpdate = (updatedUserData) => {
    setProfileData(updatedUserData);
    console.log("Profile updated:", updatedUserData);
  };

  // Si no hay usuario autenticado, mostrar mensaje
  if (!isAuthenticated || !user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          Debes iniciar sesión para ver tu perfil.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mi Perfil
      </Typography>
      
      <ProfileHeader user={profileData || user} />
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          aria-label="profile tabs"
        >
          <Tab label="Información Personal" />
          <Tab label="Seguridad" />
        </Tabs>
      </Box>
      
      {activeTab === 0 && (
        <ProfileForm user={profileData || user} onProfileUpdate={handleProfileUpdate} />
      )}
      
      {activeTab === 1 && (
        <SecuritySettings />
      )}
    </Container>
  );
};

export default ProfilePage;