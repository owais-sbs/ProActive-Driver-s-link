import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/adminClient';
import { serverErrorResponse } from '@/lib/apiError';
import { defaultSiteSettings } from '@/lib/data/settings';
import type { SiteSettings } from '@/types/settings';

export async function GET() {
  try {
    const supabase = adminClient();
    const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();

    if (error) {
      console.error('GET /api/settings', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to load settings', code: error.code },
        { status: 500 }
      );
    }

    const settings: SiteSettings = data
      ? {
          id: data.id,
          phone: data.phone,
          email: data.email,
          whatsapp: data.whatsapp,
          address: data.address,
          etransfer: data.etransfer,
          hours: data.hours,
        }
      : defaultSiteSettings;

    return NextResponse.json({ settings });
  } catch (err) {
    return serverErrorResponse('GET /api/settings', err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const supabase = adminClient();
    const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();

    const row = {
      phone: body.phone ?? '',
      email: body.email ?? '',
      whatsapp: body.whatsapp ?? '',
      address: body.address ?? '',
      etransfer: body.etransfer ?? '',
      hours: body.hours ?? '',
    };

    const { data, error } = existing?.id
      ? await supabase.from('site_settings').update(row).eq('id', existing.id).select('*').single()
      : await supabase.from('site_settings').insert(row).select('*').single();

    if (error) {
      console.error('POST /api/settings', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to save settings', code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      settings: {
        id: data.id,
        phone: data.phone,
        email: data.email,
        whatsapp: data.whatsapp,
        address: data.address,
        etransfer: data.etransfer,
        hours: data.hours,
      },
    });
  } catch (err) {
    return serverErrorResponse('POST /api/settings', err);
  }
}
