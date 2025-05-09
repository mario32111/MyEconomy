import APP_CONFIG from '../config/app.config';

/**
 * Estas funciones ayudan a mantener un formato consistente para:
 * - Moneda (formatCurrency)
 * - Fechas (formatDate)
 * - Números (formatNumber)
 * - Porcentajes (formatPercent)*/

// Formateador de moneda
export const formatCurrency = (amount, currency = APP_CONFIG.defaults.currency) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Formateador de fechas
export const formatDate = (date, format = APP_CONFIG.defaults.dateFormat) => {
  if (!date) return '';
  
  const d = new Date(date);
  
  // Formato simple DD/MM/YYYY
  if (format === 'DD/MM/YYYY') {
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  }
  
  // Formato con hora DD/MM/YYYY HH:MM
  if (format === 'DD/MM/YYYY HH:MM') {
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }
  
  // Formato relativo (hoy, ayer, etc.)
  if (format === 'relative') {
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
};

// Formateador de números
export const formatNumber = (number, decimals = 2) => {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
};

// Formateador de porcentajes
export const formatPercent = (number, decimals = 1) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number / 100);
};

// Truncar texto largo
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Formatear nombre completo
export const formatFullName = (firstName, lastName) => {
  return `${firstName || ''} ${lastName || ''}`.trim();
};