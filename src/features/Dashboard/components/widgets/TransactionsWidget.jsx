import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import HomeIcon from '@mui/icons-material/Home';

const transactions = [
  {
    type: 'Supermercado',
    amount: 1250.00,
    date: '2025-04-24',
    icon: <ShoppingCartIcon />
  },
  {
    type: 'Comida rápida',
    amount: 350.00,
    date: '2025-04-24',
    icon: <FastfoodIcon />
  },
  {
    type: 'Gasolina',
    amount: 800.00,
    date: '2025-04-23',
    icon: <LocalGasStationIcon />
  },
  {
    type: 'Renta',
    amount: 8000.00,
    date: '2025-04-23',
    icon: <HomeIcon />
  }
];

const TransactionsWidget = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Transacciones Recientes
        </Typography>
        <List>
          {transactions.map((transaction, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {transaction.icon}
              </ListItemIcon>
              <ListItemText
                primary={transaction.type}
                secondary={new Date(transaction.date).toLocaleDateString()}
              />
              <Typography color="error">
                -${transaction.amount.toFixed(2)}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TransactionsWidget;