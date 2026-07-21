'use client';

import { FadeIn } from '@/components/motion/Reveal';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useSiteConfig } from '@/lib/queries/useSiteSettings';
import { useWhatsAppLink } from '@/lib/hooks/useWhatsAppLink';

export function ContactInfo() {
  const site = useSiteConfig();
  const whatsappHref = useWhatsAppLink();

  return (
    <>
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        <FadeIn>
          <a
            href={site.phoneHref}
            className="flex h-full flex-col gap-2 rounded-xl border border-mist bg-white p-4 card-hover sm:gap-3 sm:p-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-forest text-white sm:h-12 sm:w-12">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <h2 className="text-base font-bold text-ink sm:text-lg">Call Us</h2>
            <p className="text-sm text-ink/65">{site.phone}</p>
            <p className="text-xs text-mist">Tap to call</p>
          </a>
        </FadeIn>
        <FadeIn delay={0.08}>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full flex-col gap-2 rounded-xl border border-mist bg-white p-4 card-hover sm:gap-3 sm:p-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white sm:h-12 sm:w-12">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <h2 className="text-base font-bold text-ink sm:text-lg">WhatsApp</h2>
            <p className="text-sm text-ink/65">Chat with us instantly</p>
            <p className="text-xs text-mist">{site.whatsappLabel}</p>
          </a>
        </FadeIn>
        <FadeIn delay={0.16}>
          <a
            href={site.emailHref}
            className="flex h-full flex-col gap-2 rounded-xl border border-mist bg-white p-4 card-hover sm:gap-3 sm:p-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white sm:h-12 sm:w-12">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <h2 className="text-base font-bold text-ink sm:text-lg">Email</h2>
            <p className="text-sm text-ink/65">{site.email}</p>
            <p className="text-xs text-mist">We reply within 24 hours</p>
          </a>
        </FadeIn>
      </div>

      <FadeIn delay={0.1}>
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-mist bg-white p-4 text-sm text-ink/65 sm:mt-5 sm:gap-6 sm:p-5">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-forest" /> {site.area}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-forest" /> {site.hours}
          </span>
        </div>
      </FadeIn>
    </>
  );
}
