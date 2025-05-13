// CourseDetailPage.jsx - Versión corregida
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Paper, Stepper,
  Step, StepLabel, Button, Grid, Divider,
  Card, CardContent, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, CircularProgress as MuiCircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useCourses from '../hooks/useCourses';
import useProgress from '../hooks/useProgress';
import LessonContent from '../components/CourseDetail/LessonContent';
import CircularProgress from '../components/CourseDetail/CircularProgress';
import coursesData from '../data/coursesData'; // Importar directamente los datos

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourseById } = useCourses();
  const { getProgress, updateProgress, markLessonComplete, saveSelectedTree, getSelectedTree } = useProgress();
  
  const [course, setCourse] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [showCongrats, setShowCongrats] = useState(false);
  const [showTreeDialog, setShowTreeDialog] = useState(false);
  const [selectedTree, setSelectedTree] = useState('oak');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Usar un efecto de limpieza para evitar actualizaciones de estado en componentes desmontados
    let isMounted = true;
    
    const loadCourseData = async () => {
      try {
        setLoading(true);
        
        // Intentar obtener el curso usando el hook
        let courseData = getCourseById(courseId);
        
        // Si no se encuentra, intentar obtenerlo directamente de coursesData
        if (!courseData) {
          courseData = coursesData.find(c => c.id === courseId);
          
          if (!courseData) {
            console.error('Course not found:', courseId);
            navigate('/education/courses');
            return;
          }
        }
        
        // Verificar si el curso tiene lecciones
        if (!courseData.lessons || courseData.lessons.length === 0) {
          console.error('Course has no lessons:', courseId);
          navigate('/education/courses');
          return;
        }
        
        if (isMounted) {
          setCourse(courseData);
          
          // Cargar progreso guardado
          const progress = getProgress(courseId);
          
          // Verificar si hay un árbol seleccionado
          const savedTree = getSelectedTree(courseId);
          if (savedTree) {
            setSelectedTree(savedTree.id);
          }
          
          if (progress > 0) {
            // Si hay progreso, cargar lecciones completadas
            const completedLessons = JSON.parse(
              localStorage.getItem(`course_${courseId}_completed_lessons`) || '[]'
            );
            
            const completedMap = {};
            completedLessons.forEach(lessonId => {
              const lessonIndex = courseData.lessons.findIndex(lesson => lesson.id === lessonId);
              if (lessonIndex !== -1) {
                completedMap[lessonIndex] = true;
              }
            });
            
            setCompleted(completedMap);
            
            // Establecer el paso activo en la primera lección no completada
            const firstIncomplete = courseData.lessons.findIndex((_, index) => !completedMap[index]);
            if (firstIncomplete !== -1) {
              setActiveStep(firstIncomplete);
            }
          } else {
            // Si es la primera vez que accede al curso, mostrar diálogo de selección de árbol
            const hasSelectedTree = getSelectedTree(courseId);
            if (!hasSelectedTree) {
              setShowTreeDialog(true);
            }
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading course:', error);
        if (isMounted) {
          navigate('/education/courses');
        }
      }
    };
    
    loadCourseData();
    
    return () => {
      isMounted = false;
    };
  }, [courseId, getCourseById, getProgress, getSelectedTree, navigate]);
  
  const handleTreeSelect = (treeType) => {
    setSelectedTree(treeType);
  };
  
  const handleNext = () => {
    // Marcar lección actual como completada
    const newCompleted = { ...completed };
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    
    // Actualizar progreso en localStorage
    if (course && course.lessons && course.lessons[activeStep]) {
      // Usar updateProgress con los parámetros correctos
      updateProgress(course.id, 'lessons', course.lessons[activeStep].id);
      
      // Calcular nuevo progreso
      const totalSteps = course.lessons.length;
      const completedSteps = Object.keys(newCompleted).length;
      const newProgress = Math.round((completedSteps / totalSteps) * 100);
      
      // Mostrar mensaje de felicitación si se completó el curso
      if (completedSteps === totalSteps) {
        setShowCongrats(true);
      }
    }
    
    // Avanzar al siguiente paso
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, minHeight: 'calc(100vh - 64px)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <MuiCircularProgress />
        </Box>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, minHeight: 'calc(100vh - 64px)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            Curso no encontrado
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/education/courses')}
            sx={{ mt: 2 }}
          >
            Volver a cursos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: 'calc(100vh - 64px)' }}>
      {/* Resto del código igual que antes */}
      {/* Diálogo de selección de árbol */}
      <Dialog 
        open={showTreeDialog} 
        onClose={() => setShowTreeDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>¡Bienvenido a tu primer curso!</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Antes de comenzar, selecciona un árbol que representará tu progreso de aprendizaje.
            Este árbol crecerá a medida que completes cursos y lecciones.
          </Typography>
          
          {/* Aquí usamos un enfoque simplificado ya que el componente TreeSelection es diferente */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Selecciona un tipo de árbol:
            </Typography>
            <Grid container spacing={2}>
              {['oak', 'pine', 'maple', 'cherry'].map(treeId => (
                <Grid item xs={6} sm={3} key={treeId}>
                  <Card 
                    sx={{ 
                      border: selectedTree === treeId ? '2px solid' : '1px solid',
                      borderColor: selectedTree === treeId ? 'primary.main' : 'divider',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleTreeSelect(treeId)}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" align="center">
                        {treeId === 'oak' ? 'Roble' : 
                         treeId === 'pine' ? 'Pino' : 
                         treeId === 'maple' ? 'Arce' : 'Cerezo'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary"
                disabled={!selectedTree}
                onClick={() => {
                  // Usar la función del hook useProgress
                  saveSelectedTree(courseId, {
                    id: selectedTree,
                    name: selectedTree === 'oak' ? 'Roble' : 
                         selectedTree === 'pine' ? 'Pino' : 
                         selectedTree === 'maple' ? 'Arce' : 'Cerezo'
                  });
                  setShowTreeDialog(false);
                }}
              >
                Confirmar selección
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              // Si no hay árbol seleccionado, establecer uno predeterminado
              if (!getSelectedTree(courseId)) {
                saveSelectedTree(courseId, {
                  id: 'oak',
                  name: 'Roble'
                });
              }
              setShowTreeDialog(false);
            }}
            color="secondary"
          >
            Omitir por ahora
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Alerta de felicitación */}
      {showCongrats && (
        <Alert 
          severity="success" 
          icon={<CheckCircleIcon fontSize="inherit" />}
          onClose={() => setShowCongrats(false)}
          sx={{ mb: 3 }}
        >
          ¡Felicidades! Has completado el curso "{course.title}". Tu árbol ha crecido gracias a tu progreso.
        </Alert>
      )}
      
      {/* Encabezado del curso */}
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/education/courses')}
          sx={{ mb: 2 }}
        >
          Volver a cursos
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom>
          {course.title}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          {course.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Progreso del curso:
          </Typography>
          <CircularProgress 
            value={getProgress(course.id)} 
            size={40}
            thickness={4}
          />
        </Box>
        
        {course.image && (
          <Box 
            sx={{ 
              width: '100%', 
              height: 200, 
              mb: 2,
              overflow: 'hidden',
              borderRadius: 1
            }}
          >
            <img 
              src={course.image} 
              alt={course.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              loading="lazy"
            />
          </Box>
        )}
      </Box>
      
      {/* Contenido del curso */}
      <Grid container spacing={3}>
        {/* Navegación de lecciones */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: { xs: 3, md: 0 }, minHeight: 400 }}>
            <Typography variant="h6" gutterBottom>
              Lecciones
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
              {course.lessons && course.lessons.map((lesson, index) => (
                <Step key={lesson.id} completed={completed[index]}>
                  <StepLabel 
                    onClick={() => handleStepClick(index)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography variant="body2">
                      {lesson.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {lesson.duration}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
        
        {/* Contenido de la lección */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, minHeight: 500 }}>
            {course.lessons && activeStep < course.lessons.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  {course.lessons[activeStep].title}
                </Typography>
                
                <LessonContent 
                  lesson={course.lessons[activeStep]} 
                  courseId={course.id}
                  lessonId={course.lessons[activeStep].id}
                  onComplete={() => {
                    const newCompleted = { ...completed };
                    newCompleted[activeStep] = true;
                    setCompleted(newCompleted);
                    // Usar updateProgress con los parámetros correctos
                    updateProgress(course.id, 'lessons', course.lessons[activeStep].id);
                  }}
                />
                
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Anterior
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  
                  {activeStep === course.lessons.length - 1 ? (
                    <Button 
                      onClick={handleNext}
                      variant="contained"
                      color="success"
                    >
                      Finalizar curso
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNext}
                      variant="contained"
                    >
                      {completed[activeStep] ? 'Siguiente' : 'Completar y continuar'}
                    </Button>
                  )}
                </Box>
              </>
            ) : (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 5 }}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    ¡Felicidades!
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Has completado el curso "{course.title}".
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Tu árbol ha crecido gracias a tu progreso. Sigue aprendiendo para hacerlo crecer más.
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Button 
                      variant="contained" 
                      onClick={() => navigate('/education/courses')}
                      sx={{ mr: 2 }}
                    >
                      Explorar más cursos
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={() => navigate('/education/progress')}
                    >
                      Ver mi progreso
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetailPage;