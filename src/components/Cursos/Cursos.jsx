import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';

const FinanceLearningPlatform = () => {
  const courses = [
    { id: 1, title: 'Introducción a las Finanzas', description: 'Aprende los conceptos básicos de las finanzas personales.', progress: 75, preview: 'https://via.placeholder.com/300x150' },
    { id: 2, title: 'Inversiones para Principiantes', description: 'Descubre cómo invertir tu dinero de manera efectiva.', progress: 40, preview: 'https://via.placeholder.com/300x150' },
    { id: 3, title: 'Gestión Financiera Avanzada', description: 'Profundiza en técnicas avanzadas de gestión financiera.', progress: 50, preview: 'https://via.placeholder.com/300x150' },
    { id: 4, title: 'Ahorro Inteligente', description: 'Aprende a ahorrar de manera eficiente.', progress: 90, preview: 'https://via.placeholder.com/300x150' },
    { id: 5, title: 'Planeación Financiera', description: 'Desarrolla habilidades de planeación financiera.', progress: 60, preview: 'https://via.placeholder.com/300x150' },
    // Puedes agregar más cursos aquí para probar el scroll
    { id: 6, title: 'Finanzas para Emprendedores', description: 'Conceptos clave para gestionar un negocio.', progress: 20, preview: 'https://via.placeholder.com/300x150' },
    { id: 7, title: 'Criptomonedas 101', description: 'Una introducción al mundo de las criptomonedas.', progress: 10, preview: 'https://via.placeholder.com/300x150' },
    { id: 8, title: 'Planificación de Retiro', description: 'Prepárate para el futuro financiero.', progress: 30, preview: 'https://via.placeholder.com/300x150' },
  ];

  const paths = [
    { id: 1, title: 'Ruta de Inversión', courseCount: 5, hoursCompleted: 15, totalHours: 30 },
    { id: 2, title: 'Gestión Financiera Personal', courseCount: 4, hoursCompleted: 20, totalHours: 25 },
  ];

  const menuItems = [
    { icon: <HomeIcon />, text: 'Inicio' },
    { icon: <SchoolIcon />, text: 'Mis Cursos' },
    { icon: <AssessmentIcon />, text: 'Mi Progreso' },
    { icon: <ChatIcon />, text: 'Chat Financiero' },
  ];

  return (
    <Box display="flex" height="100vh">
      {/* Barra de Navegación Lateral */}
      <Box
        width="50px"
        bgcolor="#2C2C2E"
        color="#FFFFFF"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="20px 0"
        height="100%"
      >
        {menuItems.map((item, index) => (
          <Tooltip key={index} title={item.text} placement="right" arrow>
            <ListItem button style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
              {item.icon}
            </ListItem>
          </Tooltip>
        ))}
      </Box>

      {/* Sección Principal */}
      <Box style= {{width: '100vh'}} flexGrow={1} padding="20px" overflow="auto">
        <Typography variant="h4" marginBottom="20px">Cursos que estás tomando</Typography>

        <Box
          style={{
            marginBottom: 0,
            overflowX: 'auto',   // Scroll horizontal
            overflowY: 'hidden',  // Sin scroll vertical
            maxHeight: '300px',   // Altura máxima
            height: '100%',
            whiteSpace: 'nowrap', // Sin salto de línea
            display: 'flex',      // Flex para el desplazamiento horizontal
            gap: '20px',          // Espaciado entre cursos
          }}
        >
          {courses.map((course) => (
            <Box
              key={course.id}
              width="300px"
              padding="10px"
              borderRadius="5px"
              bgcolor="#FFFFFF"
              display="flex"
              flexDirection="column"
              alignItems="center"
              boxShadow={2}
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
