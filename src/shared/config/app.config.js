// src/shared/config/app.config.js
const APP_CONFIG = {
    appName: 'MyEconomy',
    version: '1.0.0',
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    defaults: {
      currency: 'MXN',
      dateFormat: 'DD/MM/YYYY',
      language: 'es-MX',
      theme: 'light'
    },
    features: {
      darkMode: true,
      notifications: true,
      voiceInput: true
    }
  };
  
  export default APP_CONFIG;