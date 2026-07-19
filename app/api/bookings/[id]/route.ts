import { NextResponse } from 'next/server';
import { z } from 'zod';
import { adminClient } from '@/lib/adminClient';

const statusSchema = z.object({
  status: z.enum(['Pending', 'Confirmed', 'Paid']),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid status', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = adminClient();
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: parsed.data.status })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }

    return NextResponse.json({ booking: data });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
