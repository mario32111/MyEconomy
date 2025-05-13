// src/shared/services/userDataService.js
// Versión simplificada sin Supabase

// Obtener datos del usuario desde localStorage
export const getLocalUserData = async (userId) => {
    if (!userId) return {};
    
    try {
      // Obtener datos del localStorage
      return {
        transactions: JSON.parse(localStorage.getItem(`transactions_${userId}`) || '[]'),
        accounts: JSON.parse(localStorage.getItem(`accounts_${userId}`) || '[]'),
        categories: JSON.parse(localStorage.getItem(`categories_${userId}`) || '[]'),
        goals: JSON.parse(localStorage.getItem(`goals_${userId}`) || '[]'),
        budgets: JSON.parse(localStorage.getItem(`budgets_${userId}`) || '[]')
      };
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      return {
        transactions: [],
        accounts: [],
        categories: [],
        goals: [],
        budgets: []
      };
    }
  };
  
  // Guardar datos del usuario en localStorage
  export const saveLocalUserData = (userId, dataType, data) => {
    if (!userId) return;
    
    try {
      localStorage.setItem(`${dataType}_${userId}`, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error al guardar ${dataType}:`, error);
      return false;
    }
  };
  
  // Función para simular la obtención de datos de un backend
  // Puedes reemplazar esto con llamadas reales a tu API cuando esté lista
  export const fetchUserData = async (userId, dataType) => {
    // Por ahora, simplemente devuelve los datos locales
    const allData = await getLocalUserData(userId);
    return allData[dataType] || [];
  };
  
  // Función para simular el guardado de datos en un backend
  export const saveUserData = async (userId, dataType, data) => {
    // Por ahora, solo guarda localmente
    return saveLocalUserData(userId, dataType, data);
  };