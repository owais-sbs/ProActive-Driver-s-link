import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/sections/PageHero';
import { BookingForm } from '@/components/sections/BookingForm';
import { ContactInfo } from '@/components/sections/ContactInfo';

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

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ContactInfo />
        </div>
      </section>

      <BookingForm />
    </SiteShell>
  );
}
