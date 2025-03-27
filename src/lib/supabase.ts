
import { createClient } from '@supabase/supabase-js';

// Default to empty strings but with mock data functionality
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Log warning instead of error to prevent app crash
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase credentials. Using mock data instead.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if we're using real or mock data
export const isUsingMockData = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;
