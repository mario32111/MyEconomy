import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const FinanceLearningPlatform = () => {
  const courses = [
    { id: 1, title: 'Introducción a las Finanzas', description: 'Aprende los conceptos básicos de las finanzas personales.', progress: 75, preview: 'https://via.placeholder.com/300x150' },
    { id: 2, title: 'Inversiones para Principiantes', description: 'Descubre cómo invertir tu dinero de manera efectiva.', progress: 40, preview: 'https://via.placeholder.com/300x150' },
  ];

  const paths = [
    { id: 1, title: 'Ruta de Inversión', courseCount: 5, hoursCompleted: 15, totalHours: 30 },
    { id: 2, title: 'Gestión Financiera Personal', courseCount: 4, hoursCompleted: 20, totalHours: 25 },
  ];

  return (
    <Box display="flex" height="100vh">
      {/* Barra de Navegación Lateral */}
      <Box width="250px" bgcolor="#2C2C2E" color="#FFFFFF" padding="20px" height="100%">
        <Typography variant="h6">Menú</Typography>
        <List>
          <ListItem button>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Mis Cursos" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Mi Progreso" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Chat Financiero" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Notificaciones" />
          </ListItem>
        </List>
      </Box>

      {/* Sección Principal */}
      <Box flexGrow={1} padding="20px" overflow="auto">
        <Typography variant="h4" marginBottom="20px">Cursos que estás tomando</Typography>
        <Box display="flex" flexWrap="wrap" gap="20px">
          {courses.map((course) => (
            <Box
              key={course.id}
              width="300px"
              padding="10px"
              borderRadius="5px"
              bgcolor="#F5F5F5"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <img
                src={course.preview}
                alt={`${course.title} preview`}
                style={{ width: '100%', borderRadius: '5px', marginBottom: '10px' }}
              />
              <Typography variant="h6">{course.title}</Typography>
              <Typography variant="body2" marginBottom="10px">{course.description}</Typography>
              <Typography variant="body2">Progreso: {course.progress}%</Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="h5" marginTop="40px" marginBottom="20px">Mis Rutas</Typography>
        {paths.map((path) => (
          <Box key={path.id} marginBottom="20px" padding="10px" borderRadius="5px" bgcolor="#F5F5F5">
            <Typography variant="h6">{path.title}</Typography>
            <Typography variant="body2">Cursos: {path.courseCount}</Typography>
            <Typography variant="body2">Horas: {path.hoursCompleted} de {path.totalHours}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FinanceLearningPlatform;
