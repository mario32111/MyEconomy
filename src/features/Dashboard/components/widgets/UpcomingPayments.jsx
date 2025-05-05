import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ListItemIcon from '@mui/material/ListItemIcon';

const payments = [
  {
    type: 'Renta',
    amount: 8000,
    dueDate: '2025-05-01',
    status: 'pendiente',
    icon: <HomeIcon />
  },
  {
    type: 'Préstamo auto',
    amount: 4500,
    dueDate: '2025-05-03',
    status: 'pendiente',
    icon: <DirectionsCarIcon />
  }
];

const UpcomingPayments = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Pagos Próximos
        </Typography>
        <List>
          {payments.map((payment, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {payment.icon}
              </ListItemIcon>
              <ListItemText
                primary={payment.type}
                secondary={`Vence: ${new Date(payment.dueDate).toLocaleDateString()}`}
              />
              <Typography variant="body2" sx={{ mx: 2 }}>
                ${payment.amount}
              </Typography>
              <Chip
                label={payment.status}
                color={payment.status === 'pendiente' ? 'error' : 'success'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UpcomingPayments;