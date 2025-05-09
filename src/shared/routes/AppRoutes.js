// src/shared/routes/AppRoutes.js
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';
import Layout from '../components/Navigation/Layout'; // Importar desde la nueva ubicación
import LoadingScreen from '../components/UI/LoadingScreen';

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.withLayout !== false ? (
                <Layout 
                  maxWidth={route.maxWidth || "lg"} 
                  disableContainer={route.disableContainer}
                >
                  {route.element}
                </Layout>
              ) : (
                route.element
              )
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;