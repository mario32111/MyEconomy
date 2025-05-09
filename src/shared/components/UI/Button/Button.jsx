// src/shared/components/UI/Button/Button.jsx
import React from 'react';
import { Button as MuiButton, IconButton, CircularProgress, styled } from '@mui/material';
import PropTypes from 'prop-types';

// Estilos personalizados para el botón principal
const StyledButton = styled(MuiButton)(({ theme, color, variant, size, rounded }) => ({
  borderRadius: rounded ? '50px' : '8px',
  textTransform: 'none',
  position: 'relative',
  boxShadow: variant === 'contained' ? '0 4px 10px rgba(0,0,0,0.15)' : 'none',
  padding: size === 'large' ? '12px 24px' : size === 'small' ? '6px 16px' : '8px 20px',
  transition: 'all 0.3s ease',
  fontWeight: 500,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: variant === 'contained' ? '0 6px 15px rgba(0,0,0,0.2)' : 'none',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
}));

// Botón circular para iconos
const StyledIconButton = styled(IconButton)(({ theme, size, color }) => ({
  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
}));

export const Button = ({ 
  children, 
  loading = false, 
  startIcon, 
  endIcon, 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium', 
  rounded = false,
  circular = false,
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  // Si es un botón circular, usamos IconButton
  if (circular) {
    return (
      <StyledIconButton
        color={color}
        size={size}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          children
        )}
      </StyledIconButton>
    );
  }

  // Botón normal
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      rounded={rounded}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={startIcon && !loading ? startIcon : undefined}
      endIcon={endIcon && !loading ? endIcon : undefined}
      onClick={onClick}
      type={type}
      {...props}
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
          color="inherit"
        />
      ) : null}
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </span>
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  rounded: PropTypes.bool,
  circular: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;