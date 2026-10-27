'use client';

import { Loader2, Star, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePricing } from '@/lib/queries/useBookings';
import { defaultPricing } from '@/lib/data/pricing';
import type { PricingPackage } from '@/types/pricing';
import { cn } from '@/lib/utils';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

function packageBadge(pkg: PricingPackage): string | null {
  if (pkg.highlighted) return 'Best Value';
  const label = `${pkg.description ?? ''} ${pkg.period ?? ''}`.toLowerCase();
  if (label.includes('most popular')) return 'Most Popular';
  if (label.includes('recommended')) return 'Recommended';
  if (label.includes('best value')) return 'Best Value';
  return null;
}

function PriceCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
  const badge = packageBadge(pkg);

  return (
    <FadeIn delay={Math.min(index * 0.03, 0.18)} y={18} className="h-full">
      <article
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-mist/80 bg-white p-5 shadow-[0_4px_20px_rgba(17,24,39,0.04)] transition-all duration-300 sm:p-6',
          'hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(17,24,39,0.1)]',
          pkg.highlighted && 'border-forest/40 ring-1 ring-forest/20'
        )}
      >
        {/* Brand accent bar (reference-style top edge) */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-forest"
        />

        {badge && (
          <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            <Star className="h-3 w-3 fill-white" />
            {badge}
          </span>
        )}

        <h3 className="text-sm font-semibold text-ink/85 sm:text-[15px]">{pkg.name}</h3>

        <p className="mt-3 font-display text-[1.75rem] font-extrabold leading-none tracking-tight text-forest sm:text-3xl">
          {pkg.price}
        </p>

        {pkg.description && (
          <p className="mt-2.5 text-xs italic leading-snug text-ink/45 sm:text-[13px]">
            {pkg.description}
          </p>
        )}

        <div className="mt-auto pt-5">
          <Button
            asChild
            className="w-full bg-forest text-white shadow-sm transition group-hover:bg-forest-light hover:bg-forest-light"
          >
            <Link href="/contact">Book Now</Link>
          </Button>
        </div>
      </article>
    </FadeIn>
  );
}

function PackageGrid({ items }: { items: PricingPackage[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {items.map((p, i) => (
        <PriceCard key={p.id ?? `${p.category}-${p.name}-${i}`} pkg={p} index={i} />
      ))}
    </div>
  );
}

function PackageSection({
  title,
  items,
}: {
  title: string;
  items: PricingPackage[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <div className="mb-6 text-center sm:mb-8">
        <h3 className="font-display text-xl font-extrabold text-ink sm:text-2xl">{title}</h3>
        <span
          aria-hidden
          className="mx-auto mt-2.5 block h-0.5 w-12 rounded-full bg-forest/70"
        />
      </div>
      <PackageGrid items={items} />
    </div>
  );
}

function PricingExtras() {
  const included = [
    'Pickup and drop-off included',
    'Training for adverse weather conditions (heavy rain, snow, low visibility)',
    'Essential defensive driving & safety skills',
  ];

  return (
    <div className="mt-12 space-y-5 sm:mt-14">
      <div className="rounded-[20px] border border-mist/80 bg-white p-5 shadow-sm sm:p-8">
        <h3 className="text-center font-display text-xl font-extrabold text-ink sm:text-2xl">
          What&apos;s Included
        </h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {included.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl bg-forest px-4 py-4 text-white sm:px-5 sm:py-5"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15">
                <Check className="h-4 w-4 text-sage" />
              </span>
              <p className="text-sm leading-snug text-white/90">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[20px] bg-forest px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
        <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
          Ready to Book Your Driving Lessons?
        </h3>
        <Button
          asChild
          size="lg"
          className="mt-6 bg-white px-8 text-forest hover:bg-white/90"
        >
          <Link href="/contact">Book Now</Link>
        </Button>
      </div>
    </div>
  );
}

export function Pricing() {
  const { data, isLoading } = usePricing();
  const packages: PricingPackage[] = data && data.length > 0 ? data : defaultPricing;

  const sorted = (category: string) =>
    packages
      .filter((p) => p.category === category)
      .sort((a, b) => a.sort_order - b.sort_order);

  const g2 = sorted('G2');
  const g = sorted('G');
  const bde = sorted('BDE');

  return (
    <section id="pricing" className="bg-cream py-8 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <RevealText from="left">
            <span className="section-label">Packages &amp; Pricing</span>
          </RevealText>
          <RevealText from="left" delay={0.08}>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Transparent packages, <span className="italic text-forest">no surprises</span>
            </h2>
          </RevealText>
          <RevealText from="right" delay={0.14}>
            <p className="mt-3 text-sm text-ink/65 sm:mt-4 sm:text-base">
              Compare lesson packages side by side. Prices include HST where noted.
            </p>
          </RevealText>
        </div>

        {isLoading && (
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-mist">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading packages…
          </div>
        )}

        {!isLoading && (
          <div className="mt-10 space-y-14 sm:mt-12 sm:space-y-16 lg:space-y-20">
            <PackageSection title="G2 Packages" items={g2} />
            <PackageSection title="G Packages" items={g} />
            <PackageSection title="Beginner Driver Education (BDE)" items={bde} />
            <PricingExtras />
          </div>
        )}

        <p className="mt-8 text-center text-xs text-mist sm:mt-10">
          Booking confirmed only after e-transfer payment. See the booking form for details.
        </p>
      </div>
    </section>
  );
}
