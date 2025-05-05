// backend/config/supabaseClient.js
require('dotenv').config(); // Asegura que las variables de .env se carguen
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Advertencia: SUPABASE_URL o SUPABASE_ANON_KEY no están configuradas en .env. La integración con Supabase Auth estará deshabilitada.'
  );
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Cliente Supabase inicializado correctamente.');
  } catch (error) {
    console.error('Error al inicializar el cliente Supabase:', error);
  }
}

module.exports = supabase; // Exporta el cliente inicializado (o null si falló o no hay credenciales)