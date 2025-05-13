// src/features/User/Profile/pages/FinancialProfilePage.jsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import FinancialProfileForm from '../components/FinancialProfileForm';

const FinancialProfilePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Perfil Financiero
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Completa tu perfil financiero para obtener recomendaciones personalizadas y aprovechar al máximo nuestra plataforma.
        </Typography>
        
        <FinancialProfileForm />
      </Box>
    </Container>
  );
};

export default FinancialProfilePage;