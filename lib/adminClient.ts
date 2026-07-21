import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseUrl } from '@/lib/env';
import { getSupabaseServiceRoleKey } from '@/lib/secrets';

/**
 * Server-only Supabase client (service role).
 * Never import this into client components.
 */
export function adminClient(): SupabaseClient {
  return createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
