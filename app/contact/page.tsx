import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/sections/PageHero';
import { BookingForm } from '@/components/sections/BookingForm';
import { ContactInfo } from '@/components/sections/ContactInfo';

export const metadata = {
  title: "Contact Us | ProActive Driver's Link Canada",
  description:
    'Book a driving lesson in Toronto / GTA. Submit the booking form first — we’ll confirm your lesson and send payment instructions.',
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact Us"
        title="Let’s get you"
        titleAccent="on the road"
        subtitle="Fill out the booking form below. We’ll confirm your lesson and send payment instructions."
        image="https://images.unsplash.com/photo-1517524008697-84ae7c742bae?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Open road ahead for new drivers"
      />

      <BookingForm />

      <section className="border-t border-mist/60 bg-cream py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 text-center sm:mb-6">
            <p className="section-label">Prefer to reach out?</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Call, WhatsApp, or email
            </h2>
          </div>
          <ContactInfo />
        </div>
      </section>
    </SiteShell>
  );
}
