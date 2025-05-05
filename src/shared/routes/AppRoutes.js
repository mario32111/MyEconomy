// src/shared/routes/AppRoutes.js
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';
import Layout from '../components/Layout/Layout'; // Importar el Layout

// Componente de carga simple
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-lg text-gray-700">Cargando...</span>
  </div>
);

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
                <Layout>{route.element}</Layout>
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