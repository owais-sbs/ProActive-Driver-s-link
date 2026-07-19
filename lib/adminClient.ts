import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

export function adminClient() {
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@turboteach.ca';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'turboteach-admin';
