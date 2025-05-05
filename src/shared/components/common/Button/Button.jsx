import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MuiButton)(({ theme, variant = 'contained' }) => ({
  borderRadius: '8px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: variant === 'contained' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
  '&:hover': {
    boxShadow: variant === 'contained' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
  },
}));

const Button = ({ 
  children, 
  variant = 'contained', 
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;