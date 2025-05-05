import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LinearProgress from '@mui/material/LinearProgress';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import FlightIcon from '@mui/icons-material/Flight';
import LaptopIcon from '@mui/icons-material/Laptop';

const goals = [
  {
    name: 'Carro nuevo',
    current: 45000,
    target: 250000,
    progress: 18,
    icon: <DirectionsCarIcon />
  },
  {
    name: 'Enganche casa',
    current: 150000,
    target: 500000,
    progress: 30,
    icon: <HomeIcon />
  },
  {
    name: 'Vacaciones',
    current: 15000,
    target: 30000,
    progress: 50,
    icon: <FlightIcon />
  },
  {
    name: 'Laptop nueva',
    current: 12000,
    target: 25000,
    progress: 48,
    icon: <LaptopIcon />
  }
];

const GoalsWidget = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Metas Financieras
        </Typography>
        <List>
          {goals.map((goal, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {goal.icon}
              </ListItemIcon>
              <ListItemText
                primary={goal.name}
                secondary={
                  <>
                    <LinearProgress 
                      variant="determinate" 
                      value={goal.progress} 
                      sx={{ my: 1 }}
                    />
                    <Typography variant="caption" component="div">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default GoalsWidget;