'use client';

import { FadeIn } from '@/components/motion/Reveal';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useSiteConfig } from '@/lib/queries/useSiteSettings';

export function ContactInfo() {
  const site = useSiteConfig();

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        <FadeIn>
          <a href={site.phoneHref} className="flex h-full flex-col gap-3 rounded-xl border border-mist bg-cream p-6 card-hover">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-white">
              <Phone className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-bold text-ink">Call Us</h2>
            <p className="text-sm text-ink/65">{site.phone}</p>
            <p className="text-xs text-mist">Tap to call</p>
          </a>
        </FadeIn>
        <FadeIn delay={0.08}>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full flex-col gap-3 rounded-xl border border-mist bg-cream p-6 card-hover"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white">
              <MessageCircle className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-bold text-ink">WhatsApp</h2>
            <p className="text-sm text-ink/65">Chat with us instantly</p>
            <p className="text-xs text-mist">{site.whatsappLabel}</p>
          </a>
        </FadeIn>
        <FadeIn delay={0.16}>
          <a href={site.emailHref} className="flex h-full flex-col gap-3 rounded-xl border border-mist bg-cream p-6 card-hover">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
              <Mail className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-bold text-ink">Email</h2>
            <p className="text-sm text-ink/65">{site.email}</p>
            <p className="text-xs text-mist">We reply within 24 hours</p>
          </a>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-6 rounded-xl border border-mist bg-cream p-6 text-sm text-ink/65">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-forest" /> {site.area}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-forest" /> {site.hours}
          </span>
        </div>
      </FadeIn>
    </>
  );
}
