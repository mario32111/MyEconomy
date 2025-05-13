// src/features/Education/components/shared/LessonCard.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea, Chip, Stack } from '@mui/material';
import { PlayCircleOutline, CheckCircle, AccessTime } from '@mui/icons-material';

const LessonCard = ({ lesson, onClick, completed = false }) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        border: '1px solid',
        borderColor: completed ? 'success.light' : 'divider',
        backgroundColor: completed ? 'success.50' : 'background.paper'
      }}
    >
      <CardActionArea onClick={() => onClick && onClick(lesson)}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box sx={{ color: completed ? 'success.main' : 'primary.main', mt: 0.5 }}>
              {completed ? <CheckCircle fontSize="large" /> : <PlayCircleOutline fontSize="large" />}
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" component="h3" gutterBottom>
                {lesson.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {lesson.description}
              </Typography>
              
              <Stack direction="row" spacing={1}>
                <Chip 
                  icon={<AccessTime fontSize="small" />} 
                  label={lesson.duration} 
                  size="small" 
                  variant="outlined"
                />
                <Chip 
                  label={lesson.type} 
                  size="small" 
                  variant="outlined"
                />
                {completed && (
                  <Chip 
                    label="Completado" 
                    size="small" 
                    color="success"
                  />
                )}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LessonCard;