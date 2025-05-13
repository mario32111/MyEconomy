// src/shared/routes/routes.js
import React, { lazy } from 'react';

const HomePage = lazy(() => import('../../features/Landing/pages/HomePage'));
const LoginPage = lazy(() => import('../../features/Auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('../../features/Auth/pages/SignUpPage'));
const NotFoundPage = lazy(() => import('../../features/Error/pages/NotFoundPage'));
const ExpenseTracker = lazy(() => import('../../features/Finance/components/ExpenseTracker/ExpenseTracker'));
const ProfilePage = lazy(() => import('../../features/User/Profile/ProfilePage'));
const Dashboard = lazy(() => import('../../features/Finance/components/ExpenseTracker/ExpenseTracker'));
const CoursesPage = lazy(() => import('../../features/Education/pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('../../features/Education/pages/CourseDetailPage'));
const ProgressPage = lazy(() => import('../../features/Education/pages/ProgressPage'));
const GardenPage = lazy(() => import('../../features/Education/pages/GardenPage'));
const ChatPage = lazy(() => import('../../features/IA/ChatIA/ChatIAPage'));

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
    element: <Dashboard />,
    protected: true, // Indicar que requiere autenticación
  },
  {
    path: '/expense-tracker',
    element: <ExpenseTracker />,
    protected: true,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    protected: true,
  },
  {
    path: '/chat-ia',
    element: <ChatPage />,
    protected: true,
  },
  {
    path: '/education/courses',
    element: <CoursesPage />,
    protected: true,
  },
  {
    path: '/education/courses/:courseId',
    element: <CourseDetailPage />,
    protected: true,
  },
  {
    path: '/education/progress',
    element: <ProgressPage />,
    protected: true,
  },
  {
    path: '/education/garden',
    element: <GardenPage />,
    protected: true,
  },
  {
    path: '/not-found',
    element: <NotFoundPage />,
  },
];

export default routes;