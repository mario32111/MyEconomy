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
import { useAuth } from '../../hooks/useAuth';

const steps = ['Información básica', 'Perfil financiero', 'Objetivos', 'Preferencias'];

const RegisterWizard = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    // Paso 1: Información básica
    name: '',
    email: '',
    password: '',
    
    // Paso 2: Perfil financiero
    monthlyIncome: '',
    currentSavings: '',
    monthlyExpenses: '',
    
    // Paso 3: Objetivos
    primaryGoal: '',
    timeframe: '',
    savingsGoal: '',
    
    // Paso 4: Preferencias
    riskTolerance: '',
    budgetType: '',
    notificationPreference: ''
  });

  const questionnaireSteps = [
    {
      title: 'Información básica',
      fields: [
        {
          name: 'name',
          label: 'Nombre completo',
          type: 'text'
        },
        {
          name: 'email',
          label: 'Correo electrónico',
          type: 'email'
        },
        {
          name: 'password',
          label: 'Contraseña',
          type: 'password'
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
          prefix: '$'
        },
        {
          name: 'currentSavings',
          label: '¿Cuánto tienes ahorrado actualmente?',
          type: 'number',
          prefix: '$'
        },
        {
          name: 'monthlyExpenses',
          label: '¿Cuál es tu gasto mensual aproximado?',
          type: 'number',
          prefix: '$'
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
          ]
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
          ]
        },
        {
          name: 'savingsGoal',
          label: '¿Cuánto quieres ahorrar mensualmente?',
          type: 'number',
          prefix: '$'
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
          ]
        },
        {
          name: 'budgetType',
          label: '¿Qué tipo de presupuesto prefieres?',
          type: 'select',
          options: [
            'Presupuesto detallado',
            'Presupuesto 50/30/20',
            'Presupuesto simple'
          ]
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
          ]
        }
      ]
    }
  ];

  const validateStep = () => {
    const currentStep = questionnaireSteps[activeStep];
    for (const field of currentStep.fields) {
      if (!userData[field.name]) {
        setError(`Por favor completa el campo: ${field.label}`);
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

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await signup(
        userData.email, 
        userData.password, 
        userData
      );
      
      if (result.error) throw result.error;
      
      // Mostrar mensaje de verificación y redirigir
      setActiveStep(steps.length); // Mostrar pantalla de éxito
      
      // Si tenemos información del proveedor de correo, ofrecemos un enlace
      if (result.data && result.data.emailProvider) {
        setEmailProvider(result.data.emailProvider);
      }
      
      // No redirigimos automáticamente, dejamos que el usuario decida
    } catch (error) {
      console.error('Error en registro:', error);
      setError(error.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };
  
  // Agregar estado para el proveedor de correo
  const [emailProvider, setEmailProvider] = useState('');
  
  // Modificar la pantalla de éxito para incluir el enlace al correo
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