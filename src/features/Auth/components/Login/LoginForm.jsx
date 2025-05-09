import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Link, Alert, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Cambiar la importación para usar la implementación de Supabase
import { useAuth } from '../../../../shared/hooks/useAuth';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpiar error cuando el usuario empieza a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      
      console.log('Intentando iniciar sesión con:', formData.email);
      
      // La función login de useAuth.js devuelve { data, error }
      const result = await login(formData.email, formData.password);
      console.log('Resultado de login:', result);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completo:', error);
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {error}
        </Alert>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Correo Electrónico"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
        error={!!error}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
        error={!!error}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Iniciar Sesión'
        )}
      </Button>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link component={RouterLink} to="/forgot-password" variant="body2">
          ¿Olvidaste tu contraseña?
        </Link>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Link component={RouterLink} to="/signup" variant="body2">
          ¿No tienes cuenta? Regístrate
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;