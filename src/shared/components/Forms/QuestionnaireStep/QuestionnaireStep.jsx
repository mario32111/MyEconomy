// src/shared/components/Forms/QuestionnaireStep/QuestionnaireStep.jsx
import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

const QuestionnaireStep = ({ step, userData, setUserData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {step.title}
      </Typography>
      
      {step.fields.map((field) => (
        <TextField
          key={field.name}
          fullWidth
          margin="normal"
          name={field.name}
          label={field.label}
          type={field.type}
          value={userData[field.name] || ''}
          onChange={handleChange}
          required={field.required}
          select={field.type === 'select'}
          InputProps={field.prefix ? {
            startAdornment: <InputAdornment position="start">{field.prefix}</InputAdornment>,
          } : undefined}
        >
          {field.type === 'select' && field.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      ))}
    </Box>
  );
};

export default QuestionnaireStep;