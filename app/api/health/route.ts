import { NextResponse } from 'next/server';
import { envDiagnostics } from '@/lib/env';

/**
 * Lightweight config check for Netlify debugging.
 * Never returns secret values — only booleans.
 *
 * Server APIs need: URL + service role.
 * Anon key is optional (browser Supabase client is unused).
 */
export async function GET() {
  const env = envDiagnostics();
  const ok = env.hasUrl && env.hasServiceRole;

  return NextResponse.json(
    {
      ok,
      env,
      hint: ok
        ? 'Supabase server env looks present.'
        : 'Missing NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY in this Netlify runtime. Set them for Production + Builds, then redeploy. Prefer SUPABASE_ANON_KEY (not NEXT_PUBLIC_) if you need an anon key — NEXT_PUBLIC_* is embedded in the client bundle and fails Secrets Scanning.',
    },
    { status: ok ? 200 : 503 }
  );
}
