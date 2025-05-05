import React from 'react';
import { Box } from '@mui/material';
import NavBar from '../Navigation/NavBar';
import Footer from '../Navigation/Footer';

const Layout = ({ children }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <NavBar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;