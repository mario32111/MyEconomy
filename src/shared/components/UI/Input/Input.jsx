// src/shared/components/UI/Input/Input.jsx
import React, { useState } from 'react';
import { 
  TextField, 
  InputAdornment, 
  IconButton, 
  FormControl, 
  FormHelperText,
  styled 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PropTypes from 'prop-types';

// Estilos personalizados para el input
const StyledTextField = styled(TextField)(({ theme, rounded }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: rounded ? '50px' : '8px',
    transition: 'all 0.3s ease',
    '&.Mui-focused': {
      boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.25)',
    },
  },
  '& .MuiInputLabel-root': {
    transition: 'all 0.3s ease',
  },
}));

export const Input = ({ 
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  startAdornment,
  endAdornment,
  fullWidth = true,
  required = false,
  disabled = false,
  multiline = false,
  rows,
  maxRows,
  rounded = false,
  name,
  autoComplete,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Manejar la visibilidad de la contraseña
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Determinar el tipo de input para contraseñas
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  
  // Configurar adornos para el input
  const startAdornmentElement = startAdornment ? {
    startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>
  } : {};
  
  // Configurar el adorno final, incluyendo el botón de mostrar/ocultar contraseña si es necesario
  const endAdornmentElement = {
    endAdornment: (
      <InputAdornment position="end">
        {type === 'password' && (
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
            size="small"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )}
        {endAdornment}
      </InputAdornment>
    )
  };

  return (
    <FormControl fullWidth={fullWidth} error={!!error}>
      <StyledTextField
        label={label}
        type={inputType}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        placeholder={placeholder}
        InputProps={{
          ...startAdornmentElement,
          ...(endAdornment || type === 'password' ? endAdornmentElement : {})
        }}
        fullWidth={fullWidth}
        required={required}
        disabled={disabled}
        multiline={multiline}
        rows={rows}
        maxRows={maxRows}
        rounded={rounded}
        name={name}
        autoComplete={autoComplete}
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  placeholder: PropTypes.string,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  maxRows: PropTypes.number,
  rounded: PropTypes.bool,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default Input;