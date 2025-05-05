import { useNavigate, useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Loggin = lazy(() => import('../components/Loggin/Loggin'));
const SignUp = lazy(() => import('../components/SignUp/SignUp'));
const Home = lazy(() => import('../components/Landing/Landing'));
const Monitoreo = lazy(() => import('../components/Monitoreo/Monitoreo'));
// ... resto de tus imports

export const useNavigation = () => {
  const navigate = useNavigate();
  return { changePath: navigate };
};

const LoadingSpinner = () => (
  <div>Cargando...</div>
);

export const AppRoutes = () => {
  return useRoutes([
    // Tus rutas actuales sin la referencia a HomePagee
    {path: '/prueba', element: <Suspense fallback={<LoadingSpinner />}><IndexLoader /></Suspense>},
    {path: '/presupuesto', element: <Suspense fallback={<LoadingSpinner />}><BudgetPlanner /></Suspense>},
    // ... resto de tus rutas
  ]);
};