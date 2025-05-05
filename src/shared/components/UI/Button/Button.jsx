import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';

export const Button = ({ children, loading, ...props }) => {
  return (
    <MuiButton
      disabled={loading}
      {...props}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        position: 'relative',
        ...props.sx
      }}
    >
      {loading ? (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px'
          }}
        />
      ) : null}
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </span>
    </MuiButton>
  );
};