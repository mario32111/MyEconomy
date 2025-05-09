import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Divider } from '@mui/material';
import { 
  TrendingUp as IncomeIcon, 
  TrendingDown as ExpenseIcon
} from '@mui/icons-material';

const BalanceWidget = ({ balance, income, expenses }) => {
  // Formatear números como moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Balance General
        </Typography>
        
        <Box sx={{ my: 3, textAlign: 'center' }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(balance)}
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
                  {formatCurrency(income)}
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
                  {formatCurrency(expenses)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BalanceWidget;