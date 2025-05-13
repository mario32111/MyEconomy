// src/features/User/Profile/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import ProfileHeader from './components/ProfileHeader';
import ProfileForm from './components/ProfileForm';
import SecuritySettings from './components/SecuritySettings';
import { useAuth } from '../../../shared/hooks/useAuth';
// Importar funciones individuales en lugar del servicio completo
import { getProfile } from '../../../shared/services/profileService';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;
      
      try {
        const response = await getProfile(user.id);
        if (response.success) {
          setProfileData(response.data);
        } else {
          setError('No se pudo cargar la información del perfil');
        }
      } catch (err) {
        console.error('Error al cargar perfil:', err);
        setError('Error al cargar la información del perfil');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleProfileUpdate = (updatedData) => {
    setProfileData(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  // Preparar datos de usuario para los componentes
  const userData = {
    id: user?.id,
    email: user?.email,
    name: profileData ? `${profileData.firstName || ''} ${profileData.paternalLastName || ''}`.trim() : user?.email?.split('@')[0] || 'Usuario',
    createdAt: user?.createdAt || new Date(),
    ...profileData
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={1} sx={{ p: 3, mb: 3, textAlign: 'center' }}>
          <Typography variant="h6">Debes iniciar sesión para ver tu perfil</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mi Perfil
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Paper elevation={1} sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Paper>
      ) : (
        <>
          <ProfileHeader user={userData} />
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProfileForm 
                user={userData} 
                onProfileUpdate={handleProfileUpdate} 
              />
            </Grid>
            
            <Grid item xs={12}>
              <SecuritySettings />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;