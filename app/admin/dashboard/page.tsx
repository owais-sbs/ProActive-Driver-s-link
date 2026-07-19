import { AdminShell } from '@/components/admin/AdminShell';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function DashboardPage() {
  return (
    <AdminShell>
      <AdminDashboard />
    </AdminShell>
  );
}
