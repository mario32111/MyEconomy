// src/shared/services/userDataService.js
// Este servicio maneja los datos financieros del usuario de forma local

// Obtener todos los datos financieros del usuario
const getUserFinancialData = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      monthlyIncome: user.monthlyIncome || 0,
      currentSavings: user.currentSavings || 0,
      monthlyExpenses: user.monthlyExpenses || 0,
      savingsGoal: user.savingsGoal || 0,
      primaryGoal: user.primaryGoal || '',
      timeframe: user.timeframe || '',
      riskTolerance: user.riskTolerance || '',
      budgetType: user.budgetType || '',
    };
  };
  
  // Calcular el balance mensual (ingresos - gastos)
  const calculateMonthlyBalance = () => {
    const { monthlyIncome, monthlyExpenses } = getUserFinancialData();
    return monthlyIncome - monthlyExpenses;
  };
  
  // Calcular el progreso hacia la meta de ahorro
  const calculateSavingsProgress = () => {
    const { currentSavings, savingsGoal } = getUserFinancialData();
    if (!savingsGoal || savingsGoal <= 0) return 0;
    return Math.min(100, (currentSavings / savingsGoal) * 100);
  };
  
  // Calcular el tiempo estimado para alcanzar la meta de ahorro
  const calculateTimeToGoal = () => {
    const { currentSavings, savingsGoal } = getUserFinancialData();
    const monthlyBalance = calculateMonthlyBalance();
    
    if (monthlyBalance <= 0 || savingsGoal <= currentSavings) return null;
    
    const remaining = savingsGoal - currentSavings;
    const monthsToGoal = Math.ceil(remaining / monthlyBalance);
    
    return monthsToGoal;
  };
  
  // Obtener recomendaciones basadas en el perfil financiero
  const getFinancialRecommendations = () => {
    const { 
      monthlyIncome, 
      primaryGoal, 
      riskTolerance 
    } = getUserFinancialData();
    
    const monthlyBalance = calculateMonthlyBalance();
    const recommendations = [];
    
    // Recomendaciones básicas
    if (monthlyBalance < 0) {
      recommendations.push({
        type: 'warning',
        title: 'Balance negativo',
        description: 'Tus gastos superan tus ingresos. Considera reducir gastos o aumentar ingresos.'
      });
    }
    
    if (monthlyBalance > 0 && monthlyBalance < (monthlyIncome * 0.1)) {
      recommendations.push({
        type: 'info',
        title: 'Margen de ahorro bajo',
        description: 'Tu margen de ahorro es menor al 10% de tus ingresos. Intenta aumentarlo.'
      });
    }
    
    // Recomendaciones según objetivo
    if (primaryGoal === 'savings') {
      recommendations.push({
        type: 'tip',
        title: 'Maximiza tu ahorro',
        description: 'Considera automatizar tus ahorros transfiriendo un porcentaje fijo de tus ingresos.'
      });
    } else if (primaryGoal === 'debt') {
      recommendations.push({
        type: 'tip',
        title: 'Estrategia para deudas',
        description: 'Prioriza pagar las deudas con mayor interés primero mientras mantienes los pagos mínimos en las demás.'
      });
    } else if (primaryGoal === 'investment') {
      if (riskTolerance === 'low') {
        recommendations.push({
          type: 'tip',
          title: 'Inversiones conservadoras',
          description: 'Considera fondos de inversión de bajo riesgo o bonos gubernamentales.'
        });
      } else if (riskTolerance === 'high') {
        recommendations.push({
          type: 'tip',
          title: 'Inversiones agresivas',
          description: 'Podrías considerar acciones de crecimiento o fondos indexados con mayor exposición a renta variable.'
        });
      }
    }
    
    return recommendations;
  };
  
  // Obtener distribución recomendada de gastos según el tipo de presupuesto
  const getBudgetDistribution = () => {
    const { budgetType, monthlyIncome } = getUserFinancialData();
    
    if (budgetType === '50-30-20') {
      return {
        needs: monthlyIncome * 0.5,
        wants: monthlyIncome * 0.3,
        savings: monthlyIncome * 0.2,
        distribution: [
          { category: 'Necesidades', percentage: 50, amount: monthlyIncome * 0.5 },
          { category: 'Deseos', percentage: 30, amount: monthlyIncome * 0.3 },
          { category: 'Ahorros', percentage: 20, amount: monthlyIncome * 0.2 }
        ]
      };
    } else if (budgetType === 'zero-based') {
      // En este caso, se asigna cada peso a una categoría específica
      return {
        distribution: [
          { category: 'Asignado', percentage: 100, amount: monthlyIncome },
          { category: 'Sin asignar', percentage: 0, amount: 0 }
        ]
      };
    } else if (budgetType === 'pay-yourself') {
      return {
        distribution: [
          { category: 'Ahorros/Inversión', percentage: 20, amount: monthlyIncome * 0.2 },
          { category: 'Resto de gastos', percentage: 80, amount: monthlyIncome * 0.8 }
        ]
      };
    }
    
    // Presupuesto por defecto
    return {
      distribution: [
        { category: 'Gastos fijos', percentage: 50, amount: monthlyIncome * 0.5 },
        { category: 'Gastos variables', percentage: 30, amount: monthlyIncome * 0.3 },
        { category: 'Ahorros', percentage: 20, amount: monthlyIncome * 0.2 }
      ]
    };
  };
  
  export const userDataService = {
    getUserFinancialData,
    calculateMonthlyBalance,
    calculateSavingsProgress,
    calculateTimeToGoal,
    getFinancialRecommendations,
    getBudgetDistribution
  };