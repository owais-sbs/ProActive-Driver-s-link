import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/adminClient';
import { serverErrorResponse } from '@/lib/apiError';
import { defaultPricing } from '@/lib/data/pricing';
import type { PricingPackage } from '@/types/pricing';

export async function GET() {
  try {
    const supabase = adminClient();
    const { data, error } = await supabase
      .from('pricing')
      .select('*')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('GET /api/pricing', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to load pricing', code: error.code },
        { status: 500 }
      );
    }

    const packages: PricingPackage[] =
      data && data.length > 0
        ? data.map((row) => ({
            id: row.id,
            category: row.category,
            name: row.name,
            price: row.price,
            period: row.period,
            description: row.description,
            features: Array.isArray(row.features) ? row.features : [],
            highlighted: row.highlighted,
            sort_order: row.sort_order,
          }))
        : defaultPricing;

    return NextResponse.json({ packages });
  } catch (err) {
    return serverErrorResponse('GET /api/pricing', err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.packages)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const incoming = body.packages as PricingPackage[];
    const supabase = adminClient();

    await supabase.from('pricing').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const rows = incoming.map((p) => ({
      category: p.category,
      name: p.name,
      price: p.price,
      period: p.period || null,
      description: p.description || null,
      features: p.features,
      highlighted: p.highlighted,
      sort_order: p.sort_order,
    }));

    const { error } = await supabase.from('pricing').insert(rows);

    if (error) {
      console.error('POST /api/pricing', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to save pricing', code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return serverErrorResponse('POST /api/pricing', err);
  }
}
