// src/features/Education/components/CourseList/CourseList.jsx
import React, { useState, useEffect } from 'react';
import { 
  Grid, Box, Typography, Skeleton, 
  FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CourseCard from './CourseCard';
import useCourses from '../../hooks/useCourses';

const CourseList = () => {
  const { getCourses, loading } = useCourses();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData || []); // Asegurarse de que sea un array
        setFilteredCourses(coursesData || []); // Asegurarse de que sea un array
      } catch (error) {
        console.error('Error loading courses:', error);
        setCourses([]); // Establecer un array vacío en caso de error
        setFilteredCourses([]); // Establecer un array vacío en caso de error
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourses();
  }, [getCourses]);

  useEffect(() => {
    // Aplicar filtros cuando cambian los criterios
    if (!courses || courses.length === 0) {
      setFilteredCourses([]);
      return;
    }
    
    let result = [...courses];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        course => 
          course.title.toLowerCase().includes(term) || 
          course.description.toLowerCase().includes(term)
      );
    }
    
    // Filtrar por categoría
    if (categoryFilter !== 'all') {
      result = result.filter(course => course.category === categoryFilter);
    }
    
    // Filtrar por nivel
    if (levelFilter !== 'all') {
      result = result.filter(course => course.level === levelFilter);
    }
    
    setFilteredCourses(result);
  }, [searchTerm, categoryFilter, levelFilter, courses]);

  // Extraer categorías únicas para el filtro
  const categories = courses && courses.length > 0 
    ? ['all', ...new Set(courses.map(course => course.category))]
    : ['all'];
  
  // Extraer niveles únicos para el filtro
  const levels = courses && courses.length > 0
    ? ['all', ...new Set(courses.map(course => course.level))]
    : ['all'];

  // Renderizar esqueletos durante la carga
  if (isLoading || loading) {
    return (
      <Box>
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="rectangular" height={60} />
        </Box>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={220} />
              <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
              <Skeleton variant="text" height={20} width="60%" />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // Renderizar mensaje si no hay cursos
  if (!filteredCourses || filteredCourses.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No se encontraron cursos que coincidan con los criterios de búsqueda.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filtros */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Buscar cursos"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, minWidth: '200px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel id="category-filter-label">Categoría</InputLabel>
          <Select
            labelId="category-filter-label"
            value={categoryFilter}
            label="Categoría"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="all">Todas</MenuItem>
            {categories.filter(cat => cat !== 'all').map(category => (
              <MenuItem key={category} value={category}>
                {category === 'basics' ? 'Básicos' : 
                 category === 'budget' ? 'Presupuesto' : 
                 category === 'saving' ? 'Ahorro' : 
                 category === 'investment' ? 'Inversión' : 
                 category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl sx={{ minWidth: '150px' }}>
          <InputLabel id="level-filter-label">Nivel</InputLabel>
          <Select
            labelId="level-filter-label"
            value={levelFilter}
            label="Nivel"
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <MenuItem value="all">Todos</MenuItem>
            {levels.filter(lvl => lvl !== 'all').map(level => (
              <MenuItem key={level} value={level}>
                {level === 'beginner' ? 'Principiante' : 
                 level === 'intermediate' ? 'Intermedio' : 
                 level === 'advanced' ? 'Avanzado' : 
                 level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* Lista de cursos */}
      <Grid container spacing={3}>
        {filteredCourses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;