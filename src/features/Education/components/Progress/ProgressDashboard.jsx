// src/features/Education/components/Progress/ProgressDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Paper, 
  LinearProgress, Divider, Card, CardContent,
  CircularProgress
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import useCourses from '../../hooks/useCourses';
import useProgress from '../../hooks/useProgress';

const ProgressDashboard = () => {
  const { courses = [] } = useCourses();
  const { getProgress, getOverallProgress } = useProgress();
  const [overallProgress, setOverallProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Función local para obtener logros
  const getLocalAchievements = () => {
    try {
      return JSON.parse(localStorage.getItem('achievements') || '[]');
    } catch (error) {
      console.error('Error getting achievements:', error);
      return [];
    }
  };

  useEffect(() => {
    // Usar un flag para evitar actualizaciones después de desmontar
    let isMounted = true;
    
    const loadData = async () => {
      try {
        if (isMounted) {
          const progress = getOverallProgress();
          setOverallProgress(progress);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading progress data:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadData();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [getOverallProgress]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Calcular estadísticas
  const completedCourses = courses.filter(course => getProgress(course.id) >= 100).length;
  const inProgressCourses = courses.filter(course => getProgress(course.id) > 0 && getProgress(course.id) < 100).length;
  
  // Obtener curso con mayor progreso
  const currentCourse = courses.length > 0 ? courses.reduce((prev, current) => {
    const prevProgress = getProgress(prev?.id || '') || 0;
    const currentProgress = getProgress(current?.id || '') || 0;
    
    if (currentProgress < 100 && currentProgress > 0 && (prevProgress === 100 || currentProgress > prevProgress)) {
      return current;
    }
    return prev;
  }, courses[0]) : null;

  return (
    <Box>
      {/* Progreso general */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Progreso general
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={overallProgress || 0} 
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Typography variant="h6" color={overallProgress >= 100 ? 'success.main' : 'primary.main'}>
            {overallProgress || 0}%
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {overallProgress < 100 
            ? `Continúa aprendiendo para alcanzar el 100%`
            : `¡Felicidades! Has completado todos los cursos disponibles`}
        </Typography>
      </Paper>
      
      {/* Estadísticas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" gutterBottom>
                {courses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cursos disponibles
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" gutterBottom>
                {completedCourses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cursos completados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUpIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" gutterBottom>
                {inProgressCourses}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cursos en progreso
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Curso actual */}
      {currentCourse && getProgress(currentCourse.id) > 0 && getProgress(currentCourse.id) < 100 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Continúa aprendiendo
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {currentCourse.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {currentCourse.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ flexGrow: 1, mr: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={getProgress(currentCourse.id)} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {getProgress(currentCourse.id)}%
              </Typography>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Typography 
                variant="body2" 
                color="primary"
                component="a"
                href={`/education/courses/${currentCourse.id}`}
                sx={{ textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Continuar curso →
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ProgressDashboard;