import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Divider, LinearProgress } from '@mui/material';
import { 
  TrendingUp as IncomeIcon, 
  TrendingDown as ExpenseIcon,
  Savings as SavingsIcon
} from '@mui/icons-material';

const BalanceWidget = ({ balance, income, expenses }) => {
  // Formatear números como moneda de manera segura
  const formatCurrency = (amount) => {
    try {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    } catch (error) {
      // Fallback en caso de error
      return `$${Math.round(amount).toLocaleString()}`;
    }
  };

  // Calcular porcentaje de ahorro
  const calculateSavingsRate = () => {
    if (!income || income <= 0) return 0;
    const savings = income - expenses;
    return Math.max(0, Math.min(100, Math.round((savings / income) * 100)));
  };

  const savingsRate = calculateSavingsRate();
  const savingsRateColor = 
    savingsRate > 30 ? 'success.main' : 
    savingsRate > 15 ? 'warning.main' : 
    'error.main';

  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Balance General
        </Typography>

        <Box sx={{ my: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(balance || 0)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Balance Total
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                bgcolor: 'success.light', 
                borderRadius: '50%', 
                p: 1, 
                mr: 1,
                display: 'flex'
              }}>
                <IncomeIcon color="success" />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Ingresos
                </Typography>
                <Typography variant="h6" component="div">
                  {formatCurrency(income || 0)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                bgcolor: 'error.light', 
                borderRadius: '50%', 
                p: 1, 
                mr: 1,
                display: 'flex'
              }}>
                <ExpenseIcon color="error" />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Gastos
                </Typography>
                <Typography variant="h6" component="div">
                  {formatCurrency(expenses || 0)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <SavingsIcon sx={{ mr: 1, color: savingsRateColor }} />
            <Typography variant="body2">
              Tasa de Ahorro: <strong>{savingsRate}%</strong>
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={savingsRate} 
            color={
              savingsRate > 30 ? "success" : 
              savingsRate > 15 ? "warning" : 
              "error"
            }
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {savingsRate > 30 ? '¡Excelente ahorro!' : 
             savingsRate > 15 ? 'Buen progreso' : 
             'Oportunidad de mejora'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BalanceWidget;
