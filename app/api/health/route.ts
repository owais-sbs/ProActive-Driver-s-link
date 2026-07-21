import { NextResponse } from 'next/server';
import { envDiagnostics } from '@/lib/env';

/**
 * Lightweight config check for Netlify debugging.
 * Never returns secret values — only booleans.
 */
export async function GET() {
  const env = envDiagnostics();
  const ok = env.hasUrl && env.hasAnon && env.hasServiceRole;

  return NextResponse.json(
    {
      ok,
      env,
      hint: ok
        ? 'Supabase env looks present.'
        : 'One or more Supabase env vars are missing in this Netlify runtime. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY for Production + Builds, then redeploy.',
    },
    { status: ok ? 200 : 503 }
  );
}
