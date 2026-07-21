import { NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/schemas/booking';
import { adminClient } from '@/lib/adminClient';
import { serverErrorResponse } from '@/lib/apiError';

export async function GET() {
  try {
    const supabase = adminClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('GET /api/bookings', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to load bookings', code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookings: data ?? [] });
  } catch (err) {
    return serverErrorResponse('GET /api/bookings', err);
  }
}

const insertSchema = bookingSchema.omit({ confirm: true });

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const parsed = insertSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = adminClient();
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        full_name: parsed.data.full_name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        lesson_type: parsed.data.lesson_type,
        preferred_time: parsed.data.preferred_time,
        pick_up_location: parsed.data.pick_up_location,
        drop_off_location: parsed.data.drop_off_location,
        address: parsed.data.address,
        message: parsed.data.message || null,
        status: 'Pending',
      })
      .select()
      .single();

    if (error) {
      console.error('POST /api/bookings', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to create booking', code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({ booking: data }, { status: 201 });
  } catch (err) {
    return serverErrorResponse('POST /api/bookings', err);
  }
}
