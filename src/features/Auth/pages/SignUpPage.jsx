import React from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';
import SignUpForm from '../components/SignUp/SignUpForm';

const SignUpPage = () => {
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
            Crear Cuenta
          </Typography>
          <SignUpForm />
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUpPage;