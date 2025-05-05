import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar
} from '@mui/material';
import {
  DirectionsCar,
  Home,
  Flight,
  Laptop
} from '@mui/icons-material';

const goals = [
  {
    id: 1,
    name: 'Carro nuevo',
    current: 45000,
    goal: 250000,
    icon: <DirectionsCar />,
    progress: 18,
    color: '#2196F3'
  },
  {
    id: 2,
    name: 'Enganche casa',
    current: 150000,
    goal: 500000,
    icon: <Home />,
    progress: 30,
    color: '#4CAF50'
  },
  {
    id: 3,
    name: 'Vacaciones',
    current: 15000,
    goal: 30000,
    icon: <Flight />,
    progress: 50,
    color: '#FF9800'
  },
  {
    id: 4,
    name: 'Laptop nueva',
    current: 12000,
    goal: 25000,
    icon: <Laptop />,
    progress: 48,
    color: '#9C27B0'
  }
];

const GoalsProgress = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Metas Financieras
        </Typography>

        <List>
          {goals.map((goal) => (
            <ListItem key={goal.id} sx={{ px: 0 }}>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: `${goal.color}15`, color: goal.color }}>
                  {goal.icon}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={goal.name}
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={goal.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: `${goal.color}15`,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: goal.color,
                          borderRadius: 3,
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 0.5,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        ${goal.current.toLocaleString('es-MX')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ${goal.goal.toLocaleString('es-MX')}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default GoalsProgress;