import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/sections/PageHero';
import { FadeIn } from '@/components/motion/Reveal';
import { ShieldCheck, HeartHandshake, Trophy, Users, Car, Clock } from 'lucide-react';

export const metadata = {
  title: 'About Us | Turbo Teach Driving School',
  description: 'Turbo Teach is a Toronto/GTA driving school built on patience, flexibility, and a high first-try pass rate.',
};

const stats = [
  { icon: Trophy, value: '95%', label: 'First-try pass rate' },
  { icon: Users, value: '500+', label: 'Students taught' },
  { icon: Clock, value: '7 days', label: 'Lessons per week' },
  { icon: Car, value: '4', label: 'Languages offered' },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About Us"
        title="Where great drivers are made,"
        titleAccent="not born"
        subtitle="Turbo Teach is a Toronto/GTA driving school dedicated to patient, flexible, and multilingual instruction that helps every student pass with confidence."
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Student learning to drive with instructor"
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <h2 className="font-display text-3xl font-extrabold text-ink">Our story</h2>
              <div className="mt-5 space-y-4 text-ink/65">
                <p>Turbo Teach was founded with one goal: to make every new driver in the Greater Toronto Area a safe, confident, and responsible driver for life — not just for test day.</p>
                <p>We believe great drivers are made, not born. That’s why our lessons are always one-on-one, our instructors are patient and friendly, and our scheduling is built around your life — evenings, weekends, and complimentary pick-up &amp; drop-off across the GTA.</p>
                <p>As an MTO-approved Beginner Driver Education provider, our graduates earn a certificate that can lower insurance premiums and shorten the wait between G2 and G tests.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img src="https://images.pexels.com/photos/7437487/pexels-photo-7437487.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Driving instructor with student" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </FadeIn>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.08}>
                <div className="rounded-xl border border-mist bg-cream p-6 text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-forest text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-display text-3xl font-extrabold text-ink">{s.value}</p>
                  <p className="mt-1 text-sm text-mist">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-16 rounded-2xl border border-forest/20 bg-cream p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest text-white">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">MTO-Approved Beginner Driver Education</h3>
                  <p className="mt-2 text-sm text-ink/65">
                    Our 20-hour BDE course is approved by the Ministry of Transportation of Ontario. Graduates receive an MTO certificate that may reduce insurance premiums and shorten the G2 → G wait time.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </SiteShell>
  );
}
