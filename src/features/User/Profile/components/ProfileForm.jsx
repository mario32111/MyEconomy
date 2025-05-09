// src/features/User/Profile/components/ProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, TextField, Grid, 
  FormControl, InputLabel, Select, MenuItem, Alert, Snackbar,
  IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '../../../../shared/hooks/useAuth';

const ProfileForm = ({ user, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
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
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  
  // Obtener el usuario y la función para actualizar del contexto de autenticación
  const { user: authUser, updateUserData } = useAuth();

  // Inicializar formData con los datos del usuario
  useEffect(() => {
    console.log("User data in ProfileForm:", { user, authUser });
    
    // Usar authUser si está disponible, de lo contrario usar user del prop
    const userData = authUser || user;
    
    if (userData) {
      setFormData({
        name: userData.name || '',
        monthlyIncome: userData.monthlyIncome || '',
        currentSavings: userData.currentSavings || '',
        monthlyExpenses: userData.monthlyExpenses || '',
        primaryGoal: userData.primaryGoal || '',
        timeframe: userData.timeframe || '',
        savingsGoal: userData.savingsGoal || '',
        riskTolerance: userData.riskTolerance || '',
        budgetType: userData.budgetType || '',
        notificationPreference: userData.notificationPreference || ''
      });
      setOriginalData({
        name: userData.name || '',
        monthlyIncome: userData.monthlyIncome || '',
        currentSavings: userData.currentSavings || '',
        monthlyExpenses: userData.monthlyExpenses || '',
        primaryGoal: userData.primaryGoal || '',
        timeframe: userData.timeframe || '',
        savingsGoal: userData.savingsGoal || '',
        riskTolerance: userData.riskTolerance || '',
        budgetType: userData.budgetType || '',
        notificationPreference: userData.notificationPreference || ''
      });
    }
  }, [user, authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setOriginalData({...formData});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({...originalData});
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      // Actualizar los datos del usuario
      if (updateUserData) {
        const result = await updateUserData(formData);
        
        if (!result.success) {
          throw new Error(result.error?.message || 'Error al actualizar el perfil');
        }
        
        // Notificar al componente padre
        if (onProfileUpdate) {
          onProfileUpdate(result.data);
        }
      } else {
        throw new Error('No se puede actualizar el perfil: función no disponible');
      }
      
      setAlert({
        open: true,
        message: 'Perfil actualizado correctamente',
        severity: 'success'
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setAlert({
        open: true,
        message: error.message || 'Error al actualizar el perfil',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert(prev => ({ ...prev, open: false }));
  };

  // Función para renderizar los campos en modo lectura o edición
  const renderField = (label, name, value, type = 'text') => {
    if (isEditing) {
      return (
        <TextField
          fullWidth
          label={label}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          InputProps={type === 'number' ? { startAdornment: '$' } : undefined}
        />
      );
    } else {
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body1">
            {type === 'number' && formData[name] ? `$${formData[name]}` : formData[name] || 'No especificado'}
          </Typography>
        </Box>
      );
    }
  };

  // Función para renderizar los campos de selección
  const renderSelectField = (label, name, options) => {
    if (isEditing) {
      return (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            name={name}
            value={formData[name]}
            onChange={handleChange}
            label={label}
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else {
      const selectedOption = options.find(option => option.value === formData[name]);
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body1">
            {selectedOption ? selectedOption.label : 'No especificado'}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Información Personal
        </Typography>
        
        {isEditing ? (
          <Box>
            <Tooltip title="Guardar cambios">
              <IconButton 
                color="primary" 
                onClick={handleSubmit}
                disabled={loading}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar">
              <IconButton 
                color="error" 
                onClick={handleCancel}
                disabled={loading}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Tooltip title="Editar perfil">
            <IconButton 
              color="primary" 
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      
      <Box component={isEditing ? "form" : "div"} onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {renderField('Nombre completo', 'name', formData.name)}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {renderField('Ingreso mensual', 'monthlyIncome', formData.monthlyIncome, 'number')}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {renderField('Gastos mensuales', 'monthlyExpenses', formData.monthlyExpenses, 'number')}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {renderField('Ahorros actuales', 'currentSavings', formData.currentSavings, 'number')}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {renderField('Meta de ahorro', 'savingsGoal', formData.savingsGoal, 'number')}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {renderSelectField('Objetivo principal', 'primaryGoal', [
              { value: 'savings', label: 'Ahorrar dinero' },
              { value: 'debt', label: 'Pagar deudas' },
              { value: 'investment', label: 'Invertir' },
              { value: 'retirement', label: 'Planificar jubilación' },
              { value: 'education', label: 'Educación financiera' }
            ])}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {renderSelectField('Plazo de tiempo', 'timeframe', [
              { value: 'short', label: 'Corto plazo (menos de 1 año)' },
              { value: 'medium', label: 'Mediano plazo (1-5 años)' },
              { value: 'long', label: 'Largo plazo (más de 5 años)' }
            ])}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {renderSelectField('Tolerancia al riesgo', 'riskTolerance', [
              { value: 'low', label: 'Baja' },
              { value: 'medium', label: 'Media' },
              { value: 'high', label: 'Alta' }
            ])}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {renderSelectField('Tipo de presupuesto', 'budgetType', [
              { value: '50-30-20', label: '50/30/20 (Necesidades/Deseos/Ahorros)' },
              { value: 'zero-based', label: 'Presupuesto base cero' },
              { value: 'envelope', label: 'Sistema de sobres' },
              { value: 'pay-yourself', label: 'Págate primero' }
            ])}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            {renderSelectField('Preferencia de notificaciones', 'notificationPreference', [
              { value: 'email', label: 'Email' },
              { value: 'push', label: 'Notificaciones push' },
              { value: 'both', label: 'Ambos' },
              { value: 'none', label: 'Ninguno' }
            ])}
          </Grid>
        </Grid>
      </Box>
      
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity} 
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ProfileForm;