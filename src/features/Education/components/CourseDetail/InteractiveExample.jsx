// src/features/Education/components/CourseDetail/InteractiveExample.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Button, Slider, 
   Grid, Card, CardContent, Alert, Chip, FormControl,
  FormControlLabel, Radio, RadioGroup
} from '@mui/material';

const InteractiveExample = ({ data, lessonId }) => {
  // Estado para diferentes tipos de interacciones
  const [completed, setCompleted] = useState(false);
  const [budgetValues, setBudgetValues] = useState([]);
  const [savingsItems, setSavingsItems] = useState([]);
  const [totalSavings, setTotalSavings] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  
  useEffect(() => {
    // Inicializar datos según el tipo de interacción
    if (data.type === 'budget-calculator') {
      setBudgetValues(data.categories.map(cat => ({ ...cat })));
    } else if (data.type === 'savings-calculator') {
      setSavingsItems(data.items.map(item => ({ ...item, selected: false })));
    }
  }, [data]);
  
  // Calcular ahorros totales para la calculadora de ahorros
  useEffect(() => {
    if (data.type === 'savings-calculator') {
      let total = 0;
      savingsItems.forEach(item => {
        if (item.selected) {
          if (item.frequency === 'daily') {
            total += item.cost * 30; // Mensual
          } else if (item.frequency === 'workdays') {
            total += item.cost * 20; // 20 días laborables al mes
          } else if (item.frequency === 'weekly') {
            total += item.cost * 4; // 4 semanas al mes
          } else if (item.frequency === 'monthly') {
            total += item.cost;
          }
        }
      });
      setTotalSavings(total);
    }
  }, [savingsItems, data.type]);
  
  // Manejar cambios en el presupuesto
  const handleBudgetChange = (index, value) => {
    const newValues = [...budgetValues];
    newValues[index].current = value;
    setBudgetValues(newValues);
    
    // Verificar si la distribución es correcta
    const total = newValues.reduce((sum, cat) => sum + cat.current, 0);
    const allCorrect = total === data.initialAmount && 
                       newValues.every(cat => Math.abs(cat.current - cat.target) <= 10);
    
    setCompleted(allCorrect);
  };
  
  // Manejar selección de elementos de ahorro
  const handleSavingsToggle = (index) => {
    const newItems = [...savingsItems];
    newItems[index].selected = !newItems[index].selected;
    setSavingsItems(newItems);
    
    // Siempre se completa, solo muestra el total
    setCompleted(newItems.some(item => item.selected));
  };
  
  // Manejar respuestas de quiz
  const handleQuizAnswer = (questionId, answerId) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerId
    });
    
    // Verificar si todas las respuestas son correctas
    const allCorrect = Object.keys(data.questions || {}).every(qId => 
      quizAnswers[qId] === data.questions[qId].correctAnswer
    );
    
    setCompleted(allCorrect);
  };
  
  // Renderizar según el tipo de interacción
  const renderInteractive = () => {
    switch (data.type) {
      case 'drag-drop':
      case 'sorting':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Esta actividad requiere arrastrar y soltar elementos. Por favor, instala la biblioteca react-beautiful-dnd para habilitarla.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => setCompleted(true)}
              >
                Marcar como completada
              </Button>
            </Box>
          </Box>
        );
        
      case 'budget-calculator':
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Ingresos mensuales: ${data.initialAmount}
            </Typography>
            <Typography variant="body2" paragraph>
              Distribuye tus ingresos según la regla 50/30/20 ajustando los controles deslizantes.
            </Typography>
            
            <Grid container spacing={3}>
              {budgetValues.map((category, index) => (
                <Grid item xs={12} key={category.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1">
                          {category.label}
                        </Typography>
                        <Typography variant="subtitle1" color={
                          Math.abs(category.current - category.target) <= 10 ? 'success.main' : 'text.primary'
                        }>
                          ${category.current}
                        </Typography>
                      </Box>
                      
                      <Slider
                        value={category.current}
                        onChange={(e, value) => handleBudgetChange(index, value)}
                        min={0}
                        max={data.initialAmount}
                        step={10}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `$${value}`}
                        sx={{
                          color: Math.abs(category.current - category.target) <= 10 ? 'success.main' : 'primary.main'
                        }}
                      />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          $0
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ${data.initialAmount}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1">
                      Total asignado:
                    </Typography>
                    <Typography variant="subtitle1" color={
                      budgetValues.reduce((sum, cat) => sum + cat.current, 0) === data.initialAmount 
                        ? 'success.main' 
                        : 'error.main'
                    }>
                      ${budgetValues.reduce((sum, cat) => sum + cat.current, 0)}/${data.initialAmount}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
        
      case 'savings-calculator':
        return (
          <Box>
            <Typography variant="body2" paragraph>
              Selecciona los gastos que podrías reducir o eliminar para calcular cuánto podrías ahorrar mensualmente.
            </Typography>
            
            <Grid container spacing={2}>
              {savingsItems.map((item, index) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      cursor: 'pointer',
                      bgcolor: item.selected ? 'success.light' : 'background.paper',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => handleSavingsToggle(index)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1">
                          {item.label}
                        </Typography>
                        <Chip 
                          label={`$${item.cost}`} 
                          color={item.selected ? 'success' : 'primary'}
                          variant={item.selected ? 'filled' : 'outlined'}
                          size="small"
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {item.frequency === 'daily' && 'Gasto diario'}
                        {item.frequency === 'workdays' && 'Días laborables (20/mes)'}
                        {item.frequency === 'weekly' && 'Gasto semanal'}
                        {item.frequency === 'monthly' && 'Gasto mensual'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3, bgcolor: 'success.light', mt: 2 }}>
                  <Typography variant="h6" align="center" gutterBottom>
                    Ahorro mensual potencial
                  </Typography>
                  <Typography variant="h4" align="center" color="success.dark">
                    ${totalSavings}
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    ${totalSavings * 12} al año
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
        
      case 'quiz':
        return (
          <Box>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              {data.questions && Object.keys(data.questions).map((questionId) => {
                const question = data.questions[questionId];
                return (
                  <Box key={questionId} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {question.text}
                    </Typography>
                    <RadioGroup 
                      value={quizAnswers[questionId] || ''}
                      onChange={(e) => handleQuizAnswer(questionId, e.target.value)}
                    >
                      {question.options.map((option, index) => (
                        <FormControlLabel 
                          key={index}
                          value={index.toString()}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </Box>
                );
              })}
            </FormControl>
          </Box>
        );
        
      default:
        return (
          <Typography>
            Actividad interactiva no disponible
          </Typography>
        );
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {data.title}
      </Typography>
      <Typography variant="body2" paragraph>
        {data.description}
      </Typography>
      
      {renderInteractive()}
      
      {completed && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {data.type === 'savings-calculator' 
            ? '¡Excelente! Has identificado formas de ahorrar dinero.' 
            : '¡Correcto! Has completado la actividad con éxito.'}
        </Alert>
      )}
    </Box>
  );
};

export default InteractiveExample;