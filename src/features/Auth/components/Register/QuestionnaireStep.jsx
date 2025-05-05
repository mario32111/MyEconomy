import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';

const QuestionnaireStep = ({ step, userData, setUserData }) => {
  const handleChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {step.title}
      </Typography>
      <Stack spacing={3}>
        {step.fields.map((field) => (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            type={field.type}
            select={field.type === 'select'}
            value={userData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
            InputProps={field.prefix ? {
              startAdornment: <InputAdornment position="start">{field.prefix}</InputAdornment>
            } : undefined}
          >
            {field.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        ))}
      </Stack>
    </Box>
  );
};

export default QuestionnaireStep;