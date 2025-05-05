import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
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

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};