import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { getMonthlyTransactions } from '../../../../shared/services/financeService';
import { useAuth } from '../../../../shared/hooks/useAuth';

const ExpensesChart = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadChartData = async () => {
      try {
        const monthlyData = await getMonthlyTransactions(user?.id, 6);
        setChartData(monthlyData);
      } catch (error) {
        console.error('Error al cargar datos del gráfico:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, [user, transactions]);

  // Formatear números como moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Personalizar tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            boxShadow: 3
          }}
        >
          <Typography variant="subtitle2">{`${label}`}</Typography>
          <Typography variant="body2" color="success.main">
            {`Ingresos: ${formatCurrency(payload[0].value)}`}
          </Typography>
          <Typography variant="body2" color="error.main">
            {`Gastos: ${formatCurrency(payload[1].value)}`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Ingresos vs Gastos (Últimos 6 meses)
        </Typography>
        
        <Box sx={{ height: 300, mt: 2 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography>Cargando datos...</Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F44336" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F44336" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tickLine={false}
                  axisLine={{ stroke: '#E0E0E0' }}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  tickLine={false}
                  axisLine={{ stroke: '#E0E0E0' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  name="Ingresos"
                  stroke="#4CAF50" 
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  name="Gastos"
                  stroke="#F44336" 
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpensesChart;