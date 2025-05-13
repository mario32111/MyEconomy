// src/features/Education/components/CourseDetail/QuizQuestion.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl,
  Paper,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const QuizQuestion = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    
    // Guardar respuesta
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      question: questions[currentQuestion].question,
      selected: selectedAnswer,
      correct: isCorrect
    };
    setAnswers(newAnswers);
    
    // Actualizar puntuación
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Mostrar resultado
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedAnswer('');
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
      if (onComplete) {
        onComplete(score / questions.length);
      }
    }
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Quiz completado
        </Typography>
        <Typography variant="h6" gutterBottom>
          Tu puntuación: {score} de {questions.length} ({percentage}%)
        </Typography>
        
        <Box sx={{ mt: 3, mb: 4 }}>
          <Typography variant="body1" gutterBottom fontWeight="medium">
            Resumen de respuestas:
          </Typography>
          
          {answers.map((answer, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: answer.correct ? 'success.light' : 'error.light' }}>
              <Typography variant="body1" gutterBottom>
                {index + 1}. {answer.question}
              </Typography>
              <Typography variant="body2" color={answer.correct ? 'success.dark' : 'error.dark'}>
                Tu respuesta: {answer.selected}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Stepper activeStep={currentQuestion} alternativeLabel sx={{ mb: 3 }}>
        {questions.map((_, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
      
      <Typography variant="h6" gutterBottom>
        Pregunta {currentQuestion + 1} de {questions.length}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3, fontWeight: 'medium' }}>
        {questions[currentQuestion].question}
      </Typography>
      
      <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
        <RadioGroup
          value={selectedAnswer}
          onChange={handleAnswerChange}
        >
          {questions[currentQuestion].options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
              sx={{ mb: 1 }}
            />
          ))}
        </RadioGroup>
      </FormControl>
      
      {showResult && (
        <Alert 
          severity={selectedAnswer === questions[currentQuestion].correctAnswer ? "success" : "error"}
          sx={{ mb: 3 }}
        >
          {selectedAnswer === questions[currentQuestion].correctAnswer 
            ? "¡Correcto!" 
            : `Incorrecto. La respuesta correcta es: ${questions[currentQuestion].correctAnswer}`}
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          disabled={currentQuestion === 0}
          onClick={() => {
            setCurrentQuestion(currentQuestion - 1);
            setShowResult(false);
            setSelectedAnswer(answers[currentQuestion - 1]?.selected || '');
          }}
        >
          Anterior
        </Button>
        
        {!showResult ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedAnswer}
          >
            Verificar
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {currentQuestion < questions.length - 1 ? "Siguiente" : "Finalizar"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default QuizQuestion;