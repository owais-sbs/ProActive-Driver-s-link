'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { siteConfig, navLinks } from '@/lib/data/site';
import { useSiteConfig } from '@/lib/queries/useSiteSettings';

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const site = useSiteConfig();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.aside
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
        className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl"
        role="dialog" aria-modal="true" aria-label="Site menu"
      >
        <div className="flex items-center justify-between gap-3">
          <Logo variant="dark" size="md" />
          <button type="button" onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-ink transition-colors hover:bg-cream">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-5 flex flex-col gap-0.5" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <motion.div key={link.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
              <Link href={link.href} className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-cream hover:text-forest">
                {link.label}
                <ArrowRight className="h-4 w-4 text-mist" />
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="mt-5 flex flex-col gap-2.5">
          <Button asChild className="bg-forest text-white hover:bg-forest-light" size="lg">
            <Link href="/contact">Book a Lesson</Link>
          </Button>
          <a href={site.phoneHref} className="flex items-center justify-center gap-2 rounded-lg border border-mist px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-cream">
            <Phone className="h-4 w-4 text-forest" /> {site.phone}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]">
            <MessageCircle className="h-4 w-4" /> {site.whatsappLabel}
          </a>
        </div>

        <p className="mt-5 text-xs text-mist">{site.area} · {site.email}</p>
      </motion.aside>
    </motion.div>
  );
}
