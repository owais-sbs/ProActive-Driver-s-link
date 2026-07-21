import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/adminClient';
import { serverErrorResponse } from '@/lib/apiError';
import { defaultSiteContent } from '@/lib/data/content';
import type { ContentSection, SiteContentMap } from '@/types/content';

function mergeContent(rows: { section: string; data: unknown }[]): SiteContentMap {
  const merged = { ...defaultSiteContent };

  for (const row of rows) {
    const section = row.section as ContentSection;
    if (!(section in merged) || !row.data || typeof row.data !== 'object') continue;

    const patch = row.data as Record<string, unknown>;
    if (section === 'hero') merged.hero = { ...merged.hero, ...patch } as SiteContentMap['hero'];
    if (section === 'why') merged.why = { ...merged.why, ...patch } as SiteContentMap['why'];
    if (section === 'lessons') merged.lessons = { ...merged.lessons, ...patch } as SiteContentMap['lessons'];
    if (section === 'testimonials') {
      merged.testimonials = { ...merged.testimonials, ...patch } as SiteContentMap['testimonials'];
    }
    if (section === 'final_cta') merged.final_cta = { ...merged.final_cta, ...patch } as SiteContentMap['final_cta'];
  }

  return merged;
}

export async function GET() {
  try {
    const supabase = adminClient();
    const { data, error } = await supabase.from('site_content').select('section, data');

    if (error) {
      console.error('GET /api/content', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to load content', code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({ content: mergeContent(data ?? []) });
  } catch (err) {
    return serverErrorResponse('GET /api/content', err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body?.section || !body?.data) {
      return NextResponse.json({ error: 'section and data are required' }, { status: 400 });
    }

    const section = body.section as ContentSection;
    const allowed: ContentSection[] = ['hero', 'why', 'lessons', 'testimonials', 'final_cta'];
    if (!allowed.includes(section)) {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }

    const supabase = adminClient();
    const { data, error } = await supabase
      .from('site_content')
      .upsert({ section, data: body.data }, { onConflict: 'section' })
      .select('section, data')
      .single();

    if (error) {
      console.error('POST /api/content', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to save content', code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, section: data.section, data: data.data });
  } catch (err) {
    return serverErrorResponse('POST /api/content', err);
  }
}
