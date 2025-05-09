// src/shared/hooks/useFinancialData.js
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { userDataService } from '../services/userDataService';

export const useFinancialData = () => {
  const { user } = useAuth();
  const [financialData, setFinancialData] = useState(userDataService.getUserFinancialData());
  const [monthlyBalance, setMonthlyBalance] = useState(0);
  const [savingsProgress, setSavingsProgress] = useState(0);
  const [timeToGoal, setTimeToGoal] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [budgetDistribution, setBudgetDistribution] = useState({ distribution: [] });

  // Actualizar los datos cuando cambia el usuario
  useEffect(() => {
    if (user) {
      const data = userDataService.getUserFinancialData();
      setFinancialData(data);
      setMonthlyBalance(userDataService.calculateMonthlyBalance());
      setSavingsProgress(userDataService.calculateSavingsProgress());
      setTimeToGoal(userDataService.calculateTimeToGoal());
      setRecommendations(userDataService.getFinancialRecommendations());
      setBudgetDistribution(userDataService.getBudgetDistribution());
    }
  }, [user]);

  return {
    financialData,
    monthlyBalance,
    savingsProgress,
    timeToGoal,
    recommendations,
    budgetDistribution
  };
};