import React from 'react';
import { Box, Container } from '@mui/material';
import ProgressDashboard from '../components/Progress/ProgressDashboard';

// Componente simplificado que solo renderiza el dashboard
const ProgressPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <ProgressDashboard />
      </Box>
    </Container>
  );
};

export default ProgressPage;