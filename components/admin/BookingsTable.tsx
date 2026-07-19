'use client';

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  ArrowUp,
  ArrowDown,
  Trash2,
  LayoutGrid,
  Table2,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useBookings,
  useUpdateBookingStatus,
  useDeleteBooking,
} from '@/lib/queries/useBookings';
import type { Booking, BookingStatus } from '@/types/booking';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const columnHelper = createColumnHelper<Booking>();

const statusStyles: Record<BookingStatus, string> = {
  Pending: 'bg-amber-50 text-amber-800 border-amber-200',
  Confirmed: 'bg-sage/15 text-forest border-sage/40',
  Paid: 'bg-emerald-100 text-emerald-700 border-emerald-300',
};

type ViewMode = 'table' | 'cards';

export function BookingsTable() {
  const { data, isLoading } = useBookings();
  const updateStatus = useUpdateBookingStatus();
  const deleteBooking = useDeleteBooking();

  const [view, setView] = useState<ViewMode>('table');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'created_at', desc: true }]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      columnHelper.accessor('full_name', {
        header: 'Name',
        cell: (info) => <span className="font-semibold text-ink">{info.getValue()}</span>,
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        cell: (info) => <span className="text-ink/65">{info.getValue()}</span>,
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => (
          <a href={`mailto:${info.getValue()}`} className="text-forest hover:underline">
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor('lesson_type', {
        header: 'Lesson',
        cell: (info) => <span className="text-ink/65">{info.getValue()}</span>,
      }),
      columnHelper.accessor('preferred_time', {
        header: 'Time',
        cell: (info) => <span className="text-ink/65">{info.getValue()}</span>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue() as BookingStatus;
          return (
            <span
              className={cn(
                'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                statusStyles[status]
              )}
            >
              {status}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex items-center gap-1.5">
              <Select
                value={row.status}
                onValueChange={(v) =>
                  updateStatus.mutate({ id: row.id, status: v as BookingStatus })
                }
              >
                <SelectTrigger className="h-8 w-[110px] border-mist text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              <button
                type="button"
                aria-label={`Delete ${row.full_name}`}
                onClick={() => {
                  if (window.confirm(`Delete lead “${row.full_name}”?`)) {
                    deleteBooking.mutate(row.id);
                  }
                }}
                className="grid h-8 w-8 place-items-center rounded-lg text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        },
      }),
      columnHelper.accessor('created_at', {
        header: 'Received',
        cell: (info) => (
          <span className="whitespace-nowrap text-xs text-ink/60">
            {new Date(info.getValue()).toLocaleDateString('en-CA', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        ),
      }),
    ],
    [updateStatus, deleteBooking]
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-sm text-ink/60">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading leads…
      </div>
    );
  }

  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">
            Booking requests
          </h2>
          <p className="text-sm text-ink/60">
            {table.getFilteredRowModel().rows.length} of {data?.length ?? 0} leads
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search name, phone, email…"
              className="w-full rounded-xl border border-mist bg-white py-2.5 pl-10 pr-3 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setView('table')}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition',
                view === 'table' ? 'bg-forest text-white' : 'text-ink/60 hover:bg-cream'
              )}
            >
              <Table2 className="h-3.5 w-3.5" /> Table
            </button>
            <button
              type="button"
              onClick={() => setView('cards')}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition',
                view === 'cards' ? 'bg-forest text-white' : 'text-ink/60 hover:bg-cream'
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Cards
            </button>
          </div>
        </div>
      </div>

      {view === 'table' ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-ink/55">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => {
                      const sortable = header.column.getCanSort();
                      const sortDir = header.column.getIsSorted();
                      return (
                        <th key={header.id} className="px-4 py-3.5 font-semibold">
                          {header.isPlaceholder ? null : (
                            <button
                              type="button"
                              disabled={!sortable}
                              onClick={header.column.getToggleSortingHandler()}
                              className={cn('inline-flex items-center gap-1', sortable && 'hover:text-ink')}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {sortable && <ArrowUpDown className="h-3 w-3 opacity-40" />}
                              {sortDir === 'asc' && <ArrowUp className="h-3 w-3 text-forest" />}
                              {sortDir === 'desc' && <ArrowDown className="h-3 w-3 text-forest" />}
                            </button>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-14 text-center text-sm text-ink/55">
                      No leads yet.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.id} className="transition hover:bg-slate-50/80">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3.5 align-middle">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination table={table} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {rows.length === 0 ? (
              <p className="col-span-full py-12 text-center text-sm text-ink/55">No leads yet.</p>
            ) : (
              rows.map((row) => {
                const b = row.original;
                return (
                  <article
                    key={b.id}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-ink">{b.full_name}</h3>
                        <p className="mt-0.5 text-xs text-ink/50">
                          {new Date(b.created_at).toLocaleDateString('en-CA', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                          statusStyles[b.status]
                        )}
                      >
                        {b.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-ink/70">
                      <p className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-forest" /> {b.phone}
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <Mail className="h-3.5 w-3.5 text-forest" /> {b.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-forest" /> {b.pick_up_location}
                      </p>
                    </div>

                    <p className="mt-3 rounded-lg bg-cream px-3 py-2 text-sm font-medium text-ink">
                      {b.lesson_type}
                      <span className="mt-0.5 block text-xs font-normal text-ink/55">
                        {b.preferred_time}
                      </span>
                    </p>

                    <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                      <Select
                        value={b.status}
                        onValueChange={(v) =>
                          updateStatus.mutate({ id: b.id, status: v as BookingStatus })
                        }
                      >
                        <SelectTrigger className="h-9 flex-1 border-mist text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                      <button
                        type="button"
                        aria-label={`Delete ${b.full_name}`}
                        onClick={() => {
                          if (window.confirm(`Delete lead “${b.full_name}”?`)) {
                            deleteBooking.mutate(b.id);
                          }
                        }}
                        className="grid h-9 w-9 place-items-center rounded-lg text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
          <Pagination table={table} />
        </>
      )}
    </div>
  );
}

function Pagination({
  table,
}: {
  table: ReturnType<typeof useReactTable<Booking>>;
}) {
  return (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs text-ink/60">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
