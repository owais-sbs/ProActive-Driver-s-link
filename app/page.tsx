import { SiteShell } from '@/components/layout/SiteShell';
import { Hero } from '@/components/sections/Hero';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { LessonTypes } from '@/components/sections/LessonTypes';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { Pricing } from '@/components/sections/Pricing';
import { BookingForm } from '@/components/sections/BookingForm';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <WhyChooseUs />
      <LessonTypes />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <BookingForm />
      <FinalCTA />
    </SiteShell>
  );
}
