// src/features/User/Profile/components/ProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, 
  FormControl, InputLabel, Select, MenuItem, Alert, Snackbar, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAuth } from '../../../../shared/hooks/useAuth';
import { updateProfile } from '../../../../shared/services/profileService';

// Import global UI components
import Card from '../../../../shared/components/UI/Card/Card';
import Input from '../../../../shared/components/UI/Input/Input';
import Button from '../../../../shared/components/UI/Button/Button';

// Safe formatCurrency function that doesn't rely on APP_CONFIG
const safeFormatCurrency = (amount, currency = 'MXN') => {
  if (amount === null || amount === undefined || amount === '') {
    return '$0.00';
  }

  try {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '$' + parseFloat(amount).toFixed(2);
  }
};

const ProfileForm = ({ user, onProfileUpdate }) => {
  const navigate = useNavigate();
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

  // Obtener el usuario del contexto de autenticación
  const { user: authUser, isAuthenticated } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    // Check after a short delay to avoid flash during initial load
    const timer = setTimeout(() => {
      if (!isAuthenticated() && !loading) {
        navigate('/login', { replace: true });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, loading]);

  // Inicializar formData con los datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        monthlyIncome: user.monthlyIncome || '',
        currentSavings: user.currentSavings || '',
        monthlyExpenses: user.monthlyExpenses || '',
        primaryGoal: user.primaryGoal || '',
        timeframe: user.timeframe || '',
        savingsGoal: user.savingsGoal || '',
        riskTolerance: user.riskTolerance || '',
        budgetType: user.budgetType || '',
        notificationPreference: user.notificationPreference || ''
      });
      setOriginalData({
        name: user.name || '',
        monthlyIncome: user.monthlyIncome || '',
        currentSavings: user.currentSavings || '',
        monthlyExpenses: user.monthlyExpenses || '',
        primaryGoal: user.primaryGoal || '',
        timeframe: user.timeframe || '',
        savingsGoal: user.savingsGoal || '',
        riskTolerance: user.riskTolerance || '',
        budgetType: user.budgetType || '',
        notificationPreference: user.notificationPreference || ''
      });
    }
  }, [user]);

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
      const userId = authUser?.id || user?.id;
      if (!userId) {
        throw new Error('No se pudo identificar al usuario');
      }

      // Actualizar perfil usando la función
      const result = await updateProfile(userId, formData);

      if (!result.success) {
        throw new Error(result.error?.message || 'Error al actualizar el perfil');
      }

      // Notificar al componente padre si existe
      if (onProfileUpdate) {
        onProfileUpdate(formData);
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
        <Input
          label={label}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          startAdornment={type === 'number' ? '$' : undefined}
          fullWidth
        />
      );
    } else {
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body1">
            {type === 'number' && formData[name] ? safeFormatCurrency(formData[name]) : formData[name] || 'No especificado'}
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

  // If not authenticated, show loading
  if (!isAuthenticated() && !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Cargando...
        </Typography>
      </Box>
    );
  }

  // Acciones para la tarjeta
  const cardActions = (
    <Box>
      {isEditing ? (
        <>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}
            loading={loading}
            startIcon={<SaveIcon />}
            size="small"
            sx={{ mr: 1 }}
          >
            Guardar
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleCancel}
            disabled={loading}
            startIcon={<CancelIcon />}
            size="small"
          >
            Cancelar
          </Button>
        </>
      ) : (
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleEdit}
          startIcon={<EditIcon />}
          size="small"
        >
          Editar
        </Button>
      )}
    </Box>
  );

  return (
    <Card
      title="Información Financiera"
      elevation={2}
      rounded
      actions={cardActions}
    >
      <Box component={isEditing ? "form" : "div"} onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
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
    </Card>
  );
};

export default ProfileForm;
