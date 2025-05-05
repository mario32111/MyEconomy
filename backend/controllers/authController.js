// backend/controllers/authController.js

const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const supabase = require('../config/supabaseClient'); // Importa el cliente Supabase

// --- Generar Token JWT ---
const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    console.error('¡Error Crítico! JWT_SECRET no está definido en .env');
    return null;
  }
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// --- Registro de Usuario ---
exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
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

    // --- 1. Verificar si el usuario ya existe en PostgreSQL ---
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { message: 'El email ya está registrado en la base de datos local.' }
      });
    }

    // (Manteniendo emailVerified: true como lo tienes ahora)
    const user = await User.create({
      name,
      email,
      password,
      emailVerified: true,
      isActive: true,
      // Datos financieros y preferencias
      monthlyIncome: monthlyIncome || 0,
      currentSavings: currentSavings || 0,
      monthlyExpenses: monthlyExpenses || 0,
      primaryGoal: primaryGoal || '',
      timeframe: timeframe || '',
      savingsGoal: savingsGoal || 0,
      riskTolerance: riskTolerance || '',
      budgetType: budgetType || '',
      notificationPreference: notificationPreference || ''
    });

    //registrar usuario en Supabase
    let supabaseAuthUser = null;
    if (supabase) {
      console.log(`Intentando registrar ${email} en Supabase Auth...`);
      const { data: supabaseData, error: supabaseError } = await supabase.auth.signUp({
        email: email,
        password: password, // Supabase Auth también hashea la contraseña
        options: {
          data: {
            name: name,
          }
        }
      });

      if (supabaseError) {
        console.error('Error al registrar en Supabase Auth:', supabaseError.message);
        return res.status(500).json({
          success: false,
          error: { message: `Usuario creado en DB local, pero falló el registro en Supabase: ${supabaseError.message}` }
        });
      } else if (supabaseData.user) {
        console.log(`Usuario ${email} registrado exitosamente en Supabase Auth con ID: ${supabaseData.user.id}`);
        supabaseAuthUser = supabaseData.user;
      } else {
         console.warn(`Registro en Supabase para ${email} no devolvió un usuario, pero tampoco un error. Revisa la configuración de verificación de email en Supabase.`);
      }
    } else {
      console.warn('Cliente Supabase no disponible. Saltando registro en Supabase Auth.');
    }

    //Generar JWT para tu aplicación
    const token = generateToken(user);
    if (!token) {
       return res.status(500).json({
          success: false,
          error: { message: 'Error interno al generar el token de sesión.' }
        });
    }

    //Enviar Respuesta Exitosa 
    res.status(201).json({
      success: true,
      data: {
        user: { // Datos del usuario
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified
        },
        token, // El token JWT
        supabaseUserId: supabaseAuthUser ? supabaseAuthUser.id : null
      }
    });

  } catch (error) {
    // Captura error inesperado
    console.error('Error detallado en registro (catch general):', error);
    if (!res.headersSent) {
      next(error);
    }
  }
};

// --- Inicio de Sesión ---
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario en tu base de datos
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { message: 'Credenciales inválidas (email no encontrado)' }
      });
    }

    if (user.isLocked && user.isLocked()) {
      const lockTime = user.lockUntil ? new Date(user.lockUntil).toLocaleString() : 'pronto';
      return res.status(423).json({ // 423 Locked
        success: false,
        error: {
          message: `Cuenta bloqueada. Intente nuevamente después de ${lockTime}`
        }
      });
    }

    // Verificar contraseña
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      // Incrementar intentos fallidos
      if (user.incrementLoginAttempts) {
         await user.incrementLoginAttempts();
      }
      return res.status(401).json({
        success: false,
        error: {
          message: 'Credenciales inválidas (contraseña incorrecta)',
          //mostrar intentos restantes
        }
      });
    }

    // Verificar si el email está verificado
    if (!user.emailVerified) {
      return res.status(403).json({ // 403 Forbidden
        success: false,
        error: { message: 'Por favor verifique su email antes de iniciar sesión' }
      });
    }

    // Resetear intentos de login si la contraseña fue correcta
     if (user.resetLoginAttempts) {
        await user.resetLoginAttempts();
     }

    // Generar token JWT para tu aplicación
    const token = generateToken(user);
     if (!token) {
       return res.status(500).json({
          success: false,
          error: { message: 'Error interno al generar el token de sesión.' }
        });
    }

    // Enviar respuesta exitosa
    res.json({
      success: true,
      data: {
        user: { // Devuelve solo la información necesaria del usuario
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified
        },
        token
      }
    });
  } catch (error) {
    console.error('Error detallado en login:', error);
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { token: verificationToken } = req.params; 
    if (!verificationToken) {
        return res.status(400).json({ success: false, error: { message: 'Token de verificación no proporcionado.' } });
    }

    // Busca al usuario por el token y verifica que no haya expirado
    const user = await User.findOne({
      where: {
        emailVerificationToken: verificationToken,
        // Comprueba que la fecha de expiración sea mayor que la fecha actual
        emailVerificationExpires: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      // Podría ser un token inválido, expirado o ya usado
      return res.status(400).json({
        success: false,
        error: { message: 'Token de verificación inválido, expirado o ya utilizado.' }
      });
    }
    user.emailVerified = true;
    user.isActive = true; // Activar la cuenta
    user.emailVerificationToken = null; // Limpiar token para que no se reutilice
    user.emailVerificationExpires = null; // Limpiar fecha de expiración
    await user.save();

    // Respuesta exitosa
    res.json({
      success: true,
      message: 'Email verificado correctamente. Ahora puedes iniciar sesión.'
    });
  } catch (error) {
    console.error('Error detallado en verificación de email:', error);
    next(error);
  }
};

// --- Podrías añadir aquí otras funciones: forgotPassword, resetPassword, etc. ---