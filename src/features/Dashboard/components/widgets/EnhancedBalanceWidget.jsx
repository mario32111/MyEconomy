// src/features/Dashboard/components/widgets/EnhancedBalanceWidget.jsx
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Divider, CircularProgress } from '@mui/material';
import { 
  TrendingUp as IncomeIcon, 
  TrendingDown as ExpenseIcon
} from '@mui/icons-material';
import { getUserProfile } from '../../services/dashboardService';
import { useAuth } from '../../../../shared/hooks/useAuth';

// Safe formatCurrency function that doesn't rely on APP_CONFIG
const safeFormatCurrency = (amount, currency = 'MXN') => {
  if (amount === null || amount === undefined || amount === '') {
    return '$0.00';
  }

  try {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '$' + parseFloat(amount).toFixed(2);
  }
};

const EnhancedBalanceWidget = ({ balance, income, expenses }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    balance: balance || 0,
    income: income || 0,
    expenses: expenses || 0
  });
  const { user } = useAuth();

  useEffect(() => {
    // Update from props if provided
    if (balance !== undefined || income !== undefined || expenses !== undefined) {
      setUserData({
        balance: balance || 0,
        income: income || 0,
        expenses: expenses || 0
      });
    } else {
      // Otherwise try to fetch from profile
      const fetchUserProfile = async () => {
        setLoading(true);
        try {
          const profile = await getUserProfile();
          if (profile) {
            setUserData({
              balance: profile.currentSavings || 0,
              income: profile.monthlyIncome || 0,
              expenses: profile.monthlyExpenses || 0
            });
          }
        } catch (error) {
          console.error('Error fetching user profile for balance widget:', error);
        } finally {
          setLoading(false);
        }
      };

      if (user?.id) {
        fetchUserProfile();
      }
    }
  }, [balance, income, expenses, user?.id]);

  // Calculate savings rate
  const calculateSavingsRate = () => {
    if (!userData.income || userData.income === 0) return 0;
    const savings = userData.income - userData.expenses;
    return (savings / userData.income) * 100;
  };

  const savingsRate = calculateSavingsRate();
  const savingsRateColor = savingsRate >= 20 ? 'success.main' : 
                          savingsRate >= 10 ? 'warning.main' : 'error.main';

  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Balance General
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <>
            <Box sx={{ my: 3, textAlign: 'center' }}>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {safeFormatCurrency(userData.balance)}
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
                      {safeFormatCurrency(userData.income)}
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
                      {safeFormatCurrency(userData.expenses)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Tasa de Ahorro
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" color={savingsRateColor} sx={{ fontWeight: 'bold' }}>
                  {savingsRate.toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {savingsRate >= 20 ? '¡Excelente!' : 
                   savingsRate >= 10 ? 'Buen trabajo' : 'Necesita mejorar'}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedBalanceWidget;
