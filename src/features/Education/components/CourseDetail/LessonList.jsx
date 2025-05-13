// src/features/Education/components/CourseDetail/LessonList.jsx
import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import LessonCard from '../shared/LessonCard';
import ProgressBar from '../shared/ProgressBar';

const LessonList = ({ course, onLessonClick, onStartCourse }) => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <ProgressBar 
          value={course.progress} 
          label="Progreso del curso" 
          height={10}
        />
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Contenido del curso
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {course.lessons.map((lesson) => (
        <LessonCard 
          key={lesson.id}
          lesson={lesson}
          onClick={onLessonClick}
          completed={lesson.completed}
        />
      ))}
      
      {course.progress === 0 && (
        <Button 
          variant="contained" 
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onStartCourse}
        >
          Comenzar curso
        </Button>
      )}
    </Box>
  );
};

export default LessonList;