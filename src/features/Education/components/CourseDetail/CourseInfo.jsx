// src/features/Education/components/CourseDetail/CourseInfo.jsx
import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import { School, AccessTime, BarChart } from '@mui/icons-material';

const CourseInfo = ({ course }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Detalles del curso
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <School sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="body2">
            <strong>Categoría:</strong> {course.category}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BarChart sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="body2">
            <strong>Nivel:</strong> {course.level}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTime sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="body2">
            <strong>Duración:</strong> {course.duration}
          </Typography>
        </Box>
        
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Lecciones:</strong> {course.lessonsCount}
          </Typography>
          <Typography variant="body2">
            <strong>Puntos:</strong> {course.points}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CourseInfo;