import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  error = false,
  helperText = '',
  fullWidth = true,
  disabled = false,
  multiline = false,
  rows = 1,
  ...props
}) => {
  return (
    <StyledTextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      {...props}
    />
  );
};

export default Input;