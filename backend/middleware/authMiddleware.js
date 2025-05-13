const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');
const { formatResponse } = require('../utils/responseFormatter');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario del token
      const { data: userProfile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', decoded.id)
        .single();

      if (error) {
        return res.status(401).json(
          formatResponse(false, null, { message: 'Perfil de usuario no encontrado' })
        );
      }

      // Añadir usuario a la request
      req.user = {
        id: decoded.id,
        email: decoded.email,
        ...userProfile
      };
      
      next();
    } catch (error) {
      console.error('Error en autenticación:', error);
      return res.status(401).json(
        formatResponse(false, null, { message: 'No autorizado' })
      );
    }
  }

  if (!token) {
    return res.status(401).json(
      formatResponse(false, null, { message: 'No autorizado, no hay token' })
    );
  }
};