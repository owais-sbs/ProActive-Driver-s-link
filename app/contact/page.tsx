import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/sections/PageHero';
import { BookingForm } from '@/components/sections/BookingForm';
import { FadeIn } from '@/components/motion/Reveal';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/data/site';

export const metadata = {
  title: 'Contact Us | Turbo Teach Driving School',
  description: 'Book a driving lesson in Toronto / GTA. Call, WhatsApp, or submit the booking form and we’ll confirm your lesson.',
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact Us"
        title="Let’s get you"
        titleAccent="on the road"
        subtitle="Reach out by phone, WhatsApp, or the booking form below. We’ll confirm your lesson and send payment instructions."
        image="https://images.unsplash.com/photo-1517524008697-84ae7c742bae?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Open road ahead for new drivers"
      />

<<<<<<< HEAD
      <section className="bg-white py-20">
=======
      <section className="bg-white py-10">
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <FadeIn>
              <a href={siteConfig.phoneHref} className="flex h-full flex-col gap-3 rounded-xl border border-mist bg-cream p-6 card-hover">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-forest text-white"><Phone className="h-5 w-5" /></span>
                <h2 className="text-lg font-bold text-ink">Call Us</h2>
                <p className="text-sm text-ink/65">{siteConfig.phone}</p>
                <p className="text-xs text-mist">Tap to call</p>
              </a>
            </FadeIn>
            <FadeIn delay={0.08}>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col gap-3 rounded-xl border border-mist bg-cream p-6 card-hover">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white"><MessageCircle className="h-5 w-5" /></span>
                <h2 className="text-lg font-bold text-ink">WhatsApp</h2>
                <p className="text-sm text-ink/65">Chat with us instantly</p>
                <p className="text-xs text-mist">{siteConfig.whatsappLabel}</p>
              </a>
            </FadeIn>
            <FadeIn delay={0.16}>
              <a href={siteConfig.emailHref} className="flex h-full flex-col gap-3 rounded-xl border border-mist bg-cream p-6 card-hover">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white"><Mail className="h-5 w-5" /></span>
                <h2 className="text-lg font-bold text-ink">Email</h2>
                <p className="text-sm text-ink/65">{siteConfig.email}</p>
                <p className="text-xs text-mist">We reply within 24 hours</p>
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center gap-6 rounded-xl border border-mist bg-cream p-6 text-sm text-ink/65">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-forest" /> {siteConfig.area}</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-forest" /> 7 days a week, evenings &amp; weekends</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <BookingForm />
    </SiteShell>
  );
}
