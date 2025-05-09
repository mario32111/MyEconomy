// src/shared/components/Navigation/NavBarComponents/BreadcrumbSection.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link as RouterLink } from 'react-router-dom';

const BreadcrumbSection = ({ pageTitle, pageDescription }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: 1,
            '&:hover': {
              color: 'primary.dark',
            }
          }}
        >
          MyEconomy
        </Typography>
        
        {pageTitle && (
          <>
            <ChevronRightIcon sx={{ mx: 1, color: 'text.secondary' }} />
            <Typography variant="h6" color="text.primary">
              {pageTitle}
            </Typography>
          </>
        )}
      </Box>
      
      {/* Descripción de la página */}
      {pageDescription && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mt: 0.5, display: { xs: 'none', sm: 'block' } }}
        >
          {pageDescription}
        </Typography>
      )}
    </Box>
  );
};

export default BreadcrumbSection;