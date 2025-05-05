import React, { lazy } from 'react';

const HomePage = lazy(() => import('../../features/Landing/pages/HomePage'));
const LoginPage = lazy(() => import('../../features/Auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('../../features/Auth/pages/SignUpPage'));
const NotFoundPage = lazy(() => import('../../features/Error/pages/NotFoundPage'));
const DashboardPage = lazy(() => import('../../features/Finance/components/ExpenseTracker/ExpenseTracker'));

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/not-found',
    element: <NotFoundPage />,
  },
];

export default routes;