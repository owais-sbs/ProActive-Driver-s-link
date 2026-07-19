import { AdminShell } from '@/components/admin/AdminShell';
import { BookingsTable } from '@/components/admin/BookingsTable';

export default function LeadsPage() {
  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Leads</h1>
        <p className="mt-1 text-sm text-ink/60">
          Booking form submissions land here. Update status as you confirm and collect payment.
        </p>
      </div>
      <BookingsTable />
    </AdminShell>
  );
}
