'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, CalendarCheck, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteContent } from '@/lib/queries/useContent';
import { useSiteConfig } from '@/lib/queries/useSiteSettings';
import { useWhatsAppLink } from '@/lib/hooks/useWhatsAppLink';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

const trustBadges = [
  { icon: ShieldCheck, label: 'Friendly Certified Instructor' },
  { icon: Clock, label: 'Flexible Timing' },
  { icon: MapPin, label: 'Pick-Up & Drop-Off Available' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { data: content } = useSiteContent();
  const site = useSiteConfig();
  const whatsappHref = useWhatsAppLink();
  const hero = content.hero;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const carY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={ref} className="relative overflow-x-hidden bg-forest">
      {/* Car — desktop */}
      <motion.div
        style={{ y: carY }}
        aria-hidden
        className="pointer-events-none absolute -right-8 bottom-0 top-16 hidden w-[55%] max-w-3xl overflow-hidden lg:block"
      >
        <motion.img
          src="/images/car-hero-blue.png"
          alt=""
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="h-full w-full object-contain object-right opacity-90 drop-shadow-[0_0_40px_rgba(0,96,120,0.4)]"
        />
      </motion.div>

      {/* Car — mobile (contained, no overflow) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 h-48 overflow-hidden opacity-35 lg:hidden"
      >
        <img
          src="/images/car-hero-blue.png"
          alt=""
          className="mx-auto h-full w-full max-w-sm object-contain object-center"
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ——— Mobile first screen: text + small btns only ——— */}
        <div className="flex min-h-[100svh] flex-col justify-center pb-10 pt-[4.5rem] lg:hidden">
          <RevealText from="right">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-sage">
              {hero.eyebrow}
            </span>
          </RevealText>

          <RevealText from="right" delay={0.06}>
            <h1 className="mt-3 font-display text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-white">
              {hero.title.replace(hero.titleAccent, '')}
              <span className="italic text-sage">{hero.titleAccent}</span>
            </h1>
          </RevealText>

          <RevealText from="left" delay={0.1}>
            <p className="mt-3 text-sm font-medium text-sage/90">{hero.tagline}</p>
          </RevealText>

          <RevealText from="right" delay={0.14}>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-white/65">{hero.body}</p>
          </RevealText>

          <FadeIn delay={0.2} className="mt-6 flex flex-wrap items-center gap-2">
            <Button
              asChild
              className="h-8 rounded-lg bg-white px-3 text-xs font-semibold text-forest hover:bg-white/90"
            >
              <a href={site.phoneHref}>
                <Phone className="h-3 w-3" /> Call
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-8 rounded-lg border-white/25 bg-white/5 px-3 text-xs font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-3 w-3 text-emerald-400" /> WhatsApp
              </a>
            </Button>
            <Button
              asChild
              className="h-8 rounded-lg bg-white px-3 text-xs font-semibold text-ink hover:bg-white/90"
            >
              <Link href="/contact">
                <CalendarCheck className="h-3 w-3" /> Book
              </Link>
            </Button>
          </FadeIn>

          <FadeIn delay={0.26} className="mt-6">
            <ul className="flex flex-col gap-2">
              {trustBadges.map((b) => (
                <li
                  key={b.label}
                  className="flex items-center gap-2 text-[11px] font-medium text-white/70"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-sage">
                    <b.icon className="h-3 w-3" />
                  </span>
                  {b.label}
                </li>
              ))}
            </ul>
          </FadeIn>

          <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-white/35">
            Scroll for video ↓
          </p>
        </div>

        {/* ——— Mobile video (after scroll) ——— */}
        <div className="relative pb-14 pt-2 lg:hidden">
          <FadeIn y={32}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <video
                src={hero.videoUrl}
                className="aspect-[4/3] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Driving lesson in progress"
              />
              <div className="pointer-events-none absolute inset-0 bg-forest/20" />
            </div>
            <div className="absolute -bottom-3 right-3 rounded-xl border border-white/10 bg-white/95 p-2.5 shadow-lg backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-forest font-display text-xs font-extrabold text-white">
                  95%
                </span>
                <div>
                  <p className="text-xs font-bold text-ink">Pass Rate</p>
                  <p className="text-[10px] text-mist">First-try success</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ——— Desktop layout ——— */}
        <div className="hidden items-center gap-16 py-28 lg:grid lg:grid-cols-2 lg:pb-16 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease }}
            className="relative"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
            >
              <video
                src={hero.videoUrl}
                className="aspect-[4/3] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Driving lesson in progress"
              />
              <div className="pointer-events-none absolute inset-0 bg-forest/20" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-5 -right-3 rounded-xl border border-white/10 bg-white/95 p-4 shadow-lg backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-forest font-display text-sm font-extrabold text-white">
                  95%
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Pass Rate</p>
                  <p className="text-xs text-mist">First-try success</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="pb-8">
            <RevealText from="right">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
                {hero.eyebrow}
              </span>
            </RevealText>
            <RevealText from="right" delay={0.08}>
              <h1 className="mt-4 font-display text-[3.4rem] font-extrabold leading-[1.08] tracking-tight text-white">
                {hero.title.replace(hero.titleAccent, '')}
                <span className="italic text-sage">{hero.titleAccent}</span>
              </h1>
            </RevealText>
            <RevealText from="left" delay={0.14}>
              <p className="mt-4 text-lg font-medium text-sage/90">{hero.tagline}</p>
            </RevealText>
            <RevealText from="right" delay={0.2}>
              <p className="mt-4 max-w-xl text-base text-white/70">{hero.body}</p>
            </RevealText>
            <FadeIn delay={0.28} className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-white text-forest hover:bg-white/90">
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
              <Button asChild size="lg" className="bg-white text-ink hover:bg-white/90">
                <Link href="/contact">
                  <CalendarCheck className="h-4 w-4" /> Book a Lesson
                </Link>
              </Button>
            </FadeIn>
            <FadeIn delay={0.36} className="mt-10">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {trustBadges.map((b) => (
                  <li
                    key={b.label}
                    className="flex items-center gap-2 text-sm font-medium text-white/75"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-sage">
                      <b.icon className="h-4 w-4" />
                    </span>
                    {b.label}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
