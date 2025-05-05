import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { ROUTES } from '../constants/routes';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar autenticación al montar el componente
    setIsAuthenticated(authService.isAuthenticated());
    setUser(authService.getCurrentUser());
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setIsAuthenticated(true);
      setUser(response.data.user);
      navigate(ROUTES.DASHBOARD);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signup = useCallback(async (email, password, userData) => {
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
      
      setIsAuthenticated(true);
      setUser(response.data.user);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate(ROUTES.HOME);
  }, [navigate]);

  return {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout
  };
};