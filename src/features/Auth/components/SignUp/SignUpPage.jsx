import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  InputAdornment, 
  IconButton,
  Stack,
  Divider,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  Email, 
  Lock, 
  Person,
  Visibility, 
  VisibilityOff,
  Google,
  Facebook,
  Phone,
  CheckCircleOutline 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '../../../../shared/components/UI';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../../../core/constants/routes';

const steps = ['Información básica', 'Datos de contacto', 'Verificación'];

const SignUpPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    acceptTerms: false
  });
  const { signup, isLoading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep < steps.length - 1) {
      handleNext();
      return;
    }
    try {
      await signup(formData);
    } catch (err) {
      // Error manejado en el hook
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Input
              name="name"
              label="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
              startAdornment={
                <InputAdornment position="start">
                  <Person color="primary" />
                </InputAdornment>
              }
            />
            <Input
              name="email"
              label="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              startAdornment={
                <InputAdornment position="start">
                  <Email color="primary" />
                </InputAdornment>
              }
            />
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={3}>
            <Input
              name="password"
              label="Contraseña"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              required
              startAdornment={
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Input
              name="confirmPassword"
              label="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              required
              startAdornment={
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              }
            />
            <Input
              name="phone"
              label="Teléfono (opcional)"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              startAdornment={
                <InputAdornment position="start">
                  <Phone color="primary" />
                </InputAdornment>
              }
            />
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={3} alignItems="center">
            <CheckCircleOutline sx={{ fontSize: 60, color: 'success.main' }} />
            <Typography variant="h6" align="center">
              ¡Casi listo!
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
              Revisa tu información antes de crear tu cuenta
            </Typography>
            <Box sx={{ width: '100%', mt: 2 }}>
              <Typography variant="subtitle2">Nombre: {formData.name}</Typography>
              <Typography variant="subtitle2">Email: {formData.email}</Typography>
              <Typography variant="subtitle2">Teléfono: {formData.phone || 'No especificado'}</Typography>
            </Box>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 4,
        width: '100%'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent'
          }}
        >
          Crear cuenta en MyEconomy
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Typography 
              color="error" 
              align="center" 
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {getStepContent(activeStep)}
          </motion.div>
        </AnimatePresence>

        <Stack spacing={2} sx={{ mt: 4 }}>
          <Stack direction="row" spacing={2}>
            {activeStep > 0 && (
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ flex: 1 }}
              >
                Atrás
              </Button>
            )}
            <Button
              type="submit"
              sx={{ flex: 1 }}
              disabled={isLoading}
            >
              {activeStep === steps.length - 1 
                ? (isLoading ? 'Creando cuenta...' : 'Crear cuenta')
                : 'Siguiente'}
            </Button>
          </Stack>

          {activeStep === 0 && (
            <>
              <Divider sx={{ my: 2 }}>o regístrate con</Divider>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Google />}
                  onClick={() => {/* Implementar registro con Google */}}
                >
                  Google
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Facebook />}
                  onClick={() => {/* Implementar registro con Facebook */}}
                >
                  Facebook
                </Button>
              </Stack>
            </>
          )}

          <Stack 
            direction="row" 
            justifyContent="center" 
            sx={{ mt: 2 }}
          >
            <Typography variant="body2" color="textSecondary">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to={ROUTES.AUTH.LOGIN} 
                style={{ textDecoration: 'none', color: '#2196F3' }}
              >
                Inicia sesión
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </motion.div>
    </Box>
  );
};

export default SignUpPage;