// src/features/Auth/components/Register/QuestionnaireStep.jsx
import React from 'react';
import { 
  TextField, 
  MenuItem, 
  InputAdornment 
} from '@mui/material';

const QuestionnaireStep = ({ field, value, onChange, error }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      fullWidth
      label={field.label}
      type={field.type}
      select={field.type === 'select'}
      value={value}
      onChange={handleChange}
      required={field.required}
      error={!!error}
      InputProps={field.prefix ? {
        startAdornment: <InputAdornment position="start">{field.prefix}</InputAdornment>
      } : undefined}
    >
      {field.type === 'select' && field.options?.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default QuestionnaireStep;