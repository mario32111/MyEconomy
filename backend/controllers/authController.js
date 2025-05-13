const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');
const { formatResponse } = require('../utils/responseFormatter');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      paternalLastName,
      maternalLastName,
      email,
      password,
      // Campos opcionales
      monthlyIncome,
      currentSavings,
      monthlyExpenses,
      primaryGoal,
      timeframe,
      savingsGoal,
      riskTolerance,
      budgetType,
      notificationPreference
    } = req.body;

    // Verificar si el usuario ya existe
    const { data: existingUser, error: checkError } = await supabase.auth.admin.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json(
        formatResponse(false, null, { message: 'El correo electrónico ya está registrado' })
      );
    }

    // Crear usuario en Supabase Auth con metadatos
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          middleName,
          paternalLastName,
          maternalLastName,
          monthlyIncome,
          currentSavings,
          monthlyExpenses,
          primaryGoal,
          timeframe,
          savingsGoal,
          riskTolerance,
          budgetType,
          notificationPreference
        }
      }
    });

    if (authError) {
      return res.status(400).json(
        formatResponse(false, null, { message: authError.message })
      );
    }

    // El trigger en Supabase creará automáticamente el perfil

    // Generar JWT
    const token = jwt.sign(
      { id: authUser.user.id, email: authUser.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Obtener el perfil recién creado
    const { data: userProfile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', authUser.user.id)
      .single();

    if (profileError) {
      console.warn('Perfil no encontrado inmediatamente después del registro:', profileError);
    }

    return res.status(201).json(
      formatResponse(true, { 
        user: {
          id: authUser.user.id,
          email: authUser.user.email,
          firstName,
          middleName,
          paternalLastName,
          maternalLastName,
          ...userProfile
        }, 
        token 
      }, null)
    );
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json(
      formatResponse(false, null, { message: 'Error en el servidor' })
    );
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Autenticar con Supabase
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return res.status(401).json(
        formatResponse(false, null, { message: 'Credenciales inválidas' })
      );
    }

    // Obtener datos del perfil del usuario
    const { data: userProfile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      return res.status(404).json(
        formatResponse(false, null, { message: 'Perfil de usuario no encontrado' })
      );
    }

    // Generar JWT
    const token = jwt.sign(
      { id: data.user.id, email: data.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(200).json(
      formatResponse(true, { 
        user: {
          id: data.user.id,
          email: data.user.email,
          ...userProfile
        }, 
        token 
      }, null)
    );
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json(
      formatResponse(false, null, { message: 'Error en el servidor' })
    );
  }
};

// Sincronizar datos del usuario
exports.syncUser = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Obtener datos actualizados del perfil
    const { data: userProfile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      return res.status(404).json(
        formatResponse(false, null, { message: 'Perfil de usuario no encontrado' })
      );
    }

    // Obtener datos del usuario de auth
    const { data: authUser, error: authError } = await supabase.auth.getUser();

    if (authError) {
      return res.status(401).json(
        formatResponse(false, null, { message: 'Usuario no autenticado' })
      );
    }

    return res.status(200).json(
      formatResponse(true, { 
        user: {
          id: userId,
          email: authUser.user.email,
          ...userProfile
        }
      }, null)
    );
  } catch (error) {
    console.error('Error al sincronizar usuario:', error);
    return res.status(500).json(
      formatResponse(false, null, { message: 'Error en el servidor' })
    );
  }
};