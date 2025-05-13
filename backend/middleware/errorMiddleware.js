// backend/middleware/errorMiddleware.js
const { formatResponse } = require('../utils/responseFormatter');

// Middleware para manejar errores
exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  res.status(statusCode).json(
    formatResponse(false, null, {
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
  );
};

// Middleware para rutas no encontradas
exports.notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};