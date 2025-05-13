import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Breadcrumbs, 
  Link, 
  Tabs, 
  Tab, 
  Divider,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MiniChallenge from './MiniChallenge';
import TreeSelection from '../Progress/TreeSelection';
import useCourses from '../../hooks/useCourses';
import useProgress from '../../hooks/useProgress';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourseById } = useCourses();
  const { updateProgress, saveSelectedTree } = useProgress();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTree, setSelectedTree] = useState(null);
  const [showTreeSelection, setShowTreeSelection] = useState(false);
  
  useEffect(() => {
    const loadCourse = async () => {
      const courseData = await getCourseById(courseId);
      setCourse(courseData);
      
      // Check if user has already selected a tree for this course
      const savedTree = localStorage.getItem(`selected_tree_${courseId}`);
      if (savedTree) {
        setSelectedTree(JSON.parse(savedTree));
      } else {
        setShowTreeSelection(true);
      }
    };
    
    loadCourse();
  }, [courseId, getCourseById]);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleTreeSelect = (tree) => {
    setSelectedTree(tree);
    setShowTreeSelection(false);
    saveSelectedTree(courseId, tree);
  };
  
  const handleChallengeComplete = (challengeId) => {
    updateProgress(courseId, 'challenges', challengeId);
  };
  
  const handleStartLesson = (lessonId) => {
    // Navigate to lesson page
    navigate(`/education/courses/${courseId}/lessons/${lessonId}`);
  };
  
  if (!course) {
    return (
      <Container>
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography>Cargando curso...</Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/education/courses" underline="hover" color="inherit">
            Cursos
          </Link>
          <Typography color="text.primary">{course.title}</Typography>
        </Breadcrumbs>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {course.title}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              {course.description}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {course.duration}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SchoolIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {course.lessonsCount} lecciones
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmojiEventsIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {course.challenges?.length || 0} mini retos
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Contenido" />
                <Tab label="Mini Retos" />
                <Tab label="Recursos" />
              </Tabs>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              {activeTab === 0 && (
                <List>
                  {course.lessons.map((lesson, index) => (
                    <Paper 
                      key={lesson.id} 
                      elevation={1}
                      sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}
                    >
                      <ListItem 
                        button
                        onClick={() => handleStartLesson(lesson.id)}
                        sx={{ 
                          p: 0,
                          '&:hover': {
                            backgroundColor: 'action.hover'
                          }
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            width: '100%',
                            p: 2
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {lesson.completed ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <PlayCircleOutlineIcon color="primary" />
                            )}
                          </ListItemIcon>
                          
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1">
                                {index + 1}. {lesson.title}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary">
                                {lesson.duration} • {lesson.type}
                              </Typography>
                            }
                          />
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                              variant={lesson.completed ? "outlined" : "contained"}
                              color={lesson.completed ? "success" : "primary"}
                              size="small"
                            >
                              {lesson.completed ? "Repasar" : "Comenzar"}
                            </Button>
                          </Box>
                        </Box>
                      </ListItem>
                    </Paper>
                  ))}
                </List>
              )}
              
              {activeTab === 1 && (
                <Box>
                  {course.challenges?.length > 0 ? (
                    course.challenges.map((challenge) => (
                      <MiniChallenge 
                        key={challenge.id} 
                        challenge={challenge}
                        onComplete={handleChallengeComplete}
                      />
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                      Este curso no tiene mini retos disponibles.
                    </Typography>
                  )}
                </Box>
              )}
              
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Recursos adicionales
                  </Typography>
                  
                  {course.resources?.length > 0 ? (
                    course.resources.map((resource, index) => (
                      <Accordion key={index} sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>{resource.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" paragraph>
                            {resource.description}
                          </Typography>
                          <Button 
                            variant="outlined" 
                            href={resource.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver recurso
                          </Button>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                      Este curso no tiene recursos adicionales disponibles.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                borderRadius: 2,
                position: 'sticky',
                top: 24
              }}
            >
              <Typography variant="h6" gutterBottom>
                Tu progreso
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Completado</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {course.progress}%
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: 8, 
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                >
                  <Box 
                    sx={{ 
                      width: `${course.progress}%`, 
                      height: '100%', 
                      backgroundColor: 'primary.main',
                      borderRadius: 4
                    }}
                  />
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              {selectedTree ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Tu árbol de progreso
                  </Typography>
                  
                  <Box 
                    component="img"
                    src={selectedTree.stages[Math.floor(course.progress / 25)]}
                    alt="Árbol de progreso"
                    sx={{ 
                      width: '100%', 
                      maxHeight: 200, 
                      objectFit: 'contain',
                      my: 2
                    }}
                  />
                  
                  <Typography variant="body2" color="text.secondary">
                    {selectedTree.name} - Nivel {Math.floor(course.progress / 25) + 1}
                  </Typography>
                  
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => setShowTreeSelection(true)}
                    sx={{ mt: 2 }}
                  >
                    Cambiar árbol
                  </Button>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Selecciona un árbol para visualizar tu progreso
                  </Typography>
                  
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => setShowTreeSelection(true)}
                    sx={{ mt: 2 }}
                  >
                    Seleccionar árbol
                  </Button>
                </Box>
              )}
              
              {showTreeSelection && (
                <TreeSelection 
                  onSelect={handleTreeSelect}
                  onCancel={() => setShowTreeSelection(false)}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CourseDetail;