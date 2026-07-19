'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';

export default function AdminPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace('/admin/dashboard');
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading…</p>
      </div>
    );
  }

  return <LoginForm />;
}
