import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/sections/PageHero';
import { FadeIn } from '@/components/motion/Reveal';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Route, RefreshCw, BookOpen, Check, ArrowRight } from 'lucide-react';

export const metadata = {
  title: "Services | ProActive Driver's Link Canada",
  description: 'G2 preparation, G road test preparation, refresher lessons, and the MTO-approved 20-hour BDE course in Toronto / GTA.',
};

const services = [
  {
    icon: GraduationCap, title: 'G2 Preparation',
    description: 'Build the foundational skills to pass your G2 exit test with confidence — city and residential driving, parking, signalling, and a full mock road test.',
    features: ['City & residential driving', 'Parallel & perpendicular parking', 'Three-point turns & manoeuvres', 'Full mock road test'],
  },
  {
    icon: Route, title: 'G Road Test Preparation',
    description: 'Upgrade to your full G licence with highway-focused training — smooth merges, confident lane changes, and safe expressway driving.',
    features: ['Highway driving practice', 'Lane changes & merges', 'Expressway exits & entries', 'Defensive driving on highways'],
  },
  {
    icon: RefreshCw, title: 'Refresher Lessons',
    description: 'Already licensed but out of practice? Targeted refresher sessions to rebuild confidence and get comfortable behind the wheel again.',
    features: ['Brush-up sessions', 'Test-route familiarisation', 'Defensive driving review', 'Flexible single lessons'],
  },
  {
    icon: BookOpen, title: 'BDE Course (MTO-approved 20hr)',
    description: 'The full Beginner Driver Education program — 20-hour classroom course plus in-car instruction, with an MTO certificate on completion.',
    features: ['20-hour classroom course', '10 hours in-car instruction', 'MTO certificate (insurance discount)', 'Shortened G2 → G wait time'],
  },
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title="Lessons for"
        titleAccent="every stage of your journey"
        subtitle="From your very first G2 lesson to your full G upgrade — pick the program that fits where you are right now."
        image="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Hands on the steering wheel during a driving lesson"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-xl border border-mist bg-cream p-7 card-hover">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 text-xl font-bold text-ink">{s.title}</h2>
                  <p className="mt-2 text-sm text-ink/65">{s.description}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink/75">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-forest"><Check className="h-3.5 w-3.5" /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full bg-ink text-white hover:bg-ink-light sm:w-auto">
                    <Link href="/contact">Book Now <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
