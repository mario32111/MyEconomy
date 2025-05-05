import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../../features/Landing/pages/HomePage';
import LoginPage from '../../features/Auth/pages/LoginPage';
import SignUpPage from '../../features/Auth/pages/SignUpPage';
import ExpenseTracker from '../../features/Finance/components/ExpenseTracker/ExpenseTracker';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route 
        path="/signup" 
        element={user ? <Navigate to="/dashboard" /> : <SignUpPage />} 
      />
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <ExpenseTracker />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { AppRoutes };