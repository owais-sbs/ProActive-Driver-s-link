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
    mutationFn: async (input: NewBooking) => {
      const data = await postJSON<{ booking: Booking }>('/api/bookings', input);
      return data.booking;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BOOKINGS_KEY });
    },
  });
}

export function useBookings() {
  return useQuery<Booking[]>({
    queryKey: BOOKINGS_KEY,
    queryFn: async () => {
      const res = await fetch('/api/bookings');
      if (!res.ok) throw new Error('Failed to load bookings');
      const data = await res.json();
      return (data.bookings as Booking[]) ?? [];
    },
  });
}

export function useUpdateBookingStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      const data = await patchJSON<{ booking: Booking }>(`/api/bookings/${id}`, { status });
      return data.booking;
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
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete booking');
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
      const res = await fetch('/api/pricing', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load pricing');
      const data = await res.json();
      return data.packages as PricingPackage[];
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}

export function useSavePricing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (packages: PricingPackage[]) =>
      postJSON<{ ok: boolean }>('/api/pricing', { packages }),
    onSuccess: (_data, packages) => {
      qc.setQueryData(PRICING_KEY, packages);
      qc.invalidateQueries({ queryKey: PRICING_KEY });
    },
  });
}
