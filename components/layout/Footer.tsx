'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig, navLinks } from '@/lib/data/site';

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.89-1.741 2.982-4.305 2.982-7.351z"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.964-.895 6.618-2.422l-3.232-2.51c-.895.6-2.041.955-3.386.955-2.605 0-4.81-1.76-5.596-4.123H3.06v2.59A9.997 9.997 0 0 0 12 22z"
      />
      <path
        fill="currentColor"
        d="M6.404 13.9A6.012 6.012 0 0 1 6.09 12c0-.66.114-1.3.314-1.9V7.51H3.06A9.997 9.997 0 0 0 2 12c0 1.614.386 3.14 1.06 4.49l3.344-2.59z"
      />
      <path
        fill="currentColor"
        d="M12 5.977c1.468 0 2.786.505 3.823 1.495l2.868-2.868C16.96 2.99 14.696 2 12 2A9.997 9.997 0 0 0 3.06 7.51l3.344 2.59C7.19 7.736 9.395 5.977 12 5.977z"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex justify-center sm:justify-start">
              <Logo variant="light" size="sm" />
            </div>
            <p className="mx-auto mt-4 max-w-xs text-sm text-white/60 sm:mx-0">
              {siteConfig.tagline} Private, MTO-approved driving lessons across the Greater Toronto
              Area.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3 sm:justify-start">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-forest"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-forest"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.google}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-forest"
              >
                <GoogleIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 text-white/75 hover:text-white"
                >
                  <Phone className="h-4 w-4 text-sage" /> {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="inline-flex items-center gap-2 text-white/75 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-sage" /> {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/75">
                <MapPin className="h-4 w-4 shrink-0 text-sage" /> {siteConfig.area}
              </li>
            </ul>
          </div>

          {/* Quick Links — desktop/tablet only */}
          <div className="hidden sm:block">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service areas + WhatsApp */}
          <div className="text-center sm:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
              Service Areas
            </h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {siteConfig.serviceAreas.slice(0, 6).map((area) => (
                <li
                  key={area}
                  className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 sm:inline"
                >
                  {area}
                </li>
              ))}
              <li className="hidden rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 sm:inline">
                + more
              </li>
            </ul>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" /> {siteConfig.whatsappLabel}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:mt-12 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} Driving School. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-2">
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
            <span aria-hidden="true">·</span>
            <span>MTO-approved Beginner Driver Education</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
