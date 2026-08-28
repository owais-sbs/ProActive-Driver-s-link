import { SiteShell } from '@/components/layout/SiteShell';
import { PageHero } from '@/components/sections/PageHero';
import { Pricing } from '@/components/sections/Pricing';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata = {
  title: "Packages | ProActive Driver's Link Canada",
  description:
    'Transparent G2 and G driving lesson packages with pick-up & drop-off, all-weather training, and defensive driving skills.',
};

export default function PackagesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Packages"
        title="Transparent packages,"
        titleAccent="no surprises"
        subtitle="Choose the package that fits your goal. Every package includes pick-up & drop-off, all-weather training, and defensive driving skills."
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Modern car ready for driving lessons"
      />
      <Pricing />
      <FinalCTA />
    </SiteShell>
  );
}
