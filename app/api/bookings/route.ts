import { NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/schemas/booking';
import { adminClient } from '@/lib/adminClient';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const supabase = adminClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to load bookings' },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookings: data });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
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

    // Public insert via anon client (RLS allows anon INSERT).
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
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({ booking: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
