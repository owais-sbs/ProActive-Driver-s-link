'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { MobileDrawer } from './MobileDrawer';
import { siteConfig, navLinks } from '@/lib/data/site';
import { useSiteConfig } from '@/lib/queries/useSiteSettings';
import { cn } from '@/lib/utils';

const TRANSPARENT_ROUTES = ['/', '/about', '/services', '/packages', '/contact'];

export function Header() {
  const site = useSiteConfig();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const canBeTransparent = TRANSPARENT_ROUTES.includes(pathname || '/');
  const transparent = canBeTransparent && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          transparent
            ? 'border-b border-white/10 bg-transparent'
            : 'border-b border-mist/60 bg-white/95 shadow-sm backdrop-blur-md'
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8',
            transparent ? 'h-[112px] lg:h-[104px]' : 'h-[88px] lg:h-[84px]'
          )}
        >
          <Link href="/" aria-label="Turbo Teach home" className="min-w-0 shrink-0">
            <Logo variant={transparent ? 'light' : 'dark'} size="md" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors',
                    transparent
                      ? active
                        ? 'text-sage'
                        : 'text-white/80 hover:text-white'
                      : active
                        ? 'text-forest'
                        : 'text-ink/75 hover:text-ink'
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className={cn(
                        'absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full',
                        transparent ? 'bg-sage' : 'bg-forest'
                      )}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              className={cn(
                'hidden items-center gap-2 text-sm font-semibold md:flex',
                transparent ? 'text-white' : 'text-ink'
              )}
            >
              <Phone className={cn('h-4 w-4', transparent ? 'text-sage' : 'text-forest')} />
              {site.phone}
            </a>
            <Button
              asChild
              size="sm"
              className={cn(
                'hidden sm:inline-flex',
                transparent
                  ? 'bg-white text-forest hover:bg-white/90'
                  : 'bg-forest text-white hover:bg-forest-light'
              )}
            >
              <Link href="/contact">Book a Lesson</Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={cn(
                'grid h-10 w-10 place-items-center rounded-lg transition-colors lg:hidden',
                transparent ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-cream/80'
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && <MobileDrawer open={open} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
