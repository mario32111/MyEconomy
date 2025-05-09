import axiosInstance from '../../../shared/services/axiosConfig'; // Verifica la ruta a tu instancia configurada de Axios

export const getUserProfile = async () => {
  console.log("dashboardService: GET /users/profile"); // Log útil para debug
  try {
    const response = await axiosInstance.get('/users/profile');
    console.log("dashboardService: GET /users/profile - Success", response.data);
    // Asume que la respuesta es el objeto del perfil: { id, name, email, monthlyIncome, savingsGoalPercentage, currency, ... }
    return response.data;
  } catch (error) {
    console.error("dashboardService: GET /users/profile - Error:", error.response?.data || error.message);
    throw error; // Relanzar para que DashboardPage lo maneje
  }
};

/**
 * Obtiene el balance total de las cuentas del usuario.
 * Endpoint esperado: GET /api/accounts/balance (ajusta si es diferente)
 */
export const getAccountBalance = async () => {
  console.log("dashboardService: GET /accounts/balance");
  try {
    const response = await axiosInstance.get('/accounts/balance');
    console.log("dashboardService: GET /accounts/balance - Success", response.data);
    // Asume que la respuesta tiene un formato como { totalBalance: 1234.56 }
    return response.data;
  } catch (error) {
    console.error("dashboardService: GET /accounts/balance - Error:", error.response?.data || error.message);
    throw error;
  }
};

export const getRecentTransactions = async (limit = 5) => {
  console.log(`dashboardService: GET /transactions/recent?limit=${limit}`);
  try {
    const response = await axiosInstance.get(`/transactions/recent?limit=${limit}`);
    console.log("dashboardService: GET /transactions/recent - Success", response.data);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("dashboardService: GET /transactions/recent - Error:", error.response?.data || error.message);
    throw error;
  }
};

// --- Podrías añadir aquí la función para obtener metas si tienes un endpoint específico ---
// export const getGoals = async () => { ... }