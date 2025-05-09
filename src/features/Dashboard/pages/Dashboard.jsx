import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Box, Typography, Button, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import BalanceWidget from '../components/widgets/BalanceWidget';
import ExpensesChart from '../components/widgets/ExpensesChart';
import RecentTransactions from '../components/widgets/RecentTransactions';
import GoalsWidget from '../components/widgets/GoalsWidget';
import TransactionModal from '../components/widgets/TransactionModal';
import { getUserTransactions, getUserBalance } from '../../../shared/services/financeService';
import { useAuth } from '../../../shared/hooks/useAuth'; // Importar desde hooks/useAuth

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({ total: 0, income: 0, expenses: 0 });
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth(); // Usar el hook unificado
  
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Obtener transacciones del usuario
      const userTransactions = await getUserTransactions(user?.id);
      setTransactions(userTransactions || []);
      
      // Calcular balance
      const userBalance = await getUserBalance(user?.id);
      setBalance(userBalance);
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]); // Dependencia: solo el ID del usuario
  
  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);
  
  const handleTransactionAdded = () => {
    setOpenModal(false);
    fetchDashboardData();
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Financiero
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
        >
          Nueva Transacción
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {/* Balance Widget */}
        <Grid item xs={12} md={4}>
          <BalanceWidget 
            balance={balance.total} 
            income={balance.income} 
            expenses={balance.expenses} 
          />
        </Grid>
        
        {/* Expenses Chart */}
        <Grid item xs={12} md={8}>
          <ExpensesChart transactions={transactions} />
        </Grid>
        
        {/* Recent Transactions */}
        <Grid item xs={12} md={8}>
          <RecentTransactions transactions={transactions} />
        </Grid>
        
        {/* Goals Widget */}
        <Grid item xs={12} md={4}>
          <GoalsWidget userId={user?.id} />
        </Grid>
      </Grid>
      
      {/* Transaction Modal */}
      <TransactionModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onTransactionAdded={handleTransactionAdded}
        userId={user?.id}
      />
    </Container>
  );
};

export default Dashboard;