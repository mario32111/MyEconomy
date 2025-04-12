// BudgetPlanner.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert, CircularProgress } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../colors';
import { Grow, Slide } from '@mui/material';


const BudgetPlanner = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [amount, setAmount] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [totalBudget, setTotalBudget] = useState(0);
  const [warning, setWarning] = useState(false);
  const [tips, setTips] = useState([]);
  const [loadingTips, setLoadingTips] = useState(false);

  useEffect(() => {
    // Actualizar el presupuesto total cuando se añaden categorías
    const total = categories.reduce((sum, category) => sum + category.amount, 0);
    setTotalBudget(total);

    // Verificar si el presupuesto total supera los ingresos mensuales
    if (monthlyIncome && total > monthlyIncome) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [categories, monthlyIncome]);

  const handleAddCategory = () => {
    if (categoryName && amount) {
      setCategories([...categories, { name: categoryName, amount: parseFloat(amount) }]);
      setCategoryName('');
      setAmount('');
    }
  };

  const fetchTipsFromAI = async () => {
    setLoadingTips(true);
    try {
      // Simulación de llamada a una API para obtener tips de una IA
      const response = await fetch('/api/get-budget-tips'); // Ejemplo de endpoint
      const data = await response.json();
      setTips(data.tips);
    } catch (error) {
      console.error('Error al obtener tips:', error);
      setTips(['No se pudieron obtener los tips en este momento. Intenta más tarde.']);
    } finally {
      setLoadingTips(false);
    }
  };
  const [checked, setChecked] = useState(true); // Estado para el control de la animación


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Grow in={checked} timeout={1000}>
          <Typography variant="h4" gutterBottom color="primary">
            Planificador de Presupuesto
          </Typography>
        </Grow>


        {/* Ingresar los ingresos mensuales */}

        <Slide in={checked} timeout={500}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Definir Ingresos Mensuales
            </Typography>
            <TextField
              fullWidth
              label="Ingresos Mensuales"
              variant="outlined"
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
            />
          </Paper>

        </Slide>

        {/* Formulario para agregar categorías */}
        <Slide in={checked} timeout={500}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Agregar Nueva Categoría de Gasto
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Nombre de la Categoría"
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Monto"
                variant="outlined"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleAddCategory}>
                Agregar
              </Button>
            </Box>
          </Paper>
        </Slide>


        {/* Alerta de advertencia si el presupuesto total supera los ingresos */}
        {warning && (
          <Alert severity="warning" sx={{ mb: 4 }}>
            ¡El presupuesto total supera tus ingresos mensuales!
          </Alert>
        )}

        {/* Gráfico de barras mostrando las categorías y sus montos */}
        {categories.length > 0 && (
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Presupuesto por Categoría
            </Typography>
            <BarChart
              xAxis={[{ data: categories.map((category) => category.name), scaleType: 'band' }]}
              series={[{ data: categories.map((category) => category.amount), label: 'Monto' }]}
              height={300}
            />
          </Paper>
        )}

        {/* Mostrar el presupuesto total */}
        <Grow in={checked} timeout={1000}>
          <Typography variant="h6" gutterBottom color="text.primary" sx={{ mt: 4 }}>
            Presupuesto Total: ${totalBudget.toFixed(2)}
          </Typography>
        </Grow>


        {/* Apartado de Tips de IA */}
        <Slide in={checked} timeout={1000}>
          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Tips de Presupuesto
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={fetchTipsFromAI}
              disabled={loadingTips}
            >
              {loadingTips ? <CircularProgress size={24} /> : 'Obtener Tips'}
            </Button>
            <Box sx={{ mt: 2 }}>
              {tips.length > 0 && (
                <ul>
                  {tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              )}
            </Box>
          </Paper>
        </Slide>

      </Container>
    </ThemeProvider>
  );
};

export default BudgetPlanner;
