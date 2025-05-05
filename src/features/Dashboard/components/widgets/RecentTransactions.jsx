import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Avatar,
  Box,
} from '@mui/material';
import {
  ShoppingCart,
  LocalDining,
  DirectionsCar,
  Home
} from '@mui/icons-material';

const transactions = [
  {
    id: 1,
    type: 'gasto',
    category: 'Compras',
    description: 'Supermercado',
    amount: -1250.00,
    date: '2025-04-24',
    icon: <ShoppingCart />
  },
  {
    id: 2,
    type: 'gasto',
    category: 'Restaurantes',
    description: 'Comida rápida',
    amount: -350.00,
    date: '2025-04-24',
    icon: <LocalDining />
  },
  {
    id: 3,
    type: 'gasto',
    category: 'Transporte',
    description: 'Gasolina',
    amount: -800.00,
    date: '2025-04-23',
    icon: <DirectionsCar />
  },
  {
    id: 4,
    type: 'gasto',
    category: 'Hogar',
    description: 'Renta',
    amount: -8000.00,
    date: '2025-04-23',
    icon: <Home />
  }
];

const RecentTransactions = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Transacciones Recientes
        </Typography>

        <List>
          {transactions.map((transaction) => (
            <ListItem 
              key={transaction.id}
              sx={{ 
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <ListItemIcon>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.light',
                    color: 'primary.main'
                  }}
                >
                  {transaction.icon}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={transaction.description}
                secondary={
                  <Box component="span" sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {transaction.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {transaction.date}
                    </Typography>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Typography
                  variant="body2"
                  color={transaction.amount < 0 ? 'error.main' : 'success.main'}
                >
                  ${Math.abs(transaction.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;