import { createClient } from '@supabase/supabase-js';

// Parse environment variables to handle malformed values
let supabaseUrl = process.env.SUPABASE_URL || '';
let supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// Clean up malformed URLs (remove any prefix)
if (supabaseUrl.includes('=')) {
  supabaseUrl = supabaseUrl.split('=').pop() || '';
}
if (supabaseAnonKey.includes('=')) {
  supabaseAnonKey = supabaseAnonKey.split('=').pop() || '';
}

// Fallback to working values if environment variables are not set properly
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Environment variables not set properly, using fallback values');
  supabaseUrl = 'https://nhuawcuzhathicibdgny.supabase.co';
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5odWF3Y3V6aGF0aGljaWJkZ255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NTQzNjIsImV4cCI6MjA1NTUzMDM2Mn0.cBQm67kD0lbHRL6uXQAinz6MUTHGdAM65_jd5mEveTA';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);