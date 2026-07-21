import 'server-only';
import { NextResponse } from 'next/server';
import { envDiagnostics } from '@/lib/env';

/** Strip anything that looks like a JWT / service key from log strings. */
function redact(message: string): string {
  return message
    .replace(/eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g, '[REDACTED_JWT]')
    .replace(/service[_-]?role[=:\s]+[^\s,}]+/gi, 'service_role=[REDACTED]');
}

export function logServerError(scope: string, err: unknown) {
  const diag = envDiagnostics();
  const message =
    err instanceof Error ? redact(err.message) : redact(String(err ?? 'Unknown error'));

  // Never log process.env or secret values — diagnostics are booleans only.
  console.error(`[${scope}]`, {
    message,
    env: diag,
    stack: err instanceof Error ? redact(err.stack ?? '') : undefined,
  });
}

/**
 * Client-safe error body. Never includes credentials.
 */
export function serverErrorResponse(scope: string, err: unknown, status = 500) {
  logServerError(scope, err);

  const isConfig =
    err instanceof Error &&
    /missing supabase|missing supabase_service|invalid supabase url/i.test(err.message);

  return NextResponse.json(
    {
      error: isConfig
        ? 'Server configuration error. Check Netlify environment variables.'
        : 'Server error',
      code: isConfig ? 'ENV_CONFIG' : 'SERVER_ERROR',
      scope,
    },
    { status }
  );
}
