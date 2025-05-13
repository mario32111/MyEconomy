// src/shared/routes/AppRoutes.js
import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import routes from './routes';
import Layout from '../components/Navigation/Layout';
import LoadingScreen from '../components/UI/LoadingScreen';

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirigir a la página principal si el usuario está autenticado y está en login/signup
  useEffect(() => {
    if (!loading && isAuthenticated()) {
      if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/landing') {
        navigate('/');
      }
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  // Renderizar rutas
  const renderRoutes = () => {
    return routes.map((route) => {
      // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a login
      if (route.protected && !isAuthenticated()) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Navigate to="/login" state={{ from: location }} replace />}
          />
        );
      }

      // Renderizar la ruta normalmente
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Layout>
              {route.element}
            </Layout>
          }
        />
      );
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {renderRoutes()}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;