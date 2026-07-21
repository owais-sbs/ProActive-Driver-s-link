/**
 * Server-only secrets. Never import from Client Components.
 *
 * Env names are built at runtime (join) so Next/webpack cannot
 * statically replace process.env.SECRET with the plaintext value
 * during `next build` (that embedding fails Netlify Secrets Scanning).
 */
import 'server-only';

function readSecret(parts: string[]): string | undefined {
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

function hasSecret(parts: string[]): boolean {
  return Boolean(readSecret(parts));
}

export function getSupabaseServiceRoleKey(): string {
  const key =
    readSecret(['SUPABASE', 'SERVICE', 'ROLE', 'KEY']) ||
    readSecret(['SUPABASE', 'SERVICE', 'KEY']);
  if (!key) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY. Set it in Netlify for Functions/runtime (not only Builds).'
    );
  }
  return key;
}

export function getAdminEmail(): string | undefined {
  return readSecret(['ADMIN', 'EMAIL']);
}

export function getAdminPassword(): string | undefined {
  return readSecret(['ADMIN', 'PASSWORD']);
}

/** Booleans only — never returns secret values. */
export function secretsDiagnostics() {
  return {
    hasServiceRole: hasSecret(['SUPABASE', 'SERVICE', 'ROLE', 'KEY']),
    hasAdminEmail: hasSecret(['ADMIN', 'EMAIL']),
    hasAdminPassword: hasSecret(['ADMIN', 'PASSWORD']),
  };
}
