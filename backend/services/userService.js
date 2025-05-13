// backend/services/userService.js
const supabase = require('../config/supabaseClient');

/**
 * Obtiene el perfil de un usuario por su ID
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} - Datos del perfil o error
 */
const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error al obtener perfil de usuario:', error);
    return { success: false, error: { message: error.message } };
  }
};

/**
 * Actualiza el perfil de un usuario
 * @param {string} userId - ID del usuario
 * @param {Object} profileData - Datos a actualizar
 * @returns {Promise<Object>} - Resultado de la operación
 */
const updateUserProfile = async (userId, profileData) => {
  try {
    // Filtrar campos permitidos para actualizar
    const allowedFields = [
      'first_name',
      'middle_name',
      'paternal_last_name',
      'maternal_last_name',
      'monthly_income',
      'current_savings',
      'monthly_expenses',
      'primary_goal',
      'timeframe',
      'savings_goal',
      'risk_tolerance',
      'budget_type',
      'notification_preference'
    ];
    
    const filteredData = Object.keys(profileData)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = profileData[key];
        return obj;
      }, {});
    
    // Añadir timestamp de actualización
    filteredData.updated_at = new Date();
    
    const { data, error } = await supabase
      .from('user_profiles')
      .update(filteredData)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error al actualizar perfil de usuario:', error);
    return { success: false, error: { message: error.message } };
  }
};

/**
 * Elimina un usuario y su perfil
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} - Resultado de la operación
 */
const deleteUser = async (userId) => {
  try {
    // Eliminar perfil primero (debido a la restricción de clave foránea)
    const { error: profileError } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId);
    
    if (profileError) throw profileError;
    
    // Eliminar usuario de auth
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    
    if (authError) throw authError;
    
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return { success: false, error: { message: error.message } };
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser
};