import React from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';
import LoginForm from '../components/Login/LoginForm';

const LoginPage = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;