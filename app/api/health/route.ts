import { NextResponse } from 'next/server';
import { envDiagnostics } from '@/lib/env';
import { secretsDiagnostics } from '@/lib/secrets';

/**
 * Lightweight config check. Never returns secret values.
 */
export async function GET() {
  const env = { ...envDiagnostics(), ...secretsDiagnostics() };
  const ok = env.hasUrl && env.hasServiceRole;

  return NextResponse.json(
    {
      ok,
      env: {
        hasUrl: env.hasUrl,
        hasAnon: env.hasAnon,
        hasServiceRole: env.hasServiceRole,
        nodeEnv: env.nodeEnv,
      },
      hint: ok
        ? 'Supabase server env looks present.'
        : 'Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY. On Netlify, set the service role key for Functions/runtime. Avoid exposing it during Builds if Secrets Scanning fails.',
    },
    { status: ok ? 200 : 503 }
  );
}
