// src/features/Landing/components/Testimonials.jsx
import React from 'react';
import { Typography, Avatar, Grid, Box, Rating } from '@mui/material';
import { motion } from 'framer-motion';
// Importar nuestro Card personalizado
import { Card } from '../../../shared/components/UI/Card';

const testimonials = [
  {
    name: "Ana García",
    role: "Emprendedora",
    comment: "MyEconomy me ayudó a organizar mis finanzas personales y de mi negocio. La visualización de datos es increíble y me ha permitido tomar mejores decisiones.",
    avatar: null, // Usaremos iniciales en lugar de imágenes
    rating: 5,
    color: '#4CAF50'
  },
  {
    name: "Carlos Rodríguez",
    role: "Profesional",
    comment: "Gracias a esta app, logré alcanzar mi meta de ahorro para mi casa en la mitad del tiempo que había planeado. Las recomendaciones personalizadas fueron clave.",
    avatar: null,
    rating: 5,
    color: '#2196F3'
  },
  {
    name: "María López",
    role: "Estudiante",
    comment: "Una herramienta perfecta para aprender a manejar mi dinero desde joven. Los cursos de educación financiera son muy completos y fáciles de entender.",
    avatar: null,
    rating: 4,
    color: '#9C27B0'
  },
  {
    name: "Roberto Méndez",
    role: "Inversionista",
    comment: "El seguimiento de inversiones y la proyección de rendimientos me ha ayudado a diversificar mi portafolio de manera más efectiva.",
    avatar: null,
    rating: 5,
    color: '#FF5722'
  }
];

// Función para obtener iniciales
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const Testimonials = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <Card
                interactive
                rounded
                elevation={2}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 1)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Avatar
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 2,
                    bgcolor: testimonial.color,
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {getInitials(testimonial.name)}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {testimonial.role}
                </Typography>
                <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary" align="center">
                  "{testimonial.comment}"
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;