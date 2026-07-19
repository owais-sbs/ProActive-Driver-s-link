'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Car,
  UserCog,
  CalendarClock,
  HeartHandshake,
  Languages,
  Trophy,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

const featuresLeft = [
  {
    icon: Car,
    title: 'Road Test Preparation',
    description: 'Expert guidance to help you ace your G2 and G road tests.',
  },
  {
    icon: UserCog,
    title: 'One-on-One Lessons',
    description: 'Personalized instruction tailored to your learning pace.',
  },
  {
    icon: CalendarClock,
    title: 'Flexible Scheduling',
    description: 'Choose times that work best for your busy schedule.',
  },
];

const featuresRight = [
  {
    icon: HeartHandshake,
    title: 'Patient & Friendly Teaching',
    description: 'Build confidence with supportive, encouraging instruction.',
  },
  {
    icon: Languages,
    title: 'Multilingual Instruction',
    description: 'Learn comfortably in English, Urdu, Hindi, and Punjabi.',
  },
  {
    icon: Trophy,
    title: 'High Pass Rate',
    description:
      'Proven methods that help students build confidence and pass their driving test successfully.',
  },
];

type MediaItem =
  | { type: 'video'; src: string; alt: string }
  | { type: 'image'; src: string; alt: string };

const mediaItems: MediaItem[] = [
  { type: 'video', src: '/videos/why-choose-us-3.mp4', alt: 'Driving lesson video' },
  { type: 'image', src: '/images/why-choose-us-1.jpg', alt: 'Student starting the car during a lesson' },
  { type: 'image', src: '/images/why-choose-us-2.jpg', alt: 'Instructor guiding a student driver' },
  { type: 'image', src: '/images/why-choose-us-4.jpg', alt: 'Hands on the steering wheel' },
];

function MediaCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % mediaItems.length);
  }, []);

  useEffect(() => {
    if (mediaItems[index].type === 'video') return;
    const timer = window.setTimeout(goNext, 5000);
    return () => window.clearTimeout(timer);
  }, [index, goNext]);

  const item = mediaItems[index];

  return (
    <div
      className="relative mx-auto shrink-0"
      style={{ width: 280, height: 380 }}
    >
      {/* Accent offset square — same as original */}
      <div
        aria-hidden
        className="absolute -bottom-4 -right-4 rounded-2xl bg-forest/20"
        style={{ width: 280, height: 380 }}
      />

      <div
        className="relative z-10 overflow-hidden rounded-2xl bg-ink/5 shadow-xl ring-1 ring-black/5"
        style={{ width: 280, height: 380 }}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={item.src}
            custom={direction}
            initial={{ opacity: 0, rotateY: direction * 70, scale: 0.94 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: direction * -70, scale: 0.94 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {item.type === 'video' ? (
              <video
                key={item.src}
                src={item.src}
                className="h-full w-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={goNext}
                aria-label={item.alt}
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next arrow */}
        <button
          type="button"
          onClick={goNext}
          aria-label="Next card"
          className="absolute right-2.5 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-forest shadow-lg transition hover:scale-110 hover:bg-cream"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
          {mediaItems.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  return (
<<<<<<< HEAD
    <section id="why" className="relative bg-cream py-20 lg:py-28">
=======
    <section id="why" className="relative bg-cream py-10 lg:py-14">
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <RevealText from="left">
            <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Why Choose <span className="italic font-extrabold text-forest">Turbo Teach?</span>
            </h2>
          </RevealText>
          <RevealText from="right" delay={0.1}>
            <p className="mt-3 text-sm text-ink/65 sm:mt-4 sm:text-base">
              Turbo Teach provides private G2 &amp; G driving lessons across GTA with a focus on
              confidence, safety, and test success.
            </p>
          </RevealText>
        </div>

        {/* Desktop: features | card | features — Mobile: card then features */}
<<<<<<< HEAD
        <div className="mt-14 flex flex-col items-center gap-12 lg:grid lg:grid-cols-[1fr_280px_1fr] lg:items-center lg:gap-10">
=======
        <div className="mt-10 flex flex-col items-center gap-10 lg:grid lg:grid-cols-[1fr_280px_1fr] lg:items-center lg:gap-8">
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
          {/* Middle card — always visible, first on mobile */}
          <div className="order-1 flex w-full justify-center lg:order-2 lg:col-start-2">
            <MediaCarousel />
          </div>

          <div className="order-2 w-full space-y-8 lg:order-1 lg:col-start-1">
            {featuresLeft.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08} y={20}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-white shadow-sm">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{f.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="order-3 w-full space-y-8 lg:order-3 lg:col-start-3">
            {featuresRight.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08} y={20}>
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-white shadow-sm">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">{f.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.15} className="mt-14 flex justify-center">
          <Button asChild size="lg" className="bg-forest px-8 text-white hover:bg-forest-light">
            <Link href="/contact">Book a Free Consultation</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
