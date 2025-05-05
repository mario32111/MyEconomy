import React from 'react';
import { TextField } from '@mui/material';

export const Input = (props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
        ...props.sx
      }}
    />
  );
};