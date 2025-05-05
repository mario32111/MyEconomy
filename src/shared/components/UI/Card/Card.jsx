import React from 'react';
import { Card as MuiCard } from '@mui/material';

export const Card = ({ children, ...props }) => {
  return (
    <MuiCard
      {...props}
      sx={{
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        ...props.sx
      }}
    >
      {children}
    </MuiCard>
  );
};