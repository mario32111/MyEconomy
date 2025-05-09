// src/features/Auth/components/SignUp/SignUpForm.jsx
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../../shared/routes/routes';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    paternalLastName: '',
    maternalLastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validaciones básicas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', formData);
      
      if (response.data.success) {
        // Guardar token en localStorage o en un contexto de autenticación
        localStorage.setItem('token', response.data.data.token);
        
        // Redirigir al dashboard o a completar perfil
        navigate(ROUTES.DASHBOARD);
      } else {
        setError(response.data.error?.message || 'Error al registrar usuario');
      }
    } catch (err) {
      console.error('Error en registro:', err);
      setError(
        err.response?.data?.error?.message || 
        'Error al conectar con el servidor. Intente nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Typography variant="h6" gutterBottom>
        Información básica para crear tu cuenta
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Segundo nombre (opcional)"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Apellido paterno"
            name="paternalLastName"
            value={formData.paternalLastName}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apellido materno"
            name="maternalLastName"
            value={formData.maternalLastName}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
          />
        </Grid>
      </Grid>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Registrarse'}
      </Button>
      
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Typography variant="body2">
            ¿Ya tienes una cuenta?{' '}
            <Button 
              color="primary" 
              onClick={() => navigate(ROUTES.AUTH.LOGIN)}
              sx={{ p: 0, minWidth: 'auto', textTransform: 'none' }}
            >
              Inicia sesión
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpForm;