'use client';

import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend,
} from 'recharts';
import {
  CalendarCheck,
  Clock,
  DollarSign,
  Loader2,
  Users,
  ArrowRight,
  Package,
} from 'lucide-react';
import Link from 'next/link';
import { BookingsTable } from './BookingsTable';
import { useBookings, usePricing } from '@/lib/queries/useBookings';
import type { Booking, BookingStatus } from '@/types/booking';
import type { PricingPackage } from '@/types/pricing';
import { Button } from '@/components/ui/button';

const STATUS_COLORS: Record<BookingStatus, string> = {
  Pending: '#9CA3AF',
  Confirmed: '#005A66',
  Paid: '#007786',
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function AdminDashboard() {
  const { data, isLoading } = useBookings();
  const { data: pricingData } = usePricing();
  const bookings: Booking[] = data ?? [];
  const packages: PricingPackage[] = pricingData ?? [];

  const stats = useMemo(() => {
    const pending = bookings.filter((b) => b.status === 'Pending').length;
    const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
    const paid = bookings.filter((b) => b.status === 'Paid').length;
    const g2Packages = packages.filter((p) => p.category === 'G2').length;
    const gPackages = packages.filter((p) => p.category === 'G').length;
    return {
      total: bookings.length,
      pending,
      confirmed,
      paid,
      packages: packages.length,
      g2Packages,
      gPackages,
    };
  }, [bookings, packages]);

  const statusChart = useMemo(
    () => [
      { name: 'Pending', value: stats.pending, fill: STATUS_COLORS.Pending },
      { name: 'Confirmed', value: stats.confirmed, fill: STATUS_COLORS.Confirmed },
      { name: 'Paid', value: stats.paid, fill: STATUS_COLORS.Paid },
    ],
    [stats]
  );

  const lessonChart = useMemo(() => {
    const map = new Map<string, number>();
    bookings.forEach((b) => {
      const key = b.lesson_type || 'Other';
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({
        name: name.length > 16 ? name.slice(0, 14) + '…' : name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [bookings]);

  const monthlyChart = useMemo(() => {
    const year = new Date().getFullYear();
    const rows = MONTH_LABELS.map((name) => ({ name, leads: 0, paid: 0 }));

    bookings.forEach((b) => {
      const d = new Date(b.created_at);
      if (Number.isNaN(d.getTime()) || d.getFullYear() !== year) return;
      const i = d.getMonth();
      rows[i].leads += 1;
      if (b.status === 'Paid') rows[i].paid += 1;
    });

    return rows;
  }, [bookings]);

  const cards = [
    { label: 'Total Leads', value: stats.total, icon: Users, tone: 'bg-forest/10 text-forest' },
    { label: 'Pending', value: stats.pending, icon: Clock, tone: 'bg-amber-50 text-amber-700' },
    { label: 'Confirmed', value: stats.confirmed, icon: CalendarCheck, tone: 'bg-sage/15 text-forest' },
    { label: 'Paid', value: stats.paid, icon: DollarSign, tone: 'bg-sage/15 text-forest' },
    {
      label: 'Packages',
      value: stats.packages,
      icon: Package,
      tone: 'bg-moss/10 text-forest',
      hint: `${stats.g2Packages} G2 · ${stats.gPackages} G`,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-ink/60">
          Live overview from Supabase — leads, packages, and pipeline.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-ink/60">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading dashboard…
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
            {cards.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-ink/50 sm:text-xs">
                      {c.label}
                    </p>
                    <p className="mt-1 font-display text-xl font-extrabold tabular-nums text-ink sm:mt-1.5 sm:text-3xl">
                      {c.value}
                    </p>
                    {'hint' in c && c.hint ? (
                      <p className="mt-0.5 truncate text-[10px] text-ink/45 sm:text-xs">{c.hint}</p>
                    ) : null}
                  </div>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 ${c.tone}`}
                  >
                    <c.icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-6">
              <h2 className="text-sm font-bold text-ink">Leads by status</h2>
              <p className="mt-0.5 text-xs text-ink/50">Current pipeline</p>
              <div className="mt-3 h-48 w-full sm:mt-4 sm:h-64">
                {stats.total === 0 ? (
                  <p className="flex h-full items-center justify-center text-sm text-ink/45">
                    No leads yet — submit a booking to see data.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusChart} barSize={32} margin={{ left: -8, right: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} width={28} />
                      <Tooltip
                        cursor={{ fill: '#F7F8FB' }}
                        contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {statusChart.map((entry) => (
                          <Cell key={entry.name} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-6">
              <h2 className="text-sm font-bold text-ink">Lesson type demand</h2>
              <p className="mt-0.5 text-xs text-ink/50">Most requested lessons</p>
              <div className="mt-3 h-48 w-full sm:mt-4 sm:h-64">
                {lessonChart.length === 0 ? (
                  <p className="flex h-full items-center justify-center text-sm text-ink/45">
                    No lesson data yet.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lessonChart} layout="vertical" barSize={16} margin={{ left: 0, right: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                      <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" width={72} tick={{ fontSize: 9, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        cursor={{ fill: '#F7F8FB' }}
                        contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }}
                      />
                      <Bar dataKey="value" fill="#007786" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-6">
            <h2 className="text-sm font-bold text-ink">Monthly leads vs paid</h2>
            <p className="mt-0.5 text-xs text-ink/50">{new Date().getFullYear()} — from live bookings</p>
            <div className="mt-3 h-52 w-full sm:mt-4 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyChart} barGap={2} margin={{ left: -8, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip
                    cursor={{ fill: '#F7F8FB' }}
                    contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="leads" name="Leads" fill="#33A0AB" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="paid" name="Paid" fill="#007786" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-extrabold text-ink">Recent leads</h2>
          <p className="text-sm text-ink/60">Latest booking form submissions</p>
        </div>
        <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
          <Link href="/admin/leads">
            Open Leads <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      <BookingsTable />
    </div>
  );
}
