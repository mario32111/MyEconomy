import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Please set your Supabase environment variables');
}

// Validar que la URL sea válida
try {
  new URL(supabaseUrl);
} catch (error) {
  console.error('Invalid Supabase URL');
  throw new Error('Please check your Supabase URL');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);