// src/shared/services/profileService.js
import { createClient } from '@supabase/supabase-js';

// Crear cliente Supabase directamente aquí para mantener consistencia con authService.js
const supabaseUrl = 'https://brsiyfcqavudxxnlbziz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyc2l5ZmNxYXZ1ZHh4bmxieml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MzE2OTIsImV4cCI6MjA2MTMwNzY5Mn0.8fyBnnja24pQ-fsiqshK8vTMRXfLLukA6U2xTyiSccc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Verifica si el perfil financiero del usuario está completo
 * @param {string} userId - ID del usuario
 * @returns {Promise<boolean>} - true si el perfil está completo
 */
const isProfileComplete = async (userId) => {
  try {
    if (!userId) return false;
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('monthly_income, current_savings, monthly_expenses, primary_goal')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    
    // Verificar si los campos principales están completos
    return !!(
      data.monthly_income && 
      data.current_savings !== null && 
      data.monthly_expenses && 
      data.primary_goal
    );
  } catch (error) {
    console.error('Error al verificar perfil:', error);
    return false;
  }
};

/**
 * Actualiza el perfil financiero del usuario
 * @param {string} userId - ID del usuario
 * @param {Object} profileData - Datos del perfil
 * @returns {Promise<Object>} - Resultado de la operación
 */
const updateProfile = async (userId, profileData) => {
  try {
    if (!userId) {
      throw new Error('ID de usuario requerido');
    }

    // Convertir nombres de campos de camelCase a snake_case para la base de datos
    const updateData = {
      monthly_income: profileData.monthlyIncome || null,
      current_savings: profileData.currentSavings || null,
      monthly_expenses: profileData.monthlyExpenses || null,
      primary_goal: profileData.primaryGoal || '',
      timeframe: profileData.timeframe || '',
      savings_goal: profileData.savingsGoal || null,
      risk_tolerance: profileData.riskTolerance || '',
      budget_type: profileData.budgetType || '',
      notification_preference: profileData.notificationPreference || '',
      updated_at: new Date()
    };

    const { error } = await supabase
      .from('user_profiles')
      .update(updateData)
      .eq('id', userId);

    if (error) throw error;

    return {
      success: true,
      data: { message: 'Perfil actualizado correctamente' }
    };
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return {
      success: false,
      error: { message: error.message || 'Error al actualizar perfil' }
    };
  }
};

/**
 * Obtiene el perfil completo del usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} - Datos del perfil
 */
const getProfile = async (userId) => {
  try {
    if (!userId) {
      throw new Error('ID de usuario requerido');
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    // Convertir nombres de campos de snake_case a camelCase para el frontend
    return {
      success: true,
      data: {
        id: data.id,
        firstName: data.first_name,
        middleName: data.middle_name,
        paternalLastName: data.paternal_last_name,
        maternalLastName: data.maternal_last_name,
        monthlyIncome: data.monthly_income,
        currentSavings: data.current_savings,
        monthlyExpenses: data.monthly_expenses,
        primaryGoal: data.primary_goal,
        timeframe: data.timeframe,
        savingsGoal: data.savings_goal,
        riskTolerance: data.risk_tolerance,
        budgetType: data.budget_type,
        notificationPreference: data.notification_preference,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      }
    };
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return {
      success: false,
      error: { message: error.message || 'Error al obtener perfil' }
    };
  }
};

// Exportar funciones individuales
export { isProfileComplete, updateProfile, getProfile };

// Exportar objeto de servicio
const profileService = {
  isProfileComplete,
  updateProfile,
  getProfile
};

export default profileService;