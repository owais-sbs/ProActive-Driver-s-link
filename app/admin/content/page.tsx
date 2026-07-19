import { AdminShell } from '@/components/admin/AdminShell';
import { ContentEditor } from '@/components/admin/ContentEditor';

export default function ContentPage() {
  return (
    <AdminShell>
      <ContentEditor />
    </AdminShell>
  );
}
