// src/features/Auth/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Servicio de autenticación
const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: { message: 'Error de conexión' } };
    }
  },
  
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: { message: 'Error de conexión' } };
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export const useAuth = () => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    // Verificar autenticación al montar el componente
    setIsAuthenticated(authService.isAuthenticated());
    setUser(authService.getCurrentUser());
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Error logging in:', error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, userData) => {
    setLoading(true);
    try {
      const response = await authService.register({
        email,
        password,
        name: userData.name,
        monthlyIncome: userData.monthlyIncome,
        currentSavings: userData.currentSavings,
        monthlyExpenses: userData.monthlyExpenses,
        primaryGoal: userData.primaryGoal,
        timeframe: userData.timeframe,
        savingsGoal: userData.savingsGoal,
        riskTolerance: userData.riskTolerance,
        budgetType: userData.budgetType,
        notificationPreference: userData.notificationPreference
      });
      
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { 
          data: {
            user: response.data.user,
            emailProvider: userData.email.split('@')[1]
          }, 
          error: null 
        };
      } else {
        return { data: null, error: response.error };
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout
  };
};