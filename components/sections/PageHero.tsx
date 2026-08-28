'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { RevealText } from '@/components/motion/Reveal';
import { siteConfig } from '@/lib/data/site';

export function PageHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  image,
  imageAlt = siteConfig.fullName,
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
      <section className={cn('bg-cream pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pt-36 lg:pb-20', className)}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {eyebrow && (
            <RevealText from="left">
              <span className="section-label">{eyebrow}</span>
            </RevealText>
          )}
          <RevealText from="left" delay={0.08}>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:mt-3 sm:text-5xl">
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
              <p className="mx-auto mt-3 max-w-2xl text-base text-ink/65 sm:mt-5 sm:text-lg">{subtitle}</p>
            </RevealText>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={cn('relative overflow-hidden bg-forest', className)}>
      <div className="absolute inset-0 lg:hidden">
        <img src={image} alt="" className="h-full w-full object-cover opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-forest/90" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-y-0 right-0 h-full w-1/2 object-cover object-center"
          loading="eager"
        />
      </div>

      <div className="relative mx-auto max-w-7xl lg:min-h-[440px]">
        <div className="flex flex-col justify-center px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32 lg:max-w-[50%] lg:px-8 lg:pb-16 lg:pt-36">
          <div className="max-w-xl">
            {eyebrow && (
              <RevealText from="left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sage">
                  {eyebrow}
                </span>
              </RevealText>
            )}
            <RevealText from="left" delay={0.08}>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:mt-3 sm:text-5xl">
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
                <p className="mt-3 text-base text-white/70 sm:mt-5 sm:text-lg">{subtitle}</p>
              </RevealText>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
