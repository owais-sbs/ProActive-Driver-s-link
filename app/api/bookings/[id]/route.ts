import { NextResponse } from 'next/server';
import { z } from 'zod';
import { adminClient } from '@/lib/adminClient';
import { serverErrorResponse } from '@/lib/apiError';

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
      console.error('PATCH /api/bookings/[id]', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to update booking', code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({ booking: data });
  } catch (err) {
    return serverErrorResponse('PATCH /api/bookings/[id]', err);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = adminClient();
    const { error } = await supabase.from('bookings').delete().eq('id', params.id);

    if (error) {
      console.error('DELETE /api/bookings/[id]', { message: error.message, code: error.code });
      return NextResponse.json(
        { error: 'Failed to delete booking', code: error.code },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return serverErrorResponse('DELETE /api/bookings/[id]', err);
  }
}
