'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Settings,
  LogOut,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
} from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { useAdminAuth } from './AdminAuthProvider';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/admin');
  }, [loading, user, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  const go = (href: string) => {
    setMobileOpen(false);
    router.push(href);
  };

  const NavLinks = ({ compact = false }: { compact?: boolean }) => (
    <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
      {links.map((l) => {
        const active = pathname === l.href || pathname?.startsWith(`${l.href}/`);
        return (
          <button
            key={l.href}
            type="button"
            title={l.label}
            onClick={() => go(l.href)}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl text-sm font-medium transition-colors',
              compact ? 'h-11 justify-center px-0' : 'px-3 py-2.5',
              active ? 'bg-forest text-white shadow-sm' : 'text-ink/70 hover:bg-cream hover:text-ink'
            )}
          >
            <l.icon className="h-5 w-5 shrink-0" />
            {!compact && <span className="truncate">{l.label}</span>}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-slate-200 bg-white transition-[width] duration-300 lg:flex',
          collapsed ? 'w-[76px]' : 'w-64'
        )}
      >
        <div
          className={cn(
            'flex h-[84px] shrink-0 items-center border-b border-slate-100',
            collapsed ? 'justify-center px-2' : 'gap-2 px-3'
          )}
        >
          {!collapsed && (
            <Link href="/" className="min-w-0 flex-1 overflow-hidden">
              <Logo variant="dark" size="md" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink/60 transition hover:bg-cream hover:text-ink"
            aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        <NavLinks compact={collapsed} />

        <div className="shrink-0 space-y-1 border-t border-slate-200 p-2">
          <button
            type="button"
            title="Back to site"
            onClick={() => go('/')}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl text-sm font-medium text-ink/70 transition hover:bg-cream',
              collapsed ? 'h-11 justify-center' : 'px-3 py-2.5'
            )}
          >
            <ArrowLeft className="h-5 w-5 shrink-0" />
            {!collapsed && 'Back to site'}
          </button>
          <button
            type="button"
            title="Sign out"
            onClick={() => {
              logout();
              router.replace('/admin');
            }}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl text-sm font-medium text-red-600 transition hover:bg-red-50',
              collapsed ? 'h-11 justify-center' : 'px-3 py-2.5'
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && 'Sign out'}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(100%,18rem)] flex-col bg-white shadow-xl">
            <div className="flex h-[84px] items-center justify-between border-b border-slate-100 px-3">
              <Logo variant="dark" size="md" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl text-ink/60 hover:bg-cream"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <NavLinks />
            <div className="space-y-1 border-t border-slate-200 p-2">
              <button
                type="button"
                onClick={() => go('/')}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-cream"
              >
                <ArrowLeft className="h-5 w-5" /> Back to site
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.replace('/admin');
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      <div
        className={cn(
          'min-w-0 transition-[padding] duration-300',
          collapsed ? 'lg:pl-[76px]' : 'lg:pl-64'
        )}
      >
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-3 backdrop-blur sm:px-4 lg:h-[84px] lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ink/70 hover:bg-cream lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0 lg:hidden">
              <Logo variant="dark" size="md" />
            </div>
            <p className="hidden truncate text-sm text-ink/60 lg:block">
              Signed in as <span className="font-semibold text-ink">{user.email}</span>
            </p>
          </div>
          <button
            type="button"
            className="hidden h-10 items-center gap-2 rounded-xl px-3 text-sm text-ink/60 transition hover:bg-cream hover:text-ink lg:inline-flex"
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </header>

        <div className="px-3 py-4 sm:px-4 sm:py-5 lg:px-8 lg:py-6">{children}</div>
      </div>
    </div>
  );
}
