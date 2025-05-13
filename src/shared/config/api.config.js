// src/shared/config/api.config.js
const API_CONFIG = {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    endpoints: {
      auth: {
        register: '/auth/register',
        login: '/auth/login',
        logout: '/auth/logout',
        verify: '/auth/verify',
        resetPassword: '/auth/reset-password'
      },
      user: {
        profile: '/user/profile',
        update: '/user/update'
      },
      // Otros endpoints
    },
    // Añadir configuraciones adicionales
    auth: {
      tokenKey: 'myeconomy_token'
    },
    supabase: {
      url: process.env.REACT_APP_SUPABASE_URL,
      anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY
    }
  };
  
  export default API_CONFIG;