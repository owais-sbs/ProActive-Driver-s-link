'use client';

import Link from 'next/link';
import { GraduationCap, Route, RefreshCw, BookOpen, ArrowRight } from 'lucide-react';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

const lessons = [
  {
    icon: GraduationCap,
    title: 'G2 Preparation',
    description:
      'Master the basics and build confidence for your G2 exit test — steering, parking, signalling, and city driving.',
    price: 'From $50 / hr',
    image:
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Route,
    title: 'G Road Test Prep',
    description:
      'Highway-focused training to help you upgrade to a full G licence with smooth merges and safe lane changes.',
    price: 'From $55 / hr',
    image:
      'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: RefreshCw,
    title: 'Refresher Lessons',
    description:
      'Already licensed but out of practice? Targeted refresher sessions to rebuild confidence behind the wheel.',
    price: 'From $50 / hr',
    image:
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: BookOpen,
    title: 'BDE Course (MTO-approved)',
    description:
      'Full 20-hour Beginner Driver Education program with in-car instruction and MTO certification.',
    price: 'From $399',
    image:
      'https://images.pexels.com/photos/2076622/pexels-photo-2076622.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export function LessonTypes() {
  return (
<<<<<<< HEAD
    <section id="services" className="bg-white py-20 lg:py-28">
=======
    <section id="services" className="bg-white py-10 lg:py-14">
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lessons.map((l, i) => (
            <FadeIn key={l.title} delay={i * 0.07} y={28}>
              <article className="group flex flex-col">
                <div className="relative overflow-hidden rounded-2xl" style={{ height: 180 }}>
                  <img
                    src={l.image}
                    alt={l.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex flex-1 flex-col px-0.5">
                  <h3 className="text-[15px] font-bold leading-snug text-ink">{l.title}</h3>
                  <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-ink/55">
                    {l.description}
                  </p>
                  <p className="mt-2 text-sm text-mist">{l.price}</p>
                  <div className="mt-4">
                    <Link
                      href="/contact"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 text-ink transition-all duration-200 hover:border-forest hover:bg-forest hover:text-white"
                      aria-label={`Book ${l.title}`}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-5 py-2 text-sm font-medium text-ink hover:bg-cream"
          >
            Explore More <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
