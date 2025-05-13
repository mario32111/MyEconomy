// src/features/Finance/components/FinancialDashboard/FinancialDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Divider, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../../../shared/hooks/useAuth';
import { getProfile } from '../../../../shared/services/profileService';
import { formatCurrency } from '../../../../shared/utils/formatters';
import * as financeService from '../../../../shared/services/financeService';

// Import global UI components
import Card from '../../../../shared/components/UI/Card/Card';
import Button from '../../../../shared/components/UI/Button/Button';

// Import feature components
import ProfileForm from '../../../User/Profile/components/ProfileForm';
import ExpenseTracker from '../ExpenseTracker/ExpenseTracker';

const FinancialDashboard = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [financialSummary, setFinancialSummary] = useState({ income: 0, expenses: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExpenseTracker, setShowExpenseTracker] = useState(true); // Set to true by default

  // Fetch user profile data and financial summary
  useEffect(() => {
    const fetchData = async () => {
    if (!user?.id) return;

    try {
    setLoading(true);
    console.log('Fetching profile and financial data for user:', user.id);

    // Fetch profile data
    const profileResponse = await getProfile(user.id);
    if (profileResponse.success) {
    setProfileData(profileResponse.data);
    console.log('Profile data loaded:', profileResponse.data);
    } else {
    throw new Error(profileResponse.error?.message || 'Error al cargar el perfil');
    }

    // Fetch financial summary
    const summary = await financeService.getFinancialSummary();
    setFinancialSummary(summary);
    console.log('Financial summary loaded:', summary);

    } catch (err) {
    console.error('Error fetching data:', err);
    setError(err.message || 'Error al cargar los datos');
    } finally {
    setLoading(false);
    }
    };

    fetchData();
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = (updatedData) => {
    setProfileData(prev => ({
    ...prev,
    ...updatedData
    }));

    // Refresh financial summary after profile update
    financeService.getFinancialSummary()
    .then(summary => setFinancialSummary(summary))
    .catch(err => console.error('Error refreshing financial summary:', err));
  };

  // Handle transaction added/updated/deleted
  const handleTransactionChange = async () => {
    try {
    console.log('Refreshing financial summary after transaction change');
    const summary = await financeService.getFinancialSummary();
    setFinancialSummary(summary);
    } catch (err) {
    console.error('Error refreshing financial summary:', err);
    }
  };

  // Calculate remaining budget
  const calculateRemainingBudget = () => {
    return financialSummary.income - financialSummary.expenses;
  };

  // Calculate savings progress
  const calculateSavingsProgress = () => {
    if (!profileData) return 0;

    const currentSavings = financialSummary.balance || 0;
    const savingsGoal = parseFloat(profileData.savingsGoal) || 1; // Prevent division by zero

    return Math.min((currentSavings / savingsGoal) * 100, 100);
  };

  if (loading) {
    return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <CircularProgress />
    </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 3 }}>
    Panel Financiero
    </Typography>

    {error && (
    <Alert severity="error" sx={{ mb: 3 }}>
    {error}
    </Alert>
    )}

    <Grid container spacing={3}>
    {/* Financial Summary Cards */}
    <Grid item xs={12} md={6} lg={3}>
    <Card
    title="Ingresos"
    elevation={2}
    rounded
    >
    <Typography variant="h4" color="primary.main">
    {formatCurrency(financialSummary.income || 0)}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
    Ingresos totales registrados
    </Typography>
    </Card>
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
    <Card
    title="Gastos"
    elevation={2}
    rounded
    >
    <Typography variant="h4" color="error.main">
    {formatCurrency(financialSummary.expenses || 0)}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
    Gastos totales registrados
    </Typography>
    </Card>
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
    <Card
    title="Presupuesto Restante"
    elevation={2}
    rounded
    >
    <Typography 
    variant="h4" 
    color={calculateRemainingBudget() >= 0 ? 'success.main' : 'error.main'}
    >
    {formatCurrency(calculateRemainingBudget())}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
    {calculateRemainingBudget() >= 0 ? 'Disponible para ahorrar' : 'Déficit presupuestario'}
    </Typography>
    </Card>
    </Grid>

    <Grid item xs={12} md={6} lg={3}>
    <Card
    title="Progreso de Ahorro"
    elevation={2}
    rounded
    >
    <Box sx={{ position: 'relative', pt: 1 }}>
    <Typography variant="h4" color="primary.main">
    {calculateSavingsProgress().toFixed(1)}%
    </Typography>
    <Box 
    sx={{ 
    width: '100%', 
    height: '8px', 
    bgcolor: 'grey.200', 
    borderRadius: '4px',
    mt: 1
    }}
    >
    <Box 
    sx={{ 
    width: `${calculateSavingsProgress()}%`,
    height: '100%', 
    bgcolor: 'primary.main', 
    borderRadius: '4px',
    transition: 'width 0.5s ease-in-out'
    }}
    />
    </Box>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
    {formatCurrency(financialSummary.balance || 0)} de {profileData ? formatCurrency(profileData.savingsGoal || 0) : '$0.00'}
    </Typography>
    </Box>
    </Card>
    </Grid>

    {/* Profile Form */}
    <Grid item xs={12} lg={6}>
    <ProfileForm 
    user={profileData} 
    onProfileUpdate={handleProfileUpdate} 
    />
    </Grid>

    {/* Expense Tracker */}
    <Grid item xs={12} lg={6}>
    <Card
    title="Seguimiento de Gastos"
    elevation={2}
    rounded
    actions={
    <Button
    variant={showExpenseTracker ? "outlined" : "contained"}
    color="primary"
    onClick={() => setShowExpenseTracker(!showExpenseTracker)}
    >
    {showExpenseTracker ? "Ocultar Seguimiento" : "Mostrar Seguimiento"}
    </Button>
    }
    >
    {showExpenseTracker ? (
    <ExpenseTracker onTransactionChange={handleTransactionChange} />
    ) : (
    <Box sx={{ py: 4, textAlign: 'center' }}>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
    Registra tus gastos diarios y visualiza cómo se distribuyen por categoría.
    </Typography>
    <Button
    variant="contained"
    color="primary"
    onClick={() => setShowExpenseTracker(true)}
    >
    Iniciar Seguimiento
    </Button>
    </Box>
    )}
    </Card>
    </Grid>

    {/* Financial Tips */}
    <Grid item xs={12}>
    <Card
    title="Consejos Financieros Personalizados"
    elevation={2}
    rounded
    >
    {profileData ? (
    <Box>
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
    Basado en tu perfil financiero:
    </Typography>
    <Divider sx={{ mb: 2 }} />

    {calculateRemainingBudget() < 0 && (
    <Alert severity="warning" sx={{ mb: 2 }}>
    Tus gastos superan tus ingresos. Considera revisar tu presupuesto para reducir gastos no esenciales.
    </Alert>
    )}

    {profileData.budgetType === '50-30-20' && (
    <Typography variant="body1" sx={{ mb: 2 }}>
    Con tu presupuesto 50/30/20, deberías destinar {formatCurrency((parseFloat(profileData.monthlyIncome) || 0) * 0.5)} a necesidades, 
    {formatCurrency((parseFloat(profileData.monthlyIncome) || 0) * 0.3)} a deseos y {formatCurrency((parseFloat(profileData.monthlyIncome) || 0) * 0.2)} a ahorros.
    </Typography>
    )}

    {profileData.primaryGoal === 'savings' && (
    <Typography variant="body1" sx={{ mb: 2 }}>
    Para alcanzar tu meta de ahorro de {formatCurrency(profileData.savingsGoal || 0)}, necesitas ahorrar consistentemente durante los próximos meses.
    </Typography>
    )}

    {profileData.primaryGoal === 'debt' && (
    <Typography variant="body1" sx={{ mb: 2 }}>
    Prioriza el pago de deudas con las tasas de interés más altas para minimizar el costo financiero total.
    </Typography>
    )}
    </Box>
    ) : (
    <Typography variant="body1" color="text.secondary">
    Completa tu perfil financiero para recibir consejos personalizados.
    </Typography>
    )}
    </Card>
    </Grid>
    </Grid>
    </Box>
  );
};

export default FinancialDashboard;
