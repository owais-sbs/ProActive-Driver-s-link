import { AdminShell } from '@/components/admin/AdminShell';
import { PricingEditor } from '@/components/admin/PricingEditor';

export default function PackagesPage() {
  return (
    <AdminShell>
      <PricingEditor />
    </AdminShell>
  );
}
