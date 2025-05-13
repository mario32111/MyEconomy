// backend/utils/responseFormatter.js

/**
 * Formatea la respuesta de la API
 * @param {boolean} success - Indica si la operación fue exitosa
 * @param {Object|null} data - Datos de la respuesta (si success es true)
 * @param {Object|null} error - Información del error (si success es false)
 * @returns {Object} - Respuesta formateada
 */
exports.formatResponse = (success, data = null, error = null) => {
  return {
    success,
    data,
    error
  };
};