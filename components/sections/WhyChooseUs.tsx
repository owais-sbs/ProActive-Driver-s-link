'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Car,
  UserCog,
  CalendarClock,
  HeartHandshake,
  Languages,
  Trophy,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RevealText, FadeIn } from '@/components/motion/Reveal';
import { useSiteContent } from '@/lib/queries/useContent';

const featureIcons: LucideIcon[] = [Car, UserCog, CalendarClock, HeartHandshake, Languages, Trophy];

type MediaItem =
  | { type: 'video'; src: string; alt: string }
  | { type: 'image'; src: string; alt: string };

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

function MediaCarousel({ mediaItems }: { mediaItems: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % mediaItems.length);
  }, [mediaItems.length]);

  useEffect(() => {
    if (mediaItems[index]?.type === 'video') return;
    const timer = window.setTimeout(goNext, 5000);
    return () => window.clearTimeout(timer);
  }, [index, goNext, mediaItems]);

  if (mediaItems.length === 0) return null;

  const item = mediaItems[index];

  return (
    <div className="relative w-full max-w-[280px]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl ring-1 ring-forest/10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                aria-label={item.alt}
              />
            ) : (
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-forest shadow-md transition hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
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
  const { data: content } = useSiteContent();
  const why = content.why;

  const mediaItems = useMemo<MediaItem[]>(
    () =>
      why.media.map((src, i) => ({
        type: isVideoUrl(src) ? 'video' : 'image',
        src,
        alt: `Why choose ProActive Driver's Link media ${i + 1}`,
      })),
    [why.media]
  );

  const featuresWithIcons = why.features.map((f, i) => ({
    ...f,
    icon: featureIcons[i % featureIcons.length],
  }));

  const split = Math.ceil(featuresWithIcons.length / 2);
  const featuresLeft = featuresWithIcons.slice(0, split);
  const featuresRight = featuresWithIcons.slice(split);

  return (
    <section id="why" className="relative bg-cream py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <RevealText from="left">
            <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
              {why.title}{' '}
              <span className="italic font-extrabold text-forest">{why.titleAccent}</span>
            </h2>
          </RevealText>
          <RevealText from="right" delay={0.1}>
            <p className="mt-3 text-sm text-ink/65 sm:mt-4 sm:text-base">{why.subtitle}</p>
          </RevealText>
        </div>

        <div className="mt-10 flex flex-col items-center gap-10 lg:grid lg:grid-cols-[1fr_280px_1fr] lg:items-center lg:gap-8">
          <div className="order-1 flex w-full justify-center lg:order-2 lg:col-start-2">
            <MediaCarousel mediaItems={mediaItems} />
          </div>

          <div className="order-2 w-full space-y-8 lg:order-1 lg:col-start-1">
            {featuresLeft.map((f, i) => (
              <FadeIn key={`${f.title}-${i}`} delay={i * 0.08} y={20}>
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
              <FadeIn key={`${f.title}-${i}`} delay={i * 0.08} y={20}>
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
