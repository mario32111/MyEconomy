const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Verificar si hay token en el header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'No autorizado - Token no proporcionado' }
      });
    }

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: { message: 'No autorizado - Usuario no encontrado' }
        });
      }

      // Verificar si la cuenta está activa
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: { message: 'Cuenta desactivada' }
        });
      }

      // Agregar usuario a la request
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: { message: 'No autorizado - Token inválido' }
      });
    }
  } catch (error) {
    console.error('Error en middleware:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error en autenticación' }
    });
  }
};