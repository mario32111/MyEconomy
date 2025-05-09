// src/features/Landing/components/LandingPage.jsx
import React, { useEffect } from 'react';
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
  Speed,
  Devices,
  CloudSync
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../shared/routes/routes';

// Importar componentes compartidos
import { Button } from '../../../shared/components/UI/Button';
import { Card } from '../../../shared/components/UI/Card';
import Testimonials from './Testimonials';
import PricingSection from './PricingSection';

import image1 from '../../../assets/img/servicios/servicio1.jpg';
import image2 from '../../../assets/img/servicios/servicio2.jpg';
import image3 from '../../../assets/img/servicios/servicio3.jpg';
import image4 from '../../../assets/img/servicios/servicio4.jpg';
import image5 from '../../../assets/img/servicios/servicio5.jpg';
import image6 from '../../../assets/img/servicios/servicio6.jpg';
import image7 from '../../../assets/img/servicios/servicio7.jpg';
import image8 from '../../../assets/img/servicios/servicio8.jpg';

// Array de imágenes
const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ 
      y: -10,
      transition: { duration: 0.2 }
    }}
  >
    <Card
      interactive
      elevation={2}
      rounded
      sx={{
        height: '100%',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(255, 255, 255, 1)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
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
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(10deg)'
            }
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
    </Card>
  </motion.div>
);

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Efecto para asegurar que la página comience desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    },
    {
      icon: <Devices sx={{ fontSize: 40 }} />,
      title: 'Multiplataforma',
      description: 'Accede a tu información financiera desde cualquier dispositivo, en cualquier momento.'
    },
    {
      icon: <CloudSync sx={{ fontSize: 40 }} />,
      title: 'Sincronización Automática',
      description: 'Conecta tus cuentas bancarias y sincroniza automáticamente tus transacciones.'
    }
  ];

  // Datos para la sección "Cómo funciona"
  const howItWorks = [
    {
      step: 1,
      title: "Regístrate gratis",
      description: "Crea tu cuenta en menos de 2 minutos y comienza a explorar todas las funcionalidades.",
      image: images[0],
      color: theme.palette.primary.main
    },
    {
      step: 2,
      title: "Conecta tus cuentas",
      description: "Vincula tus cuentas bancarias de forma segura para sincronizar automáticamente tus transacciones.",
      image: images[1],
      color: theme.palette.secondary.main
    },
    {
      step: 3,
      title: "Analiza tus finanzas",
      description: "Visualiza gráficos y reportes detallados para entender mejor tus hábitos financieros.",
      image: images[2],
      color: theme.palette.success.main
    },
    {
      step: 4,
      title: "Mejora tu economía",
      description: "Recibe recomendaciones personalizadas y establece metas para optimizar tus finanzas.",
      image: images[4],
      color: theme.palette.info.main
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
          color: 'white',
          py: { xs: 4, md: 6 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '80vh', md: '60vh' },
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Elementos decorativos animados */}
        <Box
          component={motion.div}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        
        <Box
          component={motion.div}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
            x: [0, 50, 0]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography 
                  variant={isMobile ? 'h4' : 'h3'}
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ color: 'white' }}
                >
                  Toma el control de tus finanzas
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ mb: 2, opacity: 0.9, color: 'white' }}
                >
                  La plataforma inteligente que te ayuda a gestionar, ahorrar y crecer tu dinero.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    size="medium"
                    variant="contained"
                    color="secondary"
                    rounded
                    onClick={() => navigate('/signup')}
                  >
                    Comenzar Gratis
                  </Button>
                  <Button
                    size="medium"
                    variant="outlined"
                    rounded
                    sx={{ color: 'white', borderColor: 'white' }}
                    onClick={() => navigate('/login')}
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
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.3 }
                }}
              >
                <Box
                  component="img"
                  src="/logoBlanco.png"
                  alt="MyEconomy Logo"
                  sx={{
                    width: '100%',
                    maxWidth: 300,
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: { xs: 3, md: 5 },
          background: 'linear-gradient(to bottom, #f5f7fa, #e4e7eb)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Elementos decorativos */}
        <Box
          component={motion.div}
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          sx={{
            position: 'absolute',
            top: '5%',
            right: '10%',
            width: '100px',
            height: '100px',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            background: `linear-gradient(45deg, ${theme.palette.primary.light}40, ${theme.palette.secondary.light}40)`,
            filter: 'blur(40px)',
            zIndex: 0
          }}
        />
        
        <Box
          component={motion.div}
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '150px',
            height: '150px',
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            background: `linear-gradient(45deg, ${theme.palette.secondary.light}30, ${theme.palette.primary.light}30)`,
            filter: 'blur(50px)',
            zIndex: 0
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h4"
              align="center" 
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 1 }}
            >
              Características Principales
            </Typography>
            
            <Typography 
              variant="body1"
              align="center" 
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}
            >
              Descubre todas las herramientas que tenemos para ayudarte a mejorar tu situación financiera
            </Typography>
          </motion.div>

          <Grid container spacing={2}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <FeatureCard {...feature} delay={index * 0.1} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How it works Section */}
      <Box 
        sx={{ 
          py: { xs: 3, md: 5 },
          background: '#f8f9fa',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h4"
            align="center" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            Cómo funciona
          </Typography>
          
          <Box sx={{ position: 'relative' }}>
            {/* Línea conectora */}
            {!isMobile && (
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '10%',
                  right: '10%',
                  height: '4px',
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  zIndex: 0,
                  transform: 'translateY(-50%)'
                }}
              />
            )}
            
            <Grid container spacing={3}>
              {howItWorks.map((item, index) => (
                <Grid item xs={12} md={3} key={item.step}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      {/* Número de paso */}
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: item.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          margin: '0 auto 15px',
                          boxShadow: `0 5px 15px ${item.color}50`,
                          border: '3px solid white'
                        }}
                      >
                        {item.step}
                      </Box>
                      
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {item.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      
                      {/* Imagen del paso */}
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 2,
                          mt: 1,
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                          border: '3px solid white'
                        }}
                        onError={(e) => {
                          // Fallback para imágenes que no cargan
                          e.target.style.display = 'none';
                        }}
                      />
                    <img
                        src={item.image}
                    />
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 3, md: 5 }, background: 'white' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4"
            align="center" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            Lo que dicen nuestros usuarios
          </Typography>
          <Testimonials />
        </Container>
      </Box>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section con Parallax */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(/src/assets/img/fondo3.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(1px)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h5"
              color="white" 
              fontWeight="bold"
              gutterBottom
            >
              ¿Listo para transformar tus finanzas?
            </Typography>
            <Typography 
              variant="body2"
              color="white" 
              align="center" 
              sx={{ mb: 2, maxWidth: 800, mx: 'auto' }}
            >
              Comienza hoy mismo y da el primer paso hacia tu libertad financiera.
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2}
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                rounded
                onClick={() => navigate(ROUTES.AUTH.SIGNUP)}
              >
                Crear Cuenta Gratis
              </Button>
              <Button
                size="medium"
                variant="outlined"
                rounded
                sx={{ color: 'white', borderColor: 'white' }}
                onClick={() => navigate('/contact')}
              >
                Contactar Soporte
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;