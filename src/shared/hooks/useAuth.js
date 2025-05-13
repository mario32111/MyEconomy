// src/shared/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario al iniciar
  useEffect(() => {
    const checkAuth = () => {
      setLoading(true);
      try {
        if (authService.isAuthenticated()) {
          const userData = authService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        authService.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función de login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(email, password);
      if (!response.success) {
        throw response;
      }
      setUser(response.data.user);
      return response.data.user;
    } catch (err) {
      setError(err.error?.message || 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función de registro
  const signup = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      if (response.success) {
        setUser(response.data.user);
      }
      return response;
    } catch (err) {
      setError(err.error?.message || 'Error al registrarse');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };
  
  // Función para actualizar datos del usuario
  const updateUserData = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.updateUserData(userData);
      if (!response.success) {
        throw response;
      }
      setUser(response.data);
      return response;
    } catch (err) {
      setError(err.error?.message || 'Error al actualizar datos');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateUserData,
    isAuthenticated: () => !!user
  };
};

export default useAuth;