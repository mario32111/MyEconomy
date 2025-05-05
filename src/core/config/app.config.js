export const APP_CONFIG = {
    name: 'MyEconomy',
    version: '1.0.0',
    api: {
      baseUrl: 'http://localhost:5000/api', // Actualiza esto con tu URL de producción cuando despliegues
      timeout: 5000
    },
    auth: {
      tokenKey: 'myeconomy_token',
      refreshTokenKey: 'myeconomy_refresh_token'
    }
  };