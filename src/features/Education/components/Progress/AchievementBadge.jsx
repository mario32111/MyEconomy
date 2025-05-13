import React from 'react';
import { Box, Typography, Tooltip, Paper } from '@mui/material';

const AchievementBadge = ({ achievement }) => {
  return (
    <Tooltip 
      title={
        <Box>
          <Typography variant="subtitle2">{achievement.title}</Typography>
          <Typography variant="body2">{achievement.description}</Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
            Desbloqueado el {new Date(achievement.unlockedAt).toLocaleDateString()}
          </Typography>
        </Box>
      }
      arrow
    >
      <Paper 
        elevation={2}
        sx={{ 
          p: 2, 
          textAlign: 'center',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }}
      >
        <Box 
          component="img"
          src={achievement.icon}
          alt={achievement.title}
          sx={{ 
            width: 60, 
            height: 60, 
            objectFit: 'contain',
            mb: 1
          }}
        />
        
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block',
            fontWeight: 'medium',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {achievement.title}
        </Typography>
      </Paper>
    </Tooltip>
  );
};

export default AchievementBadge;