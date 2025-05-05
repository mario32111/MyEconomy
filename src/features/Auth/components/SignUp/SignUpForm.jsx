import React from 'react';
import { Box } from '@mui/material';
import RegisterWizard from '../Register/RegisterWizard';

const SignUpForm = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <RegisterWizard />
    </Box>
  );
};

export default SignUpForm;