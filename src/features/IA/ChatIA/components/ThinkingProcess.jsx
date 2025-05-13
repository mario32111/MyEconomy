import React from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';

const ThinkingProcess = ({ thinking }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Paper 
        elevation={1}
        sx={{ 
          p: 2,
          borderRadius: 2,
          backgroundColor: '#f0f7ff',
          border: '1px dashed',
          borderColor: 'primary.light'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
          <PsychologyIcon color="primary" />
          <Typography variant="subtitle2" color="primary">
            Proceso de razonamiento
          </Typography>
        </Box>
        
        <Typography 
          variant="body2" 
          component="pre"
          sx={{ 
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: 'text.secondary',
            mb: 1
          }}
        >
          {thinking}
        </Typography>
        
        <LinearProgress color="primary" />
      </Paper>
    </Box>
  );
};

export default ThinkingProcess;