'use client';

import { Check, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { usePricing } from '@/lib/queries/useBookings';
import { defaultPricing } from '@/lib/data/pricing';
import type { PricingPackage } from '@/types/pricing';
import { cn } from '@/lib/utils';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

function PriceCard({
  pkg,
  index,
  className,
}: {
  pkg: PricingPackage;
  index: number;
  className?: string;
}) {
  return (
    <FadeIn delay={Math.min(index * 0.06, 0.18)} y={20} className={className}>
      <div
        className={cn(
          'relative flex h-full flex-col rounded-xl border bg-white p-6 sm:p-7 card-hover',
          pkg.highlighted ? 'border-forest ring-1 ring-forest' : 'border-mist'
        )}
      >
        {pkg.highlighted && (
          <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-forest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            <Star className="h-3 w-3 fill-white" /> Best Value
          </span>
        )}
        <h3 className="text-lg font-bold text-ink">{pkg.name}</h3>
        {pkg.description && <p className="mt-1 text-sm text-ink/60">{pkg.description}</p>}
        <div className="mt-5 flex items-end gap-1">
          <span className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {pkg.price}
          </span>
          {pkg.period && <span className="mb-1 text-sm text-mist">/{pkg.period}</span>}
        </div>
        <ul className="mt-5 flex-1 space-y-2.5 sm:mt-6 sm:space-y-3">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-ink/75">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cream text-forest">
                <Check className="h-3.5 w-3.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>
        <Button
          asChild
          className={cn(
            'mt-6 w-full sm:mt-7',
            pkg.highlighted
              ? 'bg-forest text-white hover:bg-forest-light'
              : 'bg-ink text-white hover:bg-ink-light'
          )}
        >
          <Link href="/contact">Book This Package</Link>
        </Button>
      </div>
    </FadeIn>
  );
}

function PackageScroller({ items }: { items: PricingPackage[] }) {
  return (
    <>
      {/* Mobile: horizontal snap scroll */}
      <div className="-mx-4 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 scrollbar-none">
          {items.map((p, i) => (
            <PriceCard
              key={p.name}
              pkg={p}
              index={i}
              className="w-[85vw] max-w-[320px] shrink-0 snap-center"
            />
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-mist">Swipe for more packages →</p>
      </div>

      {/* Tablet/Desktop: grid */}
      <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <PriceCard key={p.name} pkg={p} index={i} />
        ))}
      </div>
    </>
  );
}

export function Pricing() {
  const { data, isLoading } = usePricing();
  const packages: PricingPackage[] = data && data.length > 0 ? data : defaultPricing;
  const g2 = packages.filter((p) => p.category === 'G2').sort((a, b) => a.sort_order - b.sort_order);
  const g = packages.filter((p) => p.category === 'G').sort((a, b) => a.sort_order - b.sort_order);

  return (
<<<<<<< HEAD
    <section id="pricing" className="bg-cream py-16 sm:py-20 lg:py-28">
=======
    <section id="pricing" className="bg-cream py-10 sm:py-12 lg:py-14">
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
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
              Choose the package that fits your goal. Every package includes pick-up &amp;
              drop-off, all-weather training, and defensive driving skills.
            </p>
          </RevealText>
        </div>

        {isLoading && (
          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-mist">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading packages…
          </div>
        )}

        {!isLoading && (
          <Tabs defaultValue="g2" className="mt-10 sm:mt-12">
            <div className="flex justify-center">
              <TabsList className="border border-mist bg-white">
                <TabsTrigger
                  value="g2"
                  className="data-[state=active]:bg-forest data-[state=active]:text-white"
                >
                  G2 Packages
                </TabsTrigger>
                <TabsTrigger
                  value="g"
                  className="data-[state=active]:bg-forest data-[state=active]:text-white"
                >
                  G Packages
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="g2" className="mt-8 sm:mt-10">
              <PackageScroller items={g2} />
            </TabsContent>
            <TabsContent value="g" className="mt-8 sm:mt-10">
              <PackageScroller items={g} />
            </TabsContent>
          </Tabs>
        )}

        <p className="mt-8 text-center text-xs text-mist">
          Booking confirmed only after e-transfer payment. See the booking form for details.
        </p>
      </div>
    </section>
  );
}
