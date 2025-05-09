// src/shared/components/Navigation/Layout.jsx
import React from 'react';
import { Box, useTheme, useMediaQuery, Container, Fade } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children, maxWidth = "lg", disableContainer = false, hideNavBar = false }) => {
  const theme = useTheme();
  // Usamos estas variables directamente en los estilos
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
    >
      {/* Navbar con efecto de transición, solo si no está oculto */}
      {!hideNavBar && (
        <Fade in={true} timeout={800}>
          <Box>
            <NavBar />
          </Box>
        </Fade>
      )}
      
      {/* Contenido principal con espaciado adaptativo basado en el tamaño de pantalla */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          // Usar las variables directamente para ajustar el padding
          pt: isMobile ? 2 : isTablet ? 3 : 4,
          pb: isMobile ? 4 : isTablet ? 5 : 6,
          background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
        }}
      >
        {/* Opción para usar Container o no, dependiendo de la página */}
        {disableContainer ? (
          children
        ) : (
          <Container 
            maxWidth={maxWidth} 
            sx={{ 
              flexGrow: 1,
              // Usar las variables directamente para ajustar el padding horizontal
              px: isMobile ? 2 : isTablet ? 3 : 4,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)',
              borderRadius: 2,
              // Usar las variables directamente para ajustar el padding vertical
              py: isMobile ? 2 : isTablet ? 3 : 4,
            }}
          >
            <Fade in={true} timeout={1000}>
              <Box>{children}</Box>
            </Fade>
          </Container>
        )}
      </Box>
      
      {/* Footer con efecto de transición */}
      <Fade in={true} timeout={800}>
        <Box>
          <Footer />
        </Box>
      </Fade>
      
      {/* Elementos decorativos solo visibles en pantallas no móviles */}
      {!isMobile && (
        <>
          <Box
            sx={{
              position: 'fixed',
              top: '20%',
              right: '-5%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.palette.primary.main}10, transparent 70%)`,
              zIndex: -1,
              opacity: 0.5,
            }}
          />
          
          <Box
            sx={{
              position: 'fixed',
              bottom: '10%',
              left: '-5%',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.palette.secondary.main}10, transparent 70%)`,
              zIndex: -1,
              opacity: 0.4,
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Layout;