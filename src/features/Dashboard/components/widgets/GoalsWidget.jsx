import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  LinearProgress, 
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Datos de ejemplo para metas
const mockGoals = [
  { id: 1, name: 'Fondo de emergencia', target: 50000, current: 25000, color: '#4CAF50' },
  { id: 2, name: 'Vacaciones', target: 20000, current: 5000, color: '#2196F3' },
  { id: 3, name: 'Nuevo auto', target: 200000, current: 40000, color: '#9C27B0' }
];

const GoalsWidget = ({ userId }) => {
  const [goals, setGoals] = useState([]);
  
  useEffect(() => {
    // Aquí se cargarían las metas reales del usuario
    // Por ahora usamos datos de ejemplo
    setGoals(mockGoals);
  }, [userId]);
  
  // Formatear números como moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            Metas Financieras
          </Typography>
          <Button 
            size="small" 
            startIcon={<AddIcon />}
            variant="outlined"
          >
            Nueva Meta
          </Button>
        </Box>
        
        {goals.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No hay metas configuradas
            </Typography>
          </Box>
        ) : (
          <List sx={{ width: '100%' }}>
            {goals.map((goal, index) => {
              const progress = Math.min(Math.round((goal.current / goal.target) * 100), 100);
              
              return (
                <React.Fragment key={goal.id}>
                  {index > 0 && <Divider sx={{ my: 1 }} />}
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle2">{goal.name}</Typography>
                          <Typography variant="subtitle2">{progress}%</Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ width: '100%', mt: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={progress} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: goal.color
                              }
                            }} 
                          />
                          <Box display="flex" justifyContent="space-between" mt={0.5}>
                            <Typography variant="caption" color="text.secondary">
                              {formatCurrency(goal.current)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatCurrency(goal.target)}
                            </Typography>
                          </Box>
                        </Box>
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

export default GoalsWidget;