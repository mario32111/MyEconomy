import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Box,
  Divider,
  Chip
} from '@mui/material';
import { 
  ShoppingCart as ExpenseIcon, 
  AttachMoney as IncomeIcon,
  LocalOffer as CategoryIcon
} from '@mui/icons-material';

const RecentTransactions = ({ transactions = [] }) => {
  // Formatear números como moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
  };

  // Obtener las 5 transacciones más recientes
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Transacciones Recientes
        </Typography>
        
        {recentTransactions.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No hay transacciones recientes
            </Typography>
          </Box>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
            {recentTransactions.map((transaction, index) => {
              const isIncome = parseFloat(transaction.amount) > 0;
              
              return (
                <React.Fragment key={transaction.id || index}>
                  {index > 0 && <Divider variant="inset" component="li" />}
                  <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: isIncome ? 'success.light' : 'error.light',
                        color: isIncome ? 'success.contrastText' : 'error.contrastText'
                      }}>
                        {isIncome ? <IncomeIcon /> : <ExpenseIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle1" component="span">
                            {transaction.description}
                          </Typography>
                          <Typography 
                            variant="subtitle1" 
                            component="span"
                            color={isIncome ? 'success.main' : 'error.main'}
                            fontWeight="bold"
                          >
                            {formatCurrency(transaction.amount)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {formatDate(transaction.date)}
                          </Typography>
                          {transaction.category && (
                            <Chip 
                              icon={<CategoryIcon fontSize="small" />}
                              label={transaction.category}
                              size="small"
                              sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                            />
                          )}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;