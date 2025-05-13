// Update CourseCard to use LazyImage
// src/features/Education/components/CourseList/CourseCard.jsx

import React from 'react';
import { Card, CardContent, CardActionArea, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../UI/LazyImage';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/education/courses/${course.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <LazyImage 
          src={course.image} 
          alt={course.title}
          aspectRatio="16/9"
          height="140px"
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="h2" gutterBottom noWrap>
            {course.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
            {course.description.length > 100 
              ? `${course.description.substring(0, 100)}...` 
              : course.description}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
            <Chip 
              label={course.level === 'beginner' ? 'Principiante' : 
                    course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'} 
              size="small"
              color={course.level === 'beginner' ? 'success' : 
                    course.level === 'intermediate' ? 'primary' : 'secondary'}
              variant="outlined"
            />
            <Typography variant="caption" color="text.secondary">
              {course.duration}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;