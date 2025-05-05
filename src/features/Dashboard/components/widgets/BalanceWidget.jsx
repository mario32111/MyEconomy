import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const BalanceWidget = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Balance Total
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="h4" component="div">
            $25,840.50
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <TrendingUpIcon color="success" />
            <Typography variant="body2" color="success.main" sx={{ ml: 0.5 }}>
              +6.12%
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          vs mes anterior
        </Typography>
        <Box sx={{ mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={70} 
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary">
            70% de tu meta mensual
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BalanceWidget;