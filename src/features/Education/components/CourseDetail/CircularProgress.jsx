// src/features/Education/components/CourseDetail/CircularProgress.jsx
import React from 'react';
import { Box, CircularProgress as MuiCircularProgress, Typography } from '@mui/material';

const CircularProgress = ({ value = 0, size = 40, thickness = 4, ...props }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', ...props.sx }}>
      <MuiCircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgress;