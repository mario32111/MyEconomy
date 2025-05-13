// src/features/Education/components/Progress/TreeSelection.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Paper, Box, 
  Button, Card, CardContent,
  Skeleton, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useProgress from '../../hooks/useProgress';
import useCourses from '../../hooks/useCourses';

// Importar imágenes
import image1 from '../../../../assets/img/trees/arbol1.jpg';
import image2 from '../../../../assets/img/trees/arbol2.jpg';
import image3 from '../../../../assets/img/trees/arbol3.jpg';
import image4 from '../../../../assets/img/trees/arbol4.jpg';
import image5 from '../../../../assets/img/trees/arbol5.jpg';
// Array de imágenes
const images = [image1, image2, image3, image4, image5];

// Datos de árboles disponibles
const treeTypes = [
  {
    id: 'oak',
    name: 'Roble',
    description: 'Un árbol fuerte y resistente, perfecto para cursos de finanzas básicas',
    stages: [
      { progress: 0, image: images[0] },
      { progress: 25, image: images[1] },
      { progress: 50, image: images[2] },
      { progress: 75, image: images[3] },
      { progress: 100, image: images[4] }
    ]
  },
  {
    id: 'pine',
    name: 'Pino',
    description: 'Crece rápido y constante, ideal para cursos de inversión',
    stages: [
      { progress: 0, image: images[1] },
      { progress: 25, image: images[2] },
      { progress: 50, image: images[3] },
      { progress: 75, image: images[4] },
      { progress: 100, image: images[5] }
    ]
  },
  {
    id: 'maple',
    name: 'Arce',
    description: 'Colorido y llamativo, perfecto para cursos de presupuesto',
    stages: [
      { progress: 0, image: images[2] },
      { progress: 25, image: images[3] },
      { progress: 50, image: images[4] },
      { progress: 75, image: images[5] },
      { progress: 100, image: images[6] }
    ]
  },
  {
    id: 'cherry',
    name: 'Cerezo',
    description: 'Hermoso y delicado, ideal para cursos de ahorro',
    stages: [
      { progress: 0, image: images[3] },
      { progress: 25, image: images[4] },
      { progress: 50, image: images[5] },
      { progress: 75, image: images[6] },
      { progress: 100, image: images[7] }
    ]
  }
];

const TreeSelection = () => {
  const navigate = useNavigate();
  const { saveSelectedTree, getProgress } = useProgress();
  const { getUserCourses } = useCourses();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrees, setSelectedTrees] = useState({});
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const userCourses = await getUserCourses();
        setCourses(userCourses);
        
        // Cargar árboles seleccionados previamente
        const trees = {};
        userCourses.forEach(course => {
          try {
            const savedTree = JSON.parse(localStorage.getItem(`selected_tree_${course.id}`));
            if (savedTree) {
              trees[course.id] = savedTree.id;
            } else {
              // Asignar árbol por defecto basado en categoría
              if (course.category === 'basics') trees[course.id] = 'oak';
              else if (course.category === 'investment') trees[course.id] = 'pine';
              else if (course.category === 'budget') trees[course.id] = 'maple';
              else if (course.category === 'saving') trees[course.id] = 'cherry';
              else trees[course.id] = 'oak'; // Default
            }
          } catch (error) {
            console.error('Error loading tree selection:', error);
            trees[course.id] = 'oak'; // Default
          }
        });
        
        setSelectedTrees(trees);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCourses();
  }, [getUserCourses]);

  const handleTreeSelect = (courseId, treeId) => {
    setSelectedTrees(prev => ({
      ...prev,
      [courseId]: treeId
    }));
  };

  const handleSaveSelections = () => {
    try {
      Object.entries(selectedTrees).forEach(([courseId, treeId]) => {
        const tree = treeTypes.find(t => t.id === treeId);
        if (tree) {
          saveSelectedTree(courseId, tree);
        }
      });
      
      setNotification({
        open: true,
        message: 'Selección de árboles guardada correctamente',
        severity: 'success'
      });
      
      // Redirigir después de un breve retraso
      setTimeout(() => {
        navigate('/education/progress');
      }, 1500);
    } catch (error) {
      console.error('Error saving tree selections:', error);
      setNotification({
        open: true,
        message: 'Error al guardar la selección de árboles',
        severity: 'error'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Selección de Árboles
        </Typography>
        <Grid container spacing={3}>
          {[1, 2].map(i => (
            <Grid item xs={12} key={i}>
              <Paper sx={{ p: 3 }}>
                <Skeleton variant="text" height={40} width="60%" />
                <Skeleton variant="text" height={20} width="40%" />
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    {[1, 2, 3, 4].map(j => (
                      <Grid item xs={6} sm={3} key={j}>
                        <Skeleton variant="rectangular" height={120} />
                        <Skeleton variant="text" height={24} width="80%" sx={{ mt: 1 }} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Personaliza tu Bosque de Conocimiento
      </Typography>
      <Typography variant="body1" paragraph>
        Selecciona un tipo de árbol para cada curso que estás tomando. Cada árbol crecerá a medida que avanzas en el curso.
      </Typography>
      
      {courses.length > 0 ? (
        <>
          {courses.map(course => {
            const progress = getProgress(course.id);
            return (
              <Paper key={course.id} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6">
                  {course.title} - Progreso: {progress}%
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Selecciona un árbol para representar tu progreso en este curso
                </Typography>
                
                <Grid container spacing={2}>
                  {treeTypes.map(tree => {
                    // Encontrar la etapa actual del árbol basada en el progreso
                    const currentStage = tree.stages
                      .filter(stage => stage.progress <= progress)
                      .pop();
                    
                    return (
                      <Grid item xs={6} sm={3} key={tree.id}>
                        <Card 
                          sx={{ 
                            height: '100%',
                            border: selectedTrees[course.id] === tree.id ? 
                              '2px solid #4caf50' : '1px solid #e0e0e0',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={() => handleTreeSelect(course.id, tree.id)}
                        >
                          <Box sx={{ 
                            pt: 2, 
                            display: 'flex', 
                            justifyContent: 'center',
                            height: 120
                          }}>
                            <Box 
                              component="img"
                              src={currentStage?.image || images[0]}
                              alt={tree.name}
                              sx={{ 
                                height: '100%', 
                                objectFit: 'contain',
                                transition: 'transform 0.3s ease',
                                transform: selectedTrees[course.id] === tree.id ? 
                                  'scale(1.05)' : 'scale(1)'
                              }}
                            />
                          </Box>
                          <CardContent sx={{ pt: 1, pb: 1 }}>
                            <Typography variant="subtitle1" align="center">
                              {tree.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                              {tree.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Paper>
            );
          })}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={handleSaveSelections}
            >
              Guardar selección
            </Button>
          </Box>
        </>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" paragraph>
            No estás inscrito en ningún curso todavía
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/education/courses')}
          >
            Explorar cursos
          </Button>
        </Paper>
      )}
      
      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TreeSelection;