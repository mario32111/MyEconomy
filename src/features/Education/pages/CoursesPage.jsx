// src/features/Education/pages/CoursesPage.jsx
import React, { useState } from 'react';
import { 
  Container, Typography, Grid, Card, CardContent, 
  CardMedia, Box, Chip, Button, TextField, 
  InputAdornment, MenuItem, Select, FormControl,
  InputLabel, Divider, Rating, CardActionArea
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useCourses from '../hooks/useCourses';
import useProgress from '../hooks/useProgress';

const CoursesPage = () => {
  const { courses, loading } = useCourses();
  const { getProgress } = useProgress();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  
  // Categorías disponibles
  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'basics', label: 'Fundamentos básicos' },
    { value: 'budgeting', label: 'Presupuesto' },
    { value: 'saving', label: 'Ahorro' },
    { value: 'investing', label: 'Inversión' },
    { value: 'debt', label: 'Manejo de deudas' }
  ];
  
  // Niveles disponibles
  const levels = [
    { value: 'all', label: 'Todos los niveles' },
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' }
  ];
  
  // Filtrar cursos
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  const handleCourseClick = (courseId) => {
    navigate(`/education/courses/${courseId}`);
  };
  
  // Obtener nivel de texto
  const getLevelText = (level) => {
    switch(level) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      default: return level;
    }
  };
  
  // Obtener categoría de texto
  const getCategoryText = (category) => {
    switch(category) {
      case 'basics': return 'Fundamentos básicos';
      case 'budgeting': return 'Presupuesto';
      case 'saving': return 'Ahorro';
      case 'investing': return 'Inversión';
      case 'debt': return 'Manejo de deudas';
      default: return category;
    }
  };
  
  // Obtener color de chip según categoría
  const getCategoryColor = (category) => {
    switch(category) {
      case 'basics': return 'primary';
      case 'budgeting': return 'secondary';
      case 'saving': return 'success';
      case 'investing': return 'warning';
      case 'debt': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cursos Disponibles
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Explora nuestra colección de cursos para mejorar tus conocimientos financieros
      </Typography>
      
      {/* Filtros */}
      <Box sx={{ mb: 4, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="category-filter-label">Categoría</InputLabel>
              <Select
                labelId="category-filter-label"
                value={categoryFilter}
                label="Categoría"
                onChange={(e) => setCategoryFilter(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                }
              >
                {categories.map(category => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="level-filter-label">Nivel</InputLabel>
              <Select
                labelId="level-filter-label"
                value={levelFilter}
                label="Nivel"
                onChange={(e) => setLevelFilter(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <SchoolIcon />
                  </InputAdornment>
                }
              >
                {levels.map(level => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      {/* Lista de cursos */}
      <Grid container spacing={3}>
        {filteredCourses.map(course => {
          const progress = getProgress(course.id);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea onClick={() => handleCourseClick(course.id)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image || `https://source.unsplash.com/random/300x200?finance&sig=${course.id}`}
                    alt={course.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 1 }}>
                      <Chip 
                        label={getCategoryText(course.category)} 
                        size="small" 
                        color={getCategoryColor(course.category)}
                        sx={{ mr: 1 }}
                      />
                      <Chip 
                        label={getLevelText(course.level)} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                    
                    <Typography variant="h6" component="h2" gutterBottom>
                      {course.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {course.description.length > 100 
                        ? `${course.description.substring(0, 100)}...` 
                        : course.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {course.duration || '2-3 horas'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating 
                        value={course.rating || 4.5} 
                        precision={0.5} 
                        size="small" 
                        readOnly 
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({course.reviews || Math.floor(Math.random() * 100) + 10})
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                
                <Divider />
                
                <Box sx={{ p: 2, mt: 'auto' }}>
                  {progress > 0 ? (
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => handleCourseClick(course.id)}
                      color={progress >= 100 ? "success" : "primary"}
                    >
                      {progress >= 100 ? "Completado" : `Continuar (${progress}%)`}
                    </Button>
                  ) : (
                    <Button 
                      variant="outlined" 
                      fullWidth
                      onClick={() => handleCourseClick(course.id)}
                    >
                      Comenzar curso
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          );
        })}
        
        {filteredCourses.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No se encontraron cursos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Intenta con otros filtros o términos de búsqueda
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CoursesPage;