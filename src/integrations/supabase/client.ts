
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nlbwfanyfhddtnaaopnj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sYndmYW55ZmhkZHRuYWFvcG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMjc2MzcsImV4cCI6MjA1ODkwMzYzN30.2BW3Icj4bPtRPs4Nn4HHOtvll-H5w0nv6hPyWVl1VBw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
