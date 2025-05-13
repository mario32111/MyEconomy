// src/features/Education/components/CourseDetail/MiniChallenge.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl,
  Collapse,
  Alert,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Slider,
  Checkbox,
  Divider
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const MiniChallenge = ({ data, completed, onComplete }) => {
  // Verificar si data existe y tiene la estructura esperada
  const challenge = data || {
    id: 'placeholder',
    title: 'Desafío no disponible',
    steps: [
      {
        type: 'text-input',
        shortTitle: 'Paso 1',
        title: 'Este desafío no está disponible',
        description: 'Lo sentimos, este desafío no está disponible en este momento.',
        placeholder: 'No disponible',
        hint: 'Intenta más tarde',
        validateAnswer: () => false,
        successMessage: '',
        errorMessage: 'Este desafío no está disponible'
      }
    ],
    points: 0
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  // Si ya está completado, no mostrar el desafío interactivo
  useEffect(() => {
    if (completed) {
      setIsCorrect(true);
      setCurrentStep(challenge.steps.length - 1);
    }
  }, [completed, challenge.steps]);
  
  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentStep]: value
    });
    setShowResult(false);
  };
  
  const handleCheckAnswer = () => {
    const currentAnswer = answers[currentStep];
    const currentQuestion = challenge.steps[currentStep];
    
    let correct = false;
    
    try {
      if (currentQuestion.type === 'multiple-choice') {
        correct = currentAnswer === currentQuestion.correctAnswer;
      } else if (typeof currentQuestion.validateAnswer === 'function') {
        correct = currentQuestion.validateAnswer(currentAnswer);
      }
    } catch (error) {
      console.error('Error validating answer:', error);
      correct = false;
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct && currentStep === challenge.steps.length - 1) {
      // Last step completed correctly
      setTimeout(() => {
        if (onComplete && typeof onComplete === 'function') {
          onComplete(challenge.id);
        }
      }, 1500);
    }
  };
  
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
    setShowResult(false);
    setShowHint(false);
  };
  
  const renderQuestionByType = (question) => {
    if (!question) return <Typography>Pregunta no disponible</Typography>;
    
    switch (question.type) {
      case 'multiple-choice':
        return (
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              value={answers[currentStep] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            >
              {question.options && question.options.map((option, idx) => (
                <FormControlLabel 
                  key={idx} 
                  value={option} 
                  control={<Radio />} 
                  label={
                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                      {option}
                    </Typography>
                  }
                  sx={{ mb: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      
      case 'slider':
        return (
          <Box sx={{ width: '100%', px: 2 }}>
            <Typography gutterBottom>
              {question.sliderLabel}: {answers[currentStep] || question.min}
            </Typography>
            <Slider
              value={answers[currentStep] || question.min}
              min={question.min}
              max={question.max}
              step={question.step}
              marks={question.marks}
              valueLabelDisplay="auto"
              onChange={(_, value) => handleAnswerChange(value)}
            />
          </Box>
        );
      
      case 'text-input':
        return (
          <TextField
            fullWidth
            variant="outlined"
            placeholder={question.placeholder || "Tu respuesta..."}
            value={answers[currentStep] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            sx={{ mb: 2 }}
          />
        );
      
      case 'checkbox-group':
        return (
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            {question.options && question.options.map((option, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Checkbox
                    checked={answers[currentStep]?.includes(option) || false}
                    onChange={(e) => {
                      const currentSelections = answers[currentStep] || [];
                      if (e.target.checked) {
                        handleAnswerChange([...currentSelections, option]);
                      } else {
                        handleAnswerChange(
                          currentSelections.filter(item => item !== option)
                        );
                      }
                    }}
                  />
                }
                label={option}
              />
            ))}
          </FormControl>
        );
      
      default:
        return <Typography>Tipo de pregunta no soportado</Typography>;
    }
  };
  
  // Verificar si hay pasos disponibles
  if (!challenge.steps || challenge.steps.length === 0) {
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          mb: 4
        }}
      >
        <Typography variant="h6" color="error">
          No hay pasos disponibles para este desafío
        </Typography>
      </Paper>
    );
  }
  
  const currentQuestion = challenge.steps[currentStep] || {};
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        mb: 4
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" color="primary">
          Mini Reto: {challenge.title}
        </Typography>
      </Box>
      
      <Stepper 
        activeStep={currentStep} 
        alternativeLabel 
        sx={{ mb: 3 }}
      >
        {challenge.steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.shortTitle || `Paso ${index + 1}`}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {currentQuestion.title || 'Título no disponible'}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3,
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          {currentQuestion.description || 'Descripción no disponible'}
        </Typography>
        
        {currentQuestion.image && (
          <Box 
            component="img" 
            src={currentQuestion.image} 
            alt={currentQuestion.title || 'Imagen del desafío'}
            sx={{ 
              width: '100%', 
              maxHeight: 200, 
              objectFit: 'contain',
              mb: 3,
              borderRadius: 1
            }}
          />
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ my: 3 }}>
          {renderQuestionByType(currentQuestion)}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            startIcon={<HelpOutlineIcon />}
            onClick={() => setShowHint(!showHint)}
            color="secondary"
            variant="text"
            disabled={!currentQuestion.hint}
          >
            {showHint ? 'Ocultar pista' : 'Mostrar pista'}
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckAnswer}
            disabled={answers[currentStep] === undefined}
          >
            Verificar
          </Button>
        </Box>
        
        <Collapse in={showHint && currentQuestion.hint}>
          <Alert 
            severity="info" 
            sx={{ mt: 2 }}
            icon={<HelpOutlineIcon />}
          >
            <Typography variant="body2">
              {currentQuestion.hint || 'No hay pista disponible'}
            </Typography>
          </Alert>
        </Collapse>
        
        <Collapse in={showResult}>
          <Alert 
            severity={isCorrect ? "success" : "error"} 
            sx={{ mt: 2 }}
            icon={isCorrect ? <CheckCircleOutlineIcon /> : <ErrorOutlineIcon />}
          >
            <Typography variant="body1" fontWeight="medium">
              {isCorrect ? '¡Correcto!' : 'Incorrecto, intenta de nuevo.'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {isCorrect 
                ? (currentQuestion.successMessage || '¡Bien hecho!') 
                : (currentQuestion.errorMessage || 'Intenta de nuevo')}
            </Typography>
          </Alert>
        </Collapse>
      </Box>
      
      {isCorrect && currentStep < challenge.steps.length - 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextStep}
          >
            Siguiente Paso
          </Button>
        </Box>
      )}
      
      {isCorrect && currentStep === challenge.steps.length - 1 && (
        <Box 
          sx={{ 
            mt: 2, 
            p: 2, 
            backgroundColor: 'success.light', 
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h6" gutterBottom>
            ¡Felicidades! Has completado el reto
          </Typography>
          <Typography variant="body1">
            Has ganado {challenge.points || 0} puntos de experiencia
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default MiniChallenge;