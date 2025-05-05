import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import SavingsIcon from '@mui/icons-material/Savings';

const SavingsWidget = () => {
  const progress = 60; // Porcentaje de ahorro

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Ahorros
        </Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={100}
            thickness={4}
            sx={{ color: 'primary.main' }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SavingsIcon color="primary" />
          </Box>
        </Box>
        <Typography variant="h5" sx={{ mt: 2 }}>
          $15,000
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Meta: $25,000
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Has ahorrado el 60% de tu meta
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SavingsWidget;