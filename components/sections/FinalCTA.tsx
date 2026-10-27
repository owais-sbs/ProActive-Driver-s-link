'use client';

import Link from 'next/link';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/lib/queries/useContent';
import { useSiteConfig } from '@/lib/queries/useSiteSettings';
import { useWhatsAppLink } from '@/lib/hooks/useWhatsAppLink';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

export function FinalCTA() {
  const { data: content } = useSiteContent();
  const site = useSiteConfig();
  const whatsappHref = useWhatsAppLink();
  const cta = content.final_cta;

  return (
    <section className="relative overflow-hidden bg-forest py-12 text-white lg:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-maple" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <RevealText from="left">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
            {cta.eyebrow}
          </span>
        </RevealText>
        <RevealText from="left" delay={0.08}>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            {cta.title} <span className="italic text-sage">{cta.titleAccent}</span>
          </h2>
        </RevealText>
        <RevealText from="right" delay={0.14}>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:mt-5 sm:text-lg">{cta.body}</p>
        </RevealText>
        <FadeIn delay={0.2} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-white text-ink hover:bg-white/90">
            <a href={site.phoneHref}>
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp Now
            </a>
          </Button>
          <Button asChild size="lg" className="bg-teal-dark text-white hover:bg-teal-deep">
            <Link href="/contact">
              <CalendarCheck className="h-4 w-4" /> Book a Lesson
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
