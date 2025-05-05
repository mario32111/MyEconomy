import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      {/* Aquí irá el contenido del dashboard */}
    </Container>
  );
};

export default Dashboard;