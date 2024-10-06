import React from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const FinanceLearningPlatform = () => {
  const courses = [
    { id: 1, title: 'Introducción a las Finanzas', description: 'Aprende los conceptos básicos de las finanzas personales.', progress: 75 },
    { id: 2, title: 'Inversiones para Principiantes', description: 'Descubre cómo invertir tu dinero de manera efectiva.', progress: 40 },
  ];

  const paths = [
    { id: 1, title: 'Ruta de Inversión', courseCount: 5, hoursCompleted: 15, totalHours: 30 },
    { id: 2, title: 'Gestión Financiera Personal', courseCount: 4, hoursCompleted: 20, totalHours: 25 },
  ];

  return (
    <Container>
      <Box display="flex">
        {/* Barra de Navegación Lateral */}
        <Box width="250px" bgcolor="#2C2C2E" color="#FFFFFF" padding="20px">
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
        <Box flexGrow={1} padding="20px">
          <Typography variant="h4">Cursos que estás tomando</Typography>
          {courses.map((course) => (
            <Box key={course.id} marginBottom="20px" padding="10px" borderRadius="5px" bgcolor="#F5F5F5">
              <Typography variant="h6">{course.title}</Typography>
              <Typography variant="body2">{course.description}</Typography>
              <Typography variant="body2">Progreso: {course.progress}%</Typography>
            </Box>
          ))}

          <Typography variant="h5" marginTop="40px">Mis Rutas</Typography>
          {paths.map((path) => (
            <Box key={path.id} marginBottom="20px" padding="10px" borderRadius="5px" bgcolor="#F5F5F5">
              <Typography variant="h6">{path.title}</Typography>
              <Typography variant="body2">Cursos: {path.courseCount}</Typography>
              <Typography variant="body2">Horas: {path.hoursCompleted} de {path.totalHours}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default FinanceLearningPlatform;
