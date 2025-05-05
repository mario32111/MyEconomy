import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BalanceWidget from '../components/widgets/BalanceWidget';
import SavingsWidget from '../components/widgets/SavingsWidget';
import GoalsWidget from '../components/widgets/GoalsWidget';
import TransactionsWidget from '../components/widgets/TransactionsWidget';
import ExpensesChart from '../components/widgets/ExpensesChart';
import UpcomingPayments from '../components/widgets/UpcomingPayments';

const DashboardPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Balance Total */}
        <Grid item xs={12} md={isMobile ? 12 : 4}>
          <BalanceWidget />
        </Grid>

        {/* Ahorros */}
        <Grid item xs={12} md={isMobile ? 12 : 4}>
          <SavingsWidget />
        </Grid>

        {/* Metas Financieras */}
        <Grid item xs={12} md={isMobile ? 12 : 4}>
          <GoalsWidget />
        </Grid>

        {/* Gráfico de Ingresos vs Gastos */}
        <Grid item xs={12} md={isMobile ? 12 : 8}>
          <ExpensesChart />
        </Grid>

        {/* Transacciones Recientes */}
        <Grid item xs={12} md={isMobile ? 12 : 4}>
          <TransactionsWidget />
        </Grid>

        {/* Pagos Próximos */}
        <Grid item xs={12}>
          <UpcomingPayments />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;