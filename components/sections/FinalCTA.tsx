'use client';

import Link from 'next/link';
import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/data/site';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

export function FinalCTA() {
  return (
<<<<<<< HEAD
    <section className="relative overflow-hidden bg-dark py-20 text-white lg:py-28">
=======
    <section className="relative overflow-hidden bg-dark py-12 text-white lg:py-16">
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-forest-light/30 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-sage/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <RevealText from="left">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
            Get Started Today
          </span>
        </RevealText>
        <RevealText from="left" delay={0.08}>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            Ready to Pass Your <span className="italic text-sage">Driving Test?</span>
          </h2>
        </RevealText>
          <RevealText from="right" delay={0.14}>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 sm:mt-5 sm:text-lg">
              Join hundreds of GTA drivers who passed with confidence. Book your first lesson today
              and let’s get you on the road.
            </p>
          </RevealText>
        <FadeIn delay={0.2} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-white text-ink hover:bg-white/90">
            <a href={siteConfig.phoneHref}>
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/25 text-white hover:bg-white/10 hover:text-white"
          >
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp Now
            </a>
          </Button>
          <Button asChild size="lg" className="bg-forest text-white hover:bg-forest-light">
            <Link href="/contact">
              <CalendarCheck className="h-4 w-4" /> Book a Lesson
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
