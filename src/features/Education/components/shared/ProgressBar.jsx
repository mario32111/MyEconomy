// src/features/Education/components/shared/ProgressBar.jsx
import React from 'react';
import { Box, Typography, LinearProgress, Stack } from '@mui/material';

const ProgressBar = ({ 
  value = 0, 
  label = 'Progreso', 
  showPercentage = true,
  height = 8,
  color = 'primary',
  sx = {}
}) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  return (
    <Box sx={{ width: '100%', ...sx }}>
      {label && (
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          
          {showPercentage && (
            <Typography variant="body2" fontWeight="medium">
              {normalizedValue}%
            </Typography>
          )}
        </Stack>
      )}
      
      <LinearProgress
        variant="determinate"
        value={normalizedValue}
        sx={{ 
          height, 
          borderRadius: height / 2,
          backgroundColor: `${color}.light`,
          '& .MuiLinearProgress-bar': {
            backgroundColor: `${color}.main`,
          }
        }}
      />
    </Box>
  );
};

export default ProgressBar;