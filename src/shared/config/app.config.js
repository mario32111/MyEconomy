export const APP_CONFIG = {
  name: 'MyEconomy',
  version: '1.0.0',
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 5000
  },
  auth: {
    tokenKey: 'myeconomy_token',
    refreshTokenKey: 'myeconomy_refresh_token',
    expirationKey: 'myeconomy_token_expiration'
  },
  features: {
    darkMode: true,
    notifications: true,
    financialGoals: true
  },
  defaults: {
    currency: 'MXN',
    language: 'es-MX',
    dateFormat: 'DD/MM/YYYY'
  }
};
export default APP_CONFIG;