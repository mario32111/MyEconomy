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
import { useAuth } from '../../../../shared/hooks/useAuth';
import axiosInstance from '../../../../shared/services/axiosConfig';

// Función local para obtener datos mensuales
const getMonthlyTransactions = async (userId, months = 6) => {
  if (!userId) {
    console.warn('getMonthlyTransactions: No userId provided');
    return getMockMonthlyData(months);
  }

  try {
    // Intentar obtener desde la API
    try {
      const response = await axiosInstance.get(`/transactions/monthly/${userId}?months=${months}`);
      return response.data;
    } catch (apiError) {
      console.warn('Error fetching monthly transactions from API:', apiError);
      return getMockMonthlyData(months);
    }
  } catch (error) {
    console.error('Error in getMonthlyTransactions:', error);
    return getMockMonthlyData(months);
  }
};

// Genera datos de ejemplo para las transacciones mensuales
const getMockMonthlyData = (months = 6, baseIncome = 15000, baseExpenses = 10000) => {
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const currentDate = new Date();
  const result = [];

  for (let i = months - 1; i >= 0; i--) {
    const monthIndex = (currentDate.getMonth() - i + 12) % 12;
    const variationFactor = 0.8 + (Math.random() * 0.4); // Entre 0.8 y 1.2

    result.push({
      month: monthNames[monthIndex],
      income: baseIncome * variationFactor,
      expenses: baseExpenses * variationFactor
    });
  }

  return result;
};

const ExpensesChart = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadChartData = async () => {
      try {
        // Si el usuario tiene un perfil con ingresos mensuales, usar esos datos
        if (user?.profile?.monthly_income) {
          const baseIncome = parseFloat(user.profile.monthly_income) || 15000;
          const baseExpenses = parseFloat(user.profile.monthly_expenses) || 10000;
          const mockData = getMockMonthlyData(6, baseIncome, baseExpenses);
          setChartData(mockData);
        } else {
          // De lo contrario, intentar obtener datos reales
          const monthlyData = await getMonthlyTransactions(user?.id, 6);
          setChartData(monthlyData);
        }
      } catch (error) {
        console.error('Error al cargar datos del gráfico:', error);
        // En caso de error, mostrar datos de ejemplo
        setChartData(getMockMonthlyData());
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, [user, transactions]);

  // Formatear números como moneda
  const formatCurrency = (value) => {
    try {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    } catch (error) {
      return `$${Math.round(value).toLocaleString()}`;
    }
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