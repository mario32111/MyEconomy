import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import RegisterWizard from '../components/Register/RegisterWizard';

const Register = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <RegisterWizard />
      </Paper>
    </Container>
  );
};

export default Register;