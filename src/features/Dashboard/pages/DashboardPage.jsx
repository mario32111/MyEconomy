// src/features/Dashboard/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import { getUserTransactions, getUserBalance } from '../../../shared/services/financeService';

// Importar componentes del dashboard
import ExpensesChart from '../components/widgets/ExpensesChart';
import BalanceWidget from '../components/widgets/BalanceWidget';
import RecentTransactions from '../components/widgets/RecentTransactions';
import GoalsWidget from '../components/widgets/GoalsWidget';

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({ total: 0, income: 0, expenses: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirigir si no está autenticado
    if (!isAuthenticated && !loading) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, loading]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Cargar transacciones
        const userTransactions = await getUserTransactions(user?.id);
        setTransactions(userTransactions);
        
        // Cargar balance
        const userBalance = await getUserBalance(user?.id);
        setBalance(userBalance);
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  // Formatear números como moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography variant="h6">Cargando dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Dashboard Financiero
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/finance/add-transaction')}
        >
          Nueva Transacción
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Balance Widget */}
        <Grid item xs={12} md={6} lg={4}>
          <BalanceWidget balance={balance} />
        </Grid>

        {/* Resumen Mensual */}
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resumen del Mes
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Ingresos: <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{formatCurrency(balance.income)}</span>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Gastos: <span style={{ color: '#F44336', fontWeight: 'bold' }}>{formatCurrency(balance.expenses)}</span>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Balance: <span style={{ fontWeight: 'bold' }}>{formatCurrency(balance.total)}</span>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Metas Financieras */}
        <Grid item xs={12} md={6} lg={4}>
          <GoalsWidget userId={user?.id} />
        </Grid>

        {/* Gráfico de Gastos */}
        <Grid item xs={12} lg={8}>
          <ExpensesChart transactions={transactions} />
        </Grid>

        {/* Transacciones Recientes */}
        <Grid item xs={12} lg={4}>
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </Grid>

        {/* Distribución de Gastos por Categoría */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Distribución de Gastos
              </Typography>
              <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Gráfico de distribución por categorías
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Consejos Financieros */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Consejos Financieros
              </Typography>
              <Typography variant="body2" paragraph>
                Basado en tus gastos, considera reducir gastos en entretenimiento para alcanzar tus metas más rápido.
              </Typography>
              <Typography variant="body2" paragraph>
                Recuerda apartar al menos el 20% de tus ingresos para ahorros e inversiones.
              </Typography>
              <Button variant="outlined" color="primary" size="small">
                Ver más consejos
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;