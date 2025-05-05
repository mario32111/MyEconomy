import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Stack,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { 
  TrendingUp, 
  AccountBalance, 
  School, 
  Psychology,
  Security,
  Speed
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Button } from '../../../shared/components/UI';
import { ROUTES } from '../../../core/constants/routes';
import { useNavigate } from 'react-router-dom';
import Testimonials from './Testimonials';
import PricingSection from './PricingSection';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Box
      sx={{
        p: 3,
        height: '100%',
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        }
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Box
          sx={{
            p: 2,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Stack>
    </Box>
  </motion.div>
);

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Control Financiero',
      description: 'Monitorea tus gastos e ingresos en tiempo real con gráficos intuitivos y reportes detallados.'
    },
    {
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      title: 'Planificación de Ahorro',
      description: 'Establece metas de ahorro y recibe recomendaciones personalizadas para alcanzarlas.'
    },
    {
      icon: <School sx={{ fontSize: 40 }} />,
      title: 'Educación Financiera',
      description: 'Accede a cursos y recursos educativos para mejorar tu conocimiento financiero.'
    },
    {
      icon: <Psychology sx={{ fontSize: 40 }} />,
      title: 'IA Asistente',
      description: 'Obtén consejos personalizados y análisis predictivo con nuestro asistente de IA.'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Seguridad Garantizada',
      description: 'Tus datos financieros están protegidos con la más alta tecnología de encriptación.'
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Rendimiento en Tiempo Real',
      description: 'Visualiza el rendimiento de tus inversiones y gastos en tiempo real.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          color: 'white',
          pt: isMobile ? 8 : 15,
          pb: isMobile ? 10 : 20,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography 
                  variant={isMobile ? 'h3' : 'h2'} 
                  fontWeight="bold" 
                  gutterBottom
                >
                  Toma el control de tus finanzas
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ mb: 4, opacity: 0.9 }}
                >
                  La plataforma inteligente que te ayuda a gestionar, ahorrar y crecer tu dinero.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
                  >
                    Comenzar Gratis
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                    onClick={() => navigate(ROUTES.AUTH.LOGIN)}
                  >
                    Iniciar Sesión
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Aquí puedes agregar una imagen o ilustración */}
                <Box
                  component="img"
                  src="/logoBlanco.png"  // Cambia a una imagen que exista en tu carpeta public
                  alt="Financial Dashboard"
                  sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Decorative shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '5%',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
          }}
        />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 8 }}
          >
            Características Principales
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <FeatureCard {...feature} delay={index * 0.1} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'background.default',
          py: 10
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack spacing={4} alignItems="center" textAlign="center">
              <Typography variant="h4" fontWeight="bold">
                Comienza tu viaje financiero hoy
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Únete a miles de personas que ya están mejorando sus finanzas con MyEconomy
              </Typography>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
                sx={{ px: 6 }}
              >
                Crear Cuenta Gratis
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>
      {/* Testimonials y Pricing */}
      <Testimonials />
      <PricingSection />
    </Box>
  );
};

export default LandingPage;