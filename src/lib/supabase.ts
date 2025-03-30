
import { supabase } from '@/integrations/supabase/client';

// Helper to check if we're in development mode
export const isDevelopment = import.meta.env.DEV;

// Export the supabase client
export { supabase };

// The application is now using a real Supabase instance, not mock data
export const isUsingMockData = false;
