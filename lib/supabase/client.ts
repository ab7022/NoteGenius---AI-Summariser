import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";


export const createSupabaseClient = () => 
  createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);