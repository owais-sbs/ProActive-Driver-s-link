/**
 * Public / shared env helpers (URL + optional anon).
 * Never read SUPABASE_SERVICE_ROLE_KEY or ADMIN_PASSWORD here —
 * those live in lib/secrets.ts (server-only) so they cannot land in client graphs.
 */
function readPublicEnv(parts: string[]): string | undefined {
  const name = parts.join('_');
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

export function getSupabaseUrl(): string {
  const url =
    readPublicEnv(['SUPABASE', 'URL']) ||
    readPublicEnv(['NEXT', 'PUBLIC', 'SUPABASE', 'URL']);
  if (!url) {
    throw new Error(
      'Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL (and/or SUPABASE_URL) in Netlify.'
    );
  }
  if (!/^https?:\/\//i.test(url)) {
    throw new Error('Invalid Supabase URL. It must start with https://');
  }
  return url.replace(/\/$/, '');
}

export function getSupabaseAnonKey(): string {
  const key =
    readPublicEnv(['SUPABASE', 'ANON', 'KEY']) ||
    readPublicEnv(['NEXT', 'PUBLIC', 'SUPABASE', 'ANON', 'KEY']);
  if (!key) {
    throw new Error(
      'Missing Supabase anon key. Prefer SUPABASE_ANON_KEY on Netlify (not NEXT_PUBLIC_).'
    );
  }
  return key;
}

/** Safe snapshot — never reads or returns service-role / admin secrets. */
export function envDiagnostics() {
  return {
    hasUrl: Boolean(
      readPublicEnv(['NEXT', 'PUBLIC', 'SUPABASE', 'URL']) ||
        readPublicEnv(['SUPABASE', 'URL'])
    ),
    hasAnon: Boolean(
      readPublicEnv(['SUPABASE', 'ANON', 'KEY']) ||
        readPublicEnv(['NEXT', 'PUBLIC', 'SUPABASE', 'ANON', 'KEY'])
    ),
    nodeEnv: process.env.NODE_ENV ?? 'unknown',
  };
}
