import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const testimonials = [
  {
    name: "Ana García",
    role: "Emprendedora",
    comment: "MyEconomy me ayudó a organizar mis finanzas personales y de mi negocio.",
    avatar: "/avatars/ana.jpg"
  },
  {
    name: "Carlos Rodríguez",
    role: "Profesional",
    comment: "Gracias a esta app, logré alcanzar mi meta de ahorro para mi casa.",
    avatar: "/avatars/carlos.jpg"
  },
  {
    name: "María López",
    role: "Estudiante",
    comment: "Una herramienta perfecta para aprender a manejar mi dinero desde joven.",
    avatar: "/avatars/maria.jpg"
  }
];

const Testimonials = () => {
  return (
    <Grid container spacing={4} sx={{ py: 8 }}>
      {testimonials.map((testimonial, index) => (
        <Grid item xs={12} md={4} key={index}>
          <TestimonialCard>
            <Avatar
              src={testimonial.avatar}
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {testimonial.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {testimonial.role}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                "{testimonial.comment}"
              </Typography>
            </CardContent>
          </TestimonialCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Testimonials;