import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/env';

let browserClient: SupabaseClient | null = null;

/**
 * Browser / anon client (RLS applies).
 * Prefer adminClient() inside API routes.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;
  browserClient = createClient(getSupabaseUrl(), getSupabaseAnonKey());
  return browserClient;
}
