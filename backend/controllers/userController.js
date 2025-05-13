// backend/controllers/userController.js
const userService = require('../services/userService');
const { formatResponse } = require('../utils/responseFormatter');

/**
 * Obtiene el perfil del usuario autenticado
 * @route GET /api/user/profile
 * @access Private
 */
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await userService.getUserProfile(userId);
    
    if (!result.success) {
      return res.status(404).json(
        formatResponse(false, null, { message: 'Perfil no encontrado' })
      );
    }
    
    return res.status(200).json(
      formatResponse(true, { user: result.data }, null)
    );
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json(
      formatResponse(false, null, { message: 'Error en el servidor' })
    );
  }
};

/**
 * Actualiza el perfil del usuario
 * @route PUT /api/user/profile
 * @access Private
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    
    const result = await userService.updateUserProfile(userId, profileData);
    
    if (!result.success) {
      return res.status(400).json(
        formatResponse(false, null, { message: result.error.message })
      );
    }
    
    return res.status(200).json(
      formatResponse(true, { user: result.data }, null)
    );
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return res.status(500).json(
      formatResponse(false, null, { message: 'Error en el servidor' })
    );
  }
};

/**
 * Elimina la cuenta del usuario
 * @route DELETE /api/user/account
 * @access Private
 */
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await userService.deleteUser(userId);
    
    if (!result.success) {
      return res.status(400).json(
        formatResponse(false, null, { message: result.error.message })
      );
    }
    
    return res.status(200).json(
      formatResponse(true, { message: 'Cuenta eliminada correctamente' }, null)
    );
  } catch (error) {
    console.error('Error al eliminar cuenta:', error);
    return res.status(500).json(
      formatResponse(false, null, { message: 'Error en el servidor' })
    );
  }
};