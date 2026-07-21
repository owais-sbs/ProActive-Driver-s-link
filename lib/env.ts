/**
 * Central env access for Next.js (local + Netlify).
 * - Reads process.env at call time (runtime), not only at module load.
 * - Trims whitespace / wrapping quotes (common Netlify paste issue).
 * - Accepts common aliases so misnamed Netlify vars still work.
 * - Never hardcodes real credentials (Netlify Secrets Scanning would fail).
 * - Never logs secret values.
 */

function raw(name: string): string | undefined {
  const value = process.env[name];
  if (value == null) return undefined;
  let v = String(value).trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v || undefined;
}

function first(...names: string[]): string | undefined {
  for (const name of names) {
    const v = raw(name);
    if (v) return v;
  }
  return undefined;
}

export function getSupabaseUrl(): string {
  const url = first('NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL');
  if (!url) {
    throw new Error(
      'Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL in Netlify env (Production + build).'
    );
  }
  if (!/^https?:\/\//i.test(url)) {
    throw new Error('Invalid Supabase URL. It must start with https://');
  }
  return url.replace(/\/$/, '');
}

/**
 * Optional anon key. Prefer server-only SUPABASE_ANON_KEY in production so
 * Next.js does not embed the value into the client bundle (Secrets Scanning).
 * NEXT_PUBLIC_SUPABASE_ANON_KEY remains supported for local .env.local.
 */
export function getSupabaseAnonKey(): string {
  const key = first('SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY');
  if (!key) {
    throw new Error(
      'Missing Supabase anon key. Set SUPABASE_ANON_KEY (recommended on Netlify) or NEXT_PUBLIC_SUPABASE_ANON_KEY locally.'
    );
  }
  return key;
}

export function getSupabaseServiceRoleKey(): string {
  const key = first('SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SERVICE_KEY');
  if (!key) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY. Set it in Netlify → Environment variables for Production (runtime).'
    );
  }
  return key;
}

/** Optional — no hardcoded defaults (those matched Netlify secrets and failed the scan). */
export function getAdminEmail(): string | undefined {
  return first('ADMIN_EMAIL');
}

/** Optional — no hardcoded defaults. */
export function getAdminPassword(): string | undefined {
  return first('ADMIN_PASSWORD');
}

/** Safe snapshot for server logs — never includes secret values. */
export function envDiagnostics() {
  return {
    hasUrl: Boolean(first('NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL')),
    hasAnon: Boolean(first('SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY')),
    hasServiceRole: Boolean(first('SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SERVICE_KEY')),
    nodeEnv: process.env.NODE_ENV ?? 'unknown',
  };
}
