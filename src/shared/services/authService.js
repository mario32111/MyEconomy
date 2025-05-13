import { createClient } from '@supabase/supabase-js';

// Crear cliente Supabase directamente aquí
const supabaseUrl = 'https://brsiyfcqavudxxnlbziz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyc2l5ZmNxYXZ1ZHh4bmxieml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MzE2OTIsImV4cCI6MjA2MTMwNzY5Mn0.8fyBnnja24pQ-fsiqshK8vTMRXfLLukA6U2xTyiSccc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Configuración de autenticación
const AUTH_CONFIG = {
  tokenKey: 'auth_token',
  userKey: 'user',
  financialDataKey: 'financial_data'
};

/**
 * Registra un nuevo usuario
 */
const register = async (userData) => {
  try {
    console.log('Registrando usuario con Supabase:', userData.email);

    // Registrar con Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          firstName: userData.firstName || 'Usuario',
          middleName: userData.middleName || '',
          paternalLastName: userData.paternalLastName || 'Apellido',
          maternalLastName: userData.maternalLastName || '',
          monthlyIncome: userData.monthlyIncome || '',
          currentSavings: userData.currentSavings || '',
          monthlyExpenses: userData.monthlyExpenses || '',
          primaryGoal: userData.primaryGoal || '',
          timeframe: userData.timeframe || '',
          savingsGoal: userData.savingsGoal || '',
          riskTolerance: userData.riskTolerance || '',
          budgetType: userData.budgetType || '',
          notificationPreference: userData.notificationPreference || ''
        }
      }
    });

    if (error) {
      console.error('Error en registro Supabase:', error);
      throw error;
    }

    console.log('Registro exitoso en Supabase:', data);

    // Crear manualmente el perfil de usuario después del registro
    if (data.user) {
      try {
        // Insertar perfil manualmente
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            first_name: userData.firstName || 'Usuario',
            middle_name: userData.middleName || null,
            paternal_last_name: userData.paternalLastName || 'Apellido',
            maternal_last_name: userData.maternalLastName || null,
            monthly_income: userData.monthlyIncome ? parseFloat(userData.monthlyIncome) : null,
            current_savings: userData.currentSavings ? parseFloat(userData.currentSavings) : null,
            monthly_expenses: userData.monthlyExpenses ? parseFloat(userData.monthlyExpenses) : null,
            primary_goal: userData.primaryGoal || null,
            timeframe: userData.timeframe || null,
            savings_goal: userData.savingsGoal ? parseFloat(userData.savingsGoal) : null,
            risk_tolerance: userData.riskTolerance || null,
            budget_type: userData.budgetType || null,
            notification_preference: userData.notificationPreference || null
          });

        if (profileError) {
          console.error('Error al crear perfil:', profileError);
        } else {
          console.log('Perfil creado exitosamente');
        }
      } catch (profileErr) {
        console.error('Error al crear perfil:', profileErr);
      }
    }

    // Guardar token de sesión y datos de usuario
    if (data.session) {
      localStorage.setItem(AUTH_CONFIG.tokenKey, data.session.access_token);

      // Crear objeto de usuario con datos básicos
      const user = {
        id: data.user.id,
        email: data.user.email,
        firstName: userData.firstName || 'Usuario',
        middleName: userData.middleName || '',
        paternalLastName: userData.paternalLastName || 'Apellido',
        maternalLastName: userData.maternalLastName || '',
        monthlyIncome: userData.monthlyIncome || '',
        currentSavings: userData.currentSavings || '',
        monthlyExpenses: userData.monthlyExpenses || '',
        primaryGoal: userData.primaryGoal || '',
        timeframe: userData.timeframe || '',
        savingsGoal: userData.savingsGoal || '',
        riskTolerance: userData.riskTolerance || '',
        budgetType: userData.budgetType || '',
        notificationPreference: userData.notificationPreference || ''
      };

      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(user));

      // Guardar datos financieros por separado
      const financialData = {
        monthlyIncome: userData.monthlyIncome || '',
        currentSavings: userData.currentSavings || '',
        monthlyExpenses: userData.monthlyExpenses || '',
        primaryGoal: userData.primaryGoal || '',
        timeframe: userData.timeframe || '',
        savingsGoal: userData.savingsGoal || '',
        riskTolerance: userData.riskTolerance || '',
        budgetType: userData.budgetType || '',
        notificationPreference: userData.notificationPreference || ''
      };

      localStorage.setItem(AUTH_CONFIG.financialDataKey, JSON.stringify(financialData));
    }

    return { 
      success: true, 
      data: { 
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: userData.firstName || 'Usuario',
          middleName: userData.middleName || '',
          paternalLastName: userData.paternalLastName || 'Apellido',
          maternalLastName: userData.maternalLastName || '',
          monthlyIncome: userData.monthlyIncome || '',
          currentSavings: userData.currentSavings || '',
          monthlyExpenses: userData.monthlyExpenses || '',
          primaryGoal: userData.primaryGoal || '',
          timeframe: userData.timeframe || '',
          savingsGoal: userData.savingsGoal || '',
          riskTolerance: userData.riskTolerance || '',
          budgetType: userData.budgetType || '',
          notificationPreference: userData.notificationPreference || ''
        }, 
        token: data.session?.access_token 
      } 
    };
  } catch (error) {
    console.error('Error en registro:', error);
    return { 
      success: false, 
      error: { 
        message: error.message || 'Error al registrar usuario' 
      } 
    };
  }
};

// Alias para mantener consistencia con useAuth
const signup = register;

/**
 * Inicia sesión de usuario
 */
const login = async (email, password) => {
  try {
    // Manejar diferentes formatos de parámetros
    let userEmail, userPassword;

    if (typeof email === 'object') {
      userEmail = email.email;
      userPassword = email.password;
    } else {
      userEmail = email;
      userPassword = password;
    }

    console.log('Iniciando sesión con Supabase:', userEmail);

    // Autenticar al usuario
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword
    });

    if (error) {
      console.error('Error en login Supabase:', error);
      throw error;
    }

    console.log('Login exitoso en Supabase:', data);

    // Guardar token de sesión inmediatamente
    if (data.session) {
      localStorage.setItem(AUTH_CONFIG.tokenKey, data.session.access_token);
    }

    // Obtener datos del perfil del usuario
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error al obtener perfil:', profileError);
    }

    // Crear objeto de usuario con los datos disponibles
    const user = {
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.user_metadata?.firstName || profileData?.first_name || 'Usuario',
      middleName: data.user.user_metadata?.middleName || profileData?.middle_name || '',
      paternalLastName: data.user.user_metadata?.paternalLastName || profileData?.paternal_last_name || 'Apellido',
      maternalLastName: data.user.user_metadata?.maternalLastName || profileData?.maternal_last_name || '',
      monthlyIncome: profileData?.monthly_income || '',
      currentSavings: profileData?.current_savings || '',
      monthlyExpenses: profileData?.monthly_expenses || '',
      primaryGoal: profileData?.primary_goal || '',
      timeframe: profileData?.timeframe || '',
      savingsGoal: profileData?.savings_goal || '',
      riskTolerance: profileData?.risk_tolerance || '',
      budgetType: profileData?.budget_type || '',
      notificationPreference: profileData?.notification_preference || ''
    };

    localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(user));

    // Guardar datos financieros por separado
    const financialData = {
      monthlyIncome: profileData?.monthly_income || '',
      currentSavings: profileData?.current_savings || '',
      monthlyExpenses: profileData?.monthly_expenses || '',
      primaryGoal: profileData?.primary_goal || '',
      timeframe: profileData?.timeframe || '',
      savingsGoal: profileData?.savings_goal || '',
      riskTolerance: profileData?.risk_tolerance || '',
      budgetType: profileData?.budget_type || '',
      notificationPreference: profileData?.notification_preference || ''
    };

    localStorage.setItem(AUTH_CONFIG.financialDataKey, JSON.stringify(financialData));

    return { 
      success: true, 
      data: { 
        user, 
        token: data.session?.access_token 
      } 
    };
  } catch (error) {
    console.error('Error en login:', error);
    return { 
      success: false, 
      error: { 
        message: error.message || 'Credenciales inválidas' 
      } 
    };
  }
};

/**
 * Cierra la sesión del usuario
 */
const logout = async () => {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.userKey);
    localStorage.removeItem(AUTH_CONFIG.financialDataKey);
    return { success: true };
  } catch (error) {
    console.error('Error en logout:', error);
    return { success: false, error: { message: error.message } };
  }
};

/**
 * Verifica si el usuario está autenticado
 */
const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_CONFIG.tokenKey);
};

/**
 * Obtiene el usuario actual del localStorage
 */
const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_CONFIG.userKey);
  const financialData = localStorage.getItem(AUTH_CONFIG.financialDataKey);

  if (!user) return null;

  const userData = JSON.parse(user);

  // Combinar con datos financieros si existen
  if (financialData) {
    return {
      ...userData,
      ...JSON.parse(financialData)
    };
  }

  return userData;
};

/**
 * Actualiza los datos del usuario
 */
const updateUserData = async (userData) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new Error('Usuario no autenticado');
    }

    // Actualizar perfil en Supabase
    const { error } = await supabase
      .from('user_profiles')
      .update({
        first_name: userData.firstName || currentUser.firstName || 'Usuario',
        middle_name: userData.middleName || currentUser.middleName,
        paternal_last_name: userData.paternalLastName || currentUser.paternalLastName || 'Apellido',
        maternal_last_name: userData.maternalLastName || currentUser.maternalLastName,
        monthly_income: userData.monthlyIncome ? parseFloat(userData.monthlyIncome) : null,
        current_savings: userData.currentSavings ? parseFloat(userData.currentSavings) : null,
        monthly_expenses: userData.monthlyExpenses ? parseFloat(userData.monthlyExpenses) : null,
        primary_goal: userData.primaryGoal || currentUser.primaryGoal,
        timeframe: userData.timeframe || currentUser.timeframe,
        savings_goal: userData.savingsGoal ? parseFloat(userData.savingsGoal) : null,
        risk_tolerance: userData.riskTolerance || currentUser.riskTolerance,
        budget_type: userData.budgetType || currentUser.budgetType,
        notification_preference: userData.notificationPreference || currentUser.notificationPreference,
        updated_at: new Date()
      })
      .eq('id', currentUser.id);

    if (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }

    // Actualizar datos locales
    const updatedUser = {
      ...currentUser,
      firstName: userData.firstName || currentUser.firstName || 'Usuario',
      middleName: userData.middleName || currentUser.middleName,
      paternalLastName: userData.paternalLastName || currentUser.paternalLastName || 'Apellido',
      maternalLastName: userData.maternalLastName || currentUser.maternalLastName,
      monthlyIncome: userData.monthlyIncome || currentUser.monthlyIncome,
      currentSavings: userData.currentSavings || currentUser.currentSavings,
      monthlyExpenses: userData.monthlyExpenses || currentUser.monthlyExpenses,
      primaryGoal: userData.primaryGoal || currentUser.primaryGoal,
      timeframe: userData.timeframe || currentUser.timeframe,
      savingsGoal: userData.savingsGoal || currentUser.savingsGoal,
      riskTolerance: userData.riskTolerance || currentUser.riskTolerance,
      budgetType: userData.budgetType || currentUser.budgetType,
      notificationPreference: userData.notificationPreference || currentUser.notificationPreference
    };

    localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify({
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      middleName: updatedUser.middleName || '',
      paternalLastName: updatedUser.paternalLastName,
      maternalLastName: updatedUser.maternalLastName || ''
    }));

    // Actualizar datos financieros
    const financialData = {
      monthlyIncome: updatedUser.monthlyIncome || '',
      currentSavings: updatedUser.currentSavings || '',
      monthlyExpenses: updatedUser.monthlyExpenses || '',
      primaryGoal: updatedUser.primaryGoal || '',
      timeframe: updatedUser.timeframe || '',
      savingsGoal: updatedUser.savingsGoal || '',
      riskTolerance: updatedUser.riskTolerance || '',
      budgetType: updatedUser.budgetType || '',
      notificationPreference: updatedUser.notificationPreference || ''
    };

    localStorage.setItem(AUTH_CONFIG.financialDataKey, JSON.stringify(financialData));

    return { 
      success: true, 
      data: updatedUser 
    };
  } catch (error) {
    console.error('Error al actualizar datos:', error);
    return { 
      success: false, 
      error: { 
        message: error.message || 'Error al actualizar datos' 
      } 
    };
  }
};

const authService = {
  register,
  signup,
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  updateUserData,
  supabase // Exportar cliente supabase para uso directo si es necesario
};

export { authService };
export default authService;
