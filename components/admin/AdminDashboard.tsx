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
} from 'lucide-react';
import Link from 'next/link';
import { BookingsTable } from './BookingsTable';
import { useBookings } from '@/lib/queries/useBookings';
import type { Booking, BookingStatus } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { dummyMonthlyLeads } from '@/lib/data/dummyBookings';

const STATUS_COLORS: Record<BookingStatus, string> = {
  Pending: '#9CA3AF',
  Confirmed: '#2D5C3E',
  Paid: '#059669',
};

export function AdminDashboard() {
  const { data, isLoading } = useBookings();
  const bookings: Booking[] = data ?? [];

  const stats = useMemo(() => {
    const pending = bookings.filter((b: Booking) => b.status === 'Pending').length;
    const confirmed = bookings.filter((b: Booking) => b.status === 'Confirmed').length;
    const paid = bookings.filter((b: Booking) => b.status === 'Paid').length;
    return { total: bookings.length, pending, confirmed, paid };
  }, [bookings]);

  const statusChart = useMemo(
    () => [
      { name: 'Pending', value: stats.pending || 4, fill: STATUS_COLORS.Pending },
      { name: 'Confirmed', value: stats.confirmed || 4, fill: STATUS_COLORS.Confirmed },
      { name: 'Paid', value: stats.paid || 4, fill: STATUS_COLORS.Paid },
    ],
    [stats]
  );

  const lessonChart = useMemo(() => {
    const map = new Map<string, number>();
    bookings.forEach((b: Booking) => {
      const key = b.lesson_type || 'Other';
      map.set(key, (map.get(key) || 0) + 1);
    });
    const rows = Array.from(map.entries())
      .map(([name, value]) => ({
        name: name.length > 16 ? name.slice(0, 14) + '…' : name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    if (rows.length === 0) {
      return [
        { name: 'G2 Prep', value: 12 },
        { name: 'G Road Test', value: 9 },
        { name: 'BDE Course', value: 7 },
        { name: 'Refresher', value: 5 },
      ];
    }
    return rows;
  }, [bookings]);

  const cards = [
    { label: 'Total Leads', value: stats.total || 12, icon: Users, tone: 'bg-forest/10 text-forest' },
    { label: 'Pending', value: stats.pending || 4, icon: Clock, tone: 'bg-amber-50 text-amber-700' },
    { label: 'Confirmed', value: stats.confirmed || 4, icon: CalendarCheck, tone: 'bg-sage/15 text-forest' },
    { label: 'Paid', value: stats.paid || 4, icon: DollarSign, tone: 'bg-emerald-50 text-emerald-700' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-ink/60">
          Overview of leads, status, and lesson demand.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-ink/60">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading dashboard…
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusChart} barSize={32} margin={{ left: -8, right: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} width={28} />
                    <Tooltip
                      cursor={{ fill: '#F9F9F7' }}
                      contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {statusChart.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-6">
              <h2 className="text-sm font-bold text-ink">Lesson type demand</h2>
              <p className="mt-0.5 text-xs text-ink/50">Most requested lessons</p>
              <div className="mt-3 h-48 w-full sm:mt-4 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lessonChart} layout="vertical" barSize={16} margin={{ left: 0, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" width={72} tick={{ fontSize: 9, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: '#F9F9F7' }}
                      contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }}
                    />
                    <Bar dataKey="value" fill="#1B3A2A" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-6">
            <h2 className="text-sm font-bold text-ink">Monthly leads vs paid</h2>
            <p className="mt-0.5 text-xs text-ink/50">Year-to-date performance</p>
            <div className="mt-3 h-52 w-full sm:mt-4 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dummyMonthlyLeads} barGap={2} margin={{ left: -8, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#6B7280' }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip
                    cursor={{ fill: '#F9F9F7' }}
                    contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 13 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="leads" name="Leads" fill="#4A8C63" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="paid" name="Paid" fill="#1B3A2A" radius={[6, 6, 0, 0]} />
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
