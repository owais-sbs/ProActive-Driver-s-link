'use client';

import Link from 'next/link';
import { GraduationCap, Route, RefreshCw, BookOpen, ArrowRight, type LucideIcon } from 'lucide-react';
import { RevealText, FadeIn } from '@/components/motion/Reveal';
import { useSiteContent } from '@/lib/queries/useContent';

const lessonIcons: LucideIcon[] = [GraduationCap, Route, RefreshCw, BookOpen];

export function LessonTypes() {
  const { data: content } = useSiteContent();
  const lessons = content.lessons.items.map((l, i) => ({
    ...l,
    icon: lessonIcons[i % lessonIcons.length],
  }));

  return (
    <section id="services" className="bg-white py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <RevealText from="left">
              <span className="section-label">Lesson Types</span>
            </RevealText>
            <RevealText from="left" delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
                Lessons for <span className="italic text-forest">Every Stage</span>
              </h2>
            </RevealText>
            <RevealText from="right" delay={0.14}>
              <p className="mt-2 max-w-xl text-sm text-ink/65 sm:mt-3 sm:text-base">
                From your very first G2 lesson to your full G upgrade — pick the program that fits
                where you are right now.
              </p>
            </RevealText>
          </div>
          <RevealText from="right" delay={0.1} className="hidden sm:block">
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/20 px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-cream"
            >
              Explore More
            </Link>
          </RevealText>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {lessons.map((l, i) => (
            <FadeIn key={l.title} delay={i * 0.07} y={28}>
              <article className="group flex flex-col lg:origin-center lg:transition-transform lg:duration-500 lg:hover:scale-[1.06] lg:hover:z-10">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={l.image}
                    alt={l.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-ink/55" />
                  <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-forest shadow-sm">
                    <l.icon className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-4 flex flex-1 flex-col">
                  <h3 className="text-base font-bold text-ink">{l.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink/60">{l.description}</p>
                  <p className="mt-3 text-sm font-semibold text-forest">{l.price}</p>
                  <Link
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink/70 transition-colors hover:text-forest"
                  >
                    Book now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
