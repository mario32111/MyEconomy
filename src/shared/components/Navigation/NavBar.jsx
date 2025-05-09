// src/shared/components/Navigation/NavBar.jsx
import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Importar componentes modulares
import MobileDrawer from './NavBarComponents/MobileDrawer';
import BreadcrumbSection from './NavBarComponents/BreadcrumbSection';
import NotificationsMenu from './NavBarComponents/NotificationsMenu';
import ProfileMenu from './NavBarComponents/ProfileMenu';

const NavBar = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Para depuración
  useEffect(() => {
    console.log("NavBar - Auth state:", { isAuthenticated, user });
  }, [isAuthenticated, user]);

  // Función para determinar el título de la página actual
  const getCurrentPageTitle = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard')) {
      return 'Dashboard';
    } else if (path.includes('/expenses')) {
      return 'Gastos';
    } else if (path.includes('/analysis')) {
      return 'Análisis';
    } else if (path.includes('/education')) {
      return 'Educación';
    } else if (path.includes('/help')) {
      return 'Ayuda';
    } else if (path.includes('/login')) {
      return 'Iniciar Sesión';
    } else if (path.includes('/signup')) {
      return 'Registro';
    } else if (path.includes('/profile')) {
      return 'Mi Perfil';
    } else {
      return '';
    }
  };

  // Función para determinar la descripción de la página actual
  const getCurrentPageDescription = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard')) {
      return 'Resumen de tu situación financiera';
    } else if (path.includes('/expenses')) {
      return 'Visualiza y gestiona tus gastos';
    } else if (path.includes('/analysis')) {
      return 'Analiza tus finanzas personales';
    } else if (path.includes('/education')) {
      return 'Aprende sobre finanzas personales';
    } else if (path.includes('/help')) {
      return 'Obtén ayuda y soporte';
    } else if (path.includes('/profile')) {
      return 'Gestiona tu información personal';
    } else {
      return '';
    }
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Menú hamburguesa */}
          <MobileDrawer />

          {/* Logo y breadcrumb */}
          <BreadcrumbSection 
            pageTitle={getCurrentPageTitle()} 
            pageDescription={getCurrentPageDescription()} 
          />

          {/* Botones de acción */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {!isAuthenticated ? (
              <>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/login"
                  variant={location.pathname === '/login' ? 'contained' : 'text'}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  color="primary"
                  component={RouterLink}
                  to="/signup"
                  variant={location.pathname === '/signup' ? 'contained' : 'outlined'}
                >
                  Registrarse
                </Button>
              </>
            ) : (
              <>
                {/* Icono de notificaciones */}
                <NotificationsMenu />
                
                {/* Icono de perfil */}
                <ProfileMenu />
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;