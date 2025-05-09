import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const register = async (userData) => {
  try {
    console.log('Enviando datos de registro:', userData);
    console.log('URL completa:', `${API_URL}/auth/register`);
    
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return {
        success: true,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        error: { message: response.data.error?.message || 'Error desconocido' }
      };
    }
  } catch (error) {
    console.error('Error completo:', error);
    return {
      success: false,
      error: { 
        message: error.response?.data?.error?.message || 
        'Error al conectar con el servidor. Intente nuevamente.' 
      }
    };
  }
};

const login = async (credentials) => {
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
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Añadir esta función al authService.js
const syncUser = async (userData) => {
  try {
    // Solo si tenemos un API_URL configurado
    if (!API_URL) return;
    
    const response = await axios.post(`${API_URL}/auth/sync-user`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error al sincronizar usuario:', error);
    // No lanzamos el error para que no interrumpa el flujo
  }
};

const authService = {
  register,
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  syncUser
};

export { authService };
export default authService;