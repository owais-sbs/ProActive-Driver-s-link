import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/adminClient';
import { serverErrorResponse } from '@/lib/apiError';

const BUCKET = 'site-media';
const MAX_BYTES = 8 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export async function POST(req: Request) {
  try {
    const form = await req.formData().catch(() => null);
    const file = form?.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }

    const ext = EXT_BY_TYPE[file.type];
    if (!ext) {
      return NextResponse.json({ error: 'Only JPG, PNG or WebP images are allowed' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Image must be 8 MB or smaller' }, { status: 400 });
    }

    const supabase = adminClient();

    // Create the bucket on first use if the migration has not been applied.
    const { error: bucketErr } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_BYTES,
      allowedMimeTypes: Object.keys(EXT_BY_TYPE),
    });
    if (bucketErr && !/already exists|duplicate/i.test(bucketErr.message)) {
      throw bucketErr;
    }

    const path = `happy-students/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return NextResponse.json({ ok: true, url: data.publicUrl });
  } catch (err) {
    return serverErrorResponse('POST /api/upload', err);
  }
}
