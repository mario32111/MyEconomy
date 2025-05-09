// src/features/Auth/pages/SignUpPage.jsx
import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import SignUpForm from '../components/SignUp/SignUpForm';

const SignUpPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          {!isMobile && (
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ color: 'white', p: 3 }}>
                  <Typography variant="h3" gutterBottom fontWeight="bold">
                    Únete a MyEconomy
                  </Typography>
                  <Typography variant="h6" paragraph>
                    Completa tu registro para comenzar a gestionar tus finanzas de manera inteligente.
                  </Typography>
                  <Typography variant="body1">
                    • Control total de tus gastos e ingresos<br />
                    • Planificación financiera personalizada<br />
                    • Herramientas de ahorro e inversión<br />
                    • Educación financiera a tu alcance
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          )}
          
          <Grid item xs={12} md={isMobile ? 12 : 7}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SignUpForm />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUpPage;