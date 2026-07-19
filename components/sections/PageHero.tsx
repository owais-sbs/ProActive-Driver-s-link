'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { RevealText } from '@/components/motion/Reveal';

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  image,
  imageAlt = 'Turbo Teach Driving School',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  titleAccent?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}) {
  if (!image) {
    return (
      <section className={cn('bg-cream pt-32 pb-16 lg:pt-40 lg:pb-20', className)}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {eyebrow && (
            <RevealText from="left">
              <span className="section-label">{eyebrow}</span>
            </RevealText>
          )}
          <RevealText from="left" delay={0.08}>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              {title}
              {titleAccent && (
                <>
                  {' '}
                  <span className="italic text-forest">{titleAccent}</span>
                </>
              )}
            </h1>
          </RevealText>
          {subtitle && (
            <RevealText from="right" delay={0.14}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/65">{subtitle}</p>
            </RevealText>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0B0F0C]', className)}>
      {/* Mobile image backdrop */}
      <div className="absolute inset-0 lg:hidden">
        <img src={image} alt="" className="h-full w-full object-cover opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F0C]/70 via-[#0B0F0C]/85 to-[#0B0F0C]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl lg:min-h-[480px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
          <div className="max-w-xl">
            {eyebrow && (
              <RevealText from="left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
                  {eyebrow}
                </span>
              </RevealText>
            )}
            <RevealText from="left" delay={0.08}>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {title}
                {titleAccent && (
                  <>
                    {' '}
                    <span className="italic text-sage">{titleAccent}</span>
                  </>
                )}
              </h1>
            </RevealText>
            {subtitle && (
              <RevealText from="right" delay={0.14}>
                <p className="mt-5 text-lg text-white/70">{subtitle}</p>
              </RevealText>
            )}
          </div>
        </div>

        <div className="relative hidden min-h-[480px] lg:block">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#0B0F0C] via-[#0B0F0C]/30 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
