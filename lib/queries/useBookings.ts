'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Booking, BookingStatus, NewBooking } from '@/types/booking';
import type { PricingPackage } from '@/types/pricing';

export const BOOKINGS_KEY = ['bookings'] as const;
export const PRICING_KEY = ['pricing'] as const;

async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => 'Request failed');
    throw new Error(msg || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

async function patchJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => 'Request failed');
    throw new Error(msg || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: NewBooking) =>
      postJSON<Booking>('/api/bookings', input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BOOKINGS_KEY });
    },
  });
}

export function useBookings() {
  return useQuery<Booking[]>({
    queryKey: BOOKINGS_KEY,
    queryFn: async () => {
      try {
        const res = await fetch('/api/bookings');
        if (!res.ok) throw new Error('Failed to load bookings');
        const data = await res.json();
        const list = (data.bookings as Booking[]) ?? [];
        if (list.length === 0) {
          const { dummyBookings } = await import('@/lib/data/dummyBookings');
          return dummyBookings;
        }
        return list;
      } catch {
        const { dummyBookings } = await import('@/lib/data/dummyBookings');
        return dummyBookings;
      }
    },
  });
}

export function useUpdateBookingStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      if (id.startsWith('demo-')) {
        return { id, status } as Booking;
      }
      return patchJSON<Booking>(`/api/bookings/${id}`, { status });
    },
    onSuccess: (_data, vars) => {
      qc.setQueryData<Booking[]>(BOOKINGS_KEY, (prev: Booking[] | undefined) =>
        (prev ?? []).map((b: Booking) =>
          b.id === vars.id ? { ...b, status: vars.status } : b
        )
      );
    },
  });
}

export function useDeleteBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // UI-only delete for now (demo + local cache)
      return id;
    },
    onSuccess: (id) => {
      qc.setQueryData<Booking[]>(BOOKINGS_KEY, (prev: Booking[] | undefined) =>
        (prev ?? []).filter((b: Booking) => b.id !== id)
      );
    },
  });
}

export function usePricing() {
  return useQuery<PricingPackage[]>({
    queryKey: PRICING_KEY,
    queryFn: async () => {
      const res = await fetch('/api/pricing');
      if (!res.ok) throw new Error('Failed to load pricing');
      const data = await res.json();
      return data.packages as PricingPackage[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSavePricing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (packages: PricingPackage[]) =>
      postJSON<{ ok: boolean }>('/api/pricing', { packages }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PRICING_KEY });
    },
  });
}
