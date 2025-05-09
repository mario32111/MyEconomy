// src/features/Auth/components/Register/RegisterWizard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import QuestionnaireStep from './QuestionnaireStep';
import authService from '../../../../shared/services/authService';

const steps = ['Información básica', 'Perfil financiero', 'Objetivos', 'Preferencias'];

const RegisterWizard = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    // Paso 1: Información básica
    firstName: '',
    middleName: '',
    paternalLastName: '',
    maternalLastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Paso 2: Perfil financiero (opcional)
    monthlyIncome: '',
    currentSavings: '',
    monthlyExpenses: '',
    
    // Paso 3: Objetivos (opcional)
    primaryGoal: '',
    timeframe: '',
    savingsGoal: '',
    
    // Paso 4: Preferencias (opcional)
    riskTolerance: '',
    budgetType: '',
    notificationPreference: ''
  });

  const questionnaireSteps = [
    {
      title: 'Información básica',
      fields: [
        {
          name: 'firstName',
          label: 'Nombre',
          type: 'text',
          required: true
        },
        {
          name: 'middleName',
          label: 'Segundo nombre (opcional)',
          type: 'text',
          required: false
        },
        {
          name: 'paternalLastName',
          label: 'Apellido paterno',
          type: 'text',
          required: true
        },
        {
          name: 'maternalLastName',
          label: 'Apellido materno (opcional)',
          type: 'text',
          required: false
        },
        {
          name: 'email',
          label: 'Correo electrónico',
          type: 'email',
          required: true
        },
        {
          name: 'password',
          label: 'Contraseña',
          type: 'password',
          required: true
        },
        {
          name: 'confirmPassword',
          label: 'Confirmar contraseña',
          type: 'password',
          required: true
        }
      ]
    },
    {
      title: 'Perfil financiero',
      fields: [
        {
          name: 'monthlyIncome',
          label: '¿Cuál es tu ingreso mensual?',
          type: 'number',
          prefix: '$',
          required: false
        },
        {
          name: 'currentSavings',
          label: '¿Cuánto tienes ahorrado actualmente?',
          type: 'number',
          prefix: '$',
          required: false
        },
        {
          name: 'monthlyExpenses',
          label: '¿Cuál es tu gasto mensual aproximado?',
          type: 'number',
          prefix: '$',
          required: false
        }
      ]
    },
    {
      title: 'Objetivos financieros',
      fields: [
        {
          name: 'primaryGoal',
          label: '¿Cuál es tu principal objetivo financiero?',
          type: 'select',
          options: [
            'Ahorrar para el retiro',
            'Comprar una casa',
            'Crear un fondo de emergencia',
            'Invertir en la bolsa',
            'Pagar deudas',
            'Otro'
          ],
          required: false
        },
        {
          name: 'timeframe',
          label: '¿En cuánto tiempo quieres alcanzar tu objetivo?',
          type: 'select',
          options: [
            'Menos de 1 año',
            '1-3 años',
            '3-5 años',
            '5-10 años',
            'Más de 10 años'
          ],
          required: false
        },
        {
          name: 'savingsGoal',
          label: '¿Cuánto quieres ahorrar mensualmente?',
          type: 'number',
          prefix: '$',
          required: false
        }
      ]
    },
    {
      title: 'Preferencias',
      fields: [
        {
          name: 'riskTolerance',
          label: '¿Cuál es tu tolerancia al riesgo?',
          type: 'select',
          options: [
            'Conservador',
            'Moderado',
            'Agresivo'
          ],
          required: false
        },
        {
          name: 'budgetType',
          label: '¿Qué tipo de presupuesto prefieres?',
          type: 'select',
          options: [
            'Presupuesto detallado',
            'Presupuesto 50/30/20',
            'Presupuesto simple'
          ],
          required: false
        },
        {
          name: 'notificationPreference',
          label: '¿Cómo prefieres recibir notificaciones?',
          type: 'select',
          options: [
            'Email',
            'Push notifications',
            'SMS',
            'Todas las anteriores'
          ],
          required: false
        }
      ]
    }
  ];

  const validateStep = () => {
    const currentStep = questionnaireSteps[activeStep];
    for (const field of currentStep.fields) {
      if (field.required && !userData[field.name]) {
        setError(`Por favor completa el campo: ${field.label}`);
        return false;
      }
    }
    
    // Validación específica para el paso 1
    if (activeStep === 0) {
      if (userData.password !== userData.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return false;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        setError('Por favor ingresa un correo electrónico válido');
        return false;
      }
      
      // Validar longitud de contraseña
      if (userData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return false;
      }
    }
    
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const handleSkip = () => {
    // Solo permitir saltar pasos después del primero
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep + 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Preparar los datos para el registro
      const registrationData = {
        firstName: userData.firstName,
        middleName: userData.middleName,
        paternalLastName: userData.paternalLastName,
        maternalLastName: userData.maternalLastName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        // Incluir datos financieros opcionales si están disponibles
        monthlyIncome: userData.monthlyIncome || '',
        currentSavings: userData.currentSavings || '',
        monthlyExpenses: userData.monthlyExpenses || '',
        primaryGoal: userData.primaryGoal || '',
        timeframe: userData.timeframe || '',
        savingsGoal: userData.savingsGoal || '',
        riskTolerance: userData.riskTolerance || '',
        budgetType: userData.budgetType || '',
        notificationPreference: userData.notificationPreference || ''
      };
      
      console.log('Enviando datos al servidor:', registrationData);
      console.log('URL de la API:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
      
      // Registrar usuario usando el servicio de autenticación
      const response = await authService.register(registrationData);
      
      console.log('Respuesta del servidor:', response);
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Error al registrar usuario');
      }
      
      // Extraer el dominio del correo para mostrar el enlace
      const emailDomain = userData.email.split('@')[1];
      setEmailProvider(emailDomain);
      
      // Mostrar pantalla de éxito
      setActiveStep(steps.length);
      
    } catch (error) {
      console.error('Error en registro:', error);
      setError(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };
  
  // Agregar estado para el proveedor de correo
  const [emailProvider, setEmailProvider] = useState('');
  
  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              ¡Registro completado!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Hemos recopilado toda la información necesaria para personalizar tu experiencia.
              {emailProvider && (
                <>
                  <br/><br/>
                  Te hemos enviado un correo de verificación. Por favor revisa tu bandeja de entrada.
                </>
              )}
            </Typography>
            
            {emailProvider && (
              <Button 
                onClick={() => {
                  // Determinar la URL del proveedor de correo
                  let emailUrl = '';
                  switch(emailProvider.toLowerCase()) {
                    case 'gmail.com':
                      emailUrl = 'https://mail.google.com';
                      break;
                    case 'outlook.com':
                    case 'hotmail.com':
                      emailUrl = 'https://outlook.live.com';
                      break;
                    case 'yahoo.com':
                      emailUrl = 'https://mail.yahoo.com';
                      break;
                    default:
                      emailUrl = `https://${emailProvider}`;
                  }
                  window.open(emailUrl, '_blank');
                }}
                variant="outlined"
                color="primary"
                sx={{ mb: 2 }}
              >
                Ir a mi correo electrónico
              </Button>
            )}
            
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="contained" 
              color="primary"
              sx={{ position: 'relative', mt: 2 }}
            >
              Comenzar
            </Button>
          </Box>
        ) : (
          <Box>
            <QuestionnaireStep
              step={questionnaireSteps[activeStep]}
              userData={userData}
              setUserData={setUserData}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Atrás
              </Button>
              
              {/* Botón de saltar solo para pasos opcionales (después del paso 1) */}
              {activeStep > 0 && (
                <Button
                  onClick={handleSkip}
                  sx={{ color: 'text.secondary' }}
                >
                  Saltar
                </Button>
              )}
              
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                disabled={loading}
              >
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RegisterWizard;