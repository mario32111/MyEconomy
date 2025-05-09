import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import APP_CONFIG from '../config/app.config';

/**
 * Hook personalizado para gestionar la autenticación
 * Proporciona funciones para login, logout, registro y verificación de estado
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario al iniciar
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        // Verificar token en localStorage
        const token = localStorage.getItem(APP_CONFIG.auth.tokenKey);
        
        if (token) {
          // Verificar si el token es válido
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        // Limpiar token inválido
        localStorage.removeItem(APP_CONFIG.auth.tokenKey);
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
      
      // Guardar token
      localStorage.setItem(APP_CONFIG.auth.tokenKey, response.token);
      
      // Establecer usuario
      setUser(response.user);
      
      return response.user;
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
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
      const response = await authService.signup(userData);
      
      // Guardar token si el registro también hace login
      if (response.token) {
        localStorage.setItem(APP_CONFIG.auth.tokenKey, response.token);
        setUser(response.user);
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Error al registrarse');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem(APP_CONFIG.auth.tokenKey);
    setUser(null);
    navigate('/login');
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return !!user;
  };

  return { 
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated
  };
};

export default useAuth;