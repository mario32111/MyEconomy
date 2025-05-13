// src/features/User/Profile/components/FinancialProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  MenuItem, 
  InputAdornment,
  Alert,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import { useAuthContext } from '../../../../shared/contexts/AuthContext';
import profileService from '../../../../shared/services/profileService';

const FinancialProfileForm = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState({
    monthlyIncome: '',
    currentSavings: '',
    monthlyExpenses: '',
    primaryGoal: '',
    timeframe: '',
    savingsGoal: '',
    riskTolerance: '',
    budgetType: '',
    notificationPreference: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;
      
      try {
        const response = await profileService.getProfile(user.id);
        if (response.success && response.data.profile) {
          const profile = response.data.profile;
          setProfileData({
            monthlyIncome: profile.monthly_income || '',
            currentSavings: profile.current_savings || '',
            monthlyExpenses: profile.monthly_expenses || '',
            primaryGoal: profile.primary_goal || '',
            timeframe: profile.timeframe || '',
            savingsGoal: profile.savings_goal || '',
            riskTolerance: profile.risk_tolerance || '',
            budgetType: profile.budget_type || '',
            notificationPreference: profile.notification_preference || ''
          });
        }
      } catch (err) {
        console.error('Error al cargar perfil:', err);
        setError('No se pudo cargar tu perfil. Intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const response = await profileService.updateFinancialProfile(user.id, profileData);
      if (response.success) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(response.error?.message || 'Error al guardar el perfil');
      }
    } catch (err) {
      console.error('Error al guardar perfil:', err);
      setError(err.message || 'No se pudo guardar tu perfil. Intenta de nuevo más tarde.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Completa tu perfil financiero
      </Typography>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        Esta información nos ayudará a personalizar tu experiencia y ofrecerte recomendaciones más precisas.
        Todos los campos son opcionales, pero te recomendamos completarlos para obtener el máximo beneficio.
      </Typography>

      {success && (
        <Alert severity="success" sx={{ my: 2 }}>
          ¡Tu perfil ha sido actualizado correctamente!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Información financiera básica
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <TextField
          fullWidth
          margin="normal"
          name="monthlyIncome"
          label="¿Cuál es tu ingreso mensual?"
          type="number"
          value={profileData.monthlyIncome}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        
        <TextField
          fullWidth
          margin="normal"
          name="currentSavings"
          label="¿Cuánto tienes ahorrado actualmente?"
          type="number"
          value={profileData.currentSavings}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        
        <TextField
          fullWidth
          margin="normal"
          name="monthlyExpenses"
          label="¿Cuál es tu gasto mensual aproximado?"
          type="number"
          value={profileData.monthlyExpenses}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Objetivos financieros
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <TextField
          fullWidth
          margin="normal"
          name="primaryGoal"
          label="¿Cuál es tu principal objetivo financiero?"
          select
          value={profileData.primaryGoal}
          onChange={handleChange}
        >
          <MenuItem value="">Selecciona una opción</MenuItem>
          <MenuItem value="Ahorrar para el retiro">Ahorrar para el retiro</MenuItem>
          <MenuItem value="Comprar una casa">Comprar una casa</MenuItem>
          <MenuItem value="Crear un fondo de emergencia">Crear un fondo de emergencia</MenuItem>
          <MenuItem value="Invertir en la bolsa">Invertir en la bolsa</MenuItem>
          <MenuItem value="Pagar deudas">Pagar deudas</MenuItem>
          <MenuItem value="Otro">Otro</MenuItem>
        </TextField>
        
        <TextField
          fullWidth
          margin="normal"
          name="timeframe"
          label="¿En cuánto tiempo quieres alcanzar tu objetivo?"
          select
          value={profileData.timeframe}
          onChange={handleChange}
        >
          <MenuItem value="">Selecciona una opción</MenuItem>
          <MenuItem value="Menos de 1 año">Menos de 1 año</MenuItem>
          <MenuItem value="1-3 años">1-3 años</MenuItem>
          <MenuItem value="3-5 años">3-5 años</MenuItem>
          <MenuItem value="5-10 años">5-10 años</MenuItem>
          <MenuItem value="Más de 10 años">Más de 10 años</MenuItem>
        </TextField>
        
        <TextField
          fullWidth
          margin="normal"
          name="savingsGoal"
          label="¿Cuánto quieres ahorrar mensualmente?"
          type="number"
          value={profileData.savingsGoal}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Preferencias
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <TextField
          fullWidth
          margin="normal"
          name="riskTolerance"
          label="¿Cuál es tu tolerancia al riesgo?"
          select
          value={profileData.riskTolerance}
          onChange={handleChange}
        >
          <MenuItem value="">Selecciona una opción</MenuItem>
          <MenuItem value="Conservador">Conservador</MenuItem>
          <MenuItem value="Moderado">Moderado</MenuItem>
          <MenuItem value="Agresivo">Agresivo</MenuItem>
        </TextField>
        
        <TextField
          fullWidth
          margin="normal"
          name="budgetType"
          label="¿Qué tipo de presupuesto prefieres?"
          select
          value={profileData.budgetType}
          onChange={handleChange}
        >
          <MenuItem value="">Selecciona una opción</MenuItem>
          <MenuItem value="Presupuesto detallado">Presupuesto detallado</MenuItem>
          <MenuItem value="Presupuesto 50/30/20">Presupuesto 50/30/20</MenuItem>
          <MenuItem value="Presupuesto simple">Presupuesto simple</MenuItem>
        </TextField>
        
        <TextField
          fullWidth
          margin="normal"
          name="notificationPreference"
          label="¿Cómo prefieres recibir notificaciones?"
          select
          value={profileData.notificationPreference}
          onChange={handleChange}
        >
          <MenuItem value="">Selecciona una opción</MenuItem>
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="Push notifications">Push notifications</MenuItem>
          <MenuItem value="SMS">SMS</MenuItem>
          <MenuItem value="Todas las anteriores">Todas las anteriores</MenuItem>
        </TextField>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={saving}
            sx={{ minWidth: 150 }}
          >
            {saving ? <CircularProgress size={24} /> : 'Guardar cambios'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FinancialProfileForm;