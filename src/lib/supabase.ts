
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are available, use placeholders if not
const url = supabaseUrl || 'https://placeholder-url.supabase.co';
const key = supabaseAnonKey || 'placeholder-key';

// Log warning if credentials are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Using mock data instead.');
}

// Create and export the Supabase client
export const supabase = createClient(url, key);

// Helper to check if we're using real or mock data
export const isUsingMockData = !supabaseUrl || !supabaseAnonKey;
