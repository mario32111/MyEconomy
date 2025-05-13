// src/shared/utils/formatters.js

/**
 * Estas funciones ayudan a mantener un formato consistente para:
 * - Moneda (formatCurrency)
 * - Fechas (formatDate)
 * - Números (formatNumber)
 * - Porcentajes (formatPercent)
 */

// Configuración por defecto si no se puede importar APP_CONFIG
const DEFAULT_CONFIG = {
  defaults: {
    currency: 'MXN',
    dateFormat: 'DD/MM/YYYY',
    language: 'es-MX'
  }
};

// Intenta importar APP_CONFIG, pero usa valores por defecto si falla
let appConfig;
try {
  // Importación dinámica para evitar errores de referencia circular
  appConfig = require('../config/app.config').default;
} catch (error) {
  console.warn('No se pudo cargar app.config.js, usando configuración por defecto');
  appConfig = DEFAULT_CONFIG;
}

// Formateador de moneda
export const formatCurrency = (amount, currency) => {
  // Manejo de valores nulos o indefinidos
  if (amount === null || amount === undefined || amount === '') {
    return '$0.00';
  }

  try {
    // Usar el valor proporcionado, o el de la configuración, o el valor por defecto
    const currencyCode = currency || 
                         (appConfig?.defaults?.currency) || 
                         DEFAULT_CONFIG.defaults.currency;

    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    console.error('Error al formatear moneda:', error);
    // Fallback simple en caso de error
    return '$' + parseFloat(amount).toFixed(2);
  }
};

// Formateador de fechas
export const formatDate = (date, format) => {
  if (!date) return '';

  try {
    const d = new Date(date);
    const formatToUse = format || 
                        (appConfig?.defaults?.dateFormat) || 
                        DEFAULT_CONFIG.defaults.dateFormat;

    // Formato simple DD/MM/YYYY
    if (formatToUse === 'DD/MM/YYYY') {
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }

    // Formato con hora DD/MM/YYYY HH:MM
    if (formatToUse === 'DD/MM/YYYY HH:MM') {
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    }

    // Formato relativo (hoy, ayer, etc.)
    if (formatToUse === 'relative') {
      const now = new Date();
      const diffTime = Math.abs(now - d);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'Hoy';
      if (diffDays === 1) return 'Ayer';
      if (diffDays < 7) return `Hace ${diffDays} días`;
      if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
      if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
      return `Hace ${Math.floor(diffDays / 365)} años`;
    }

    return d.toLocaleDateString();
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return String(date);
  }
};

// Formateador de números
export const formatNumber = (number, decimals = 2) => {
  if (number === null || number === undefined || number === '') {
    return '0';
  }

  try {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(number);
  } catch (error) {
    console.error('Error al formatear número:', error);
    return parseFloat(number).toFixed(decimals);
  }
};

// Formateador de porcentajes
export const formatPercent = (number, decimals = 1) => {
  if (number === null || number === undefined || number === '') {
    return '0%';
  }

  try {
    return new Intl.NumberFormat('es-MX', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(number / 100);
  } catch (error) {
    console.error('Error al formatear porcentaje:', error);
    return parseFloat(number).toFixed(decimals) + '%';
  }
};

// Truncar texto largo
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength) + '...';
};

// Formatear nombre completo
export const formatFullName = (firstName, lastName) => {
  return `${firstName || ''} ${lastName || ''}`.trim() || 'Usuario';
};
