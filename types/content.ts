export type ContentSection = 'hero' | 'why' | 'lessons' | 'testimonials' | 'final_cta';

export type FeatureContent = { title: string; description: string };

export type HeroContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  tagline: string;
  body: string;
  videoUrl: string;
};

export type WhyContent = {
  title: string;
  titleAccent: string;
  subtitle: string;
  features: FeatureContent[];
  media: string[];
};

export type LessonContent = {
  title: string;
  description: string;
  price: string;
  image: string;
};

export type ReviewContent = {
  name: string;
  text: string;
  rating: number;
};

export type FinalCtaContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  body: string;
};

export type SiteContentMap = {
  hero: HeroContent;
  why: WhyContent;
  lessons: { items: LessonContent[] };
  testimonials: { items: ReviewContent[] };
  final_cta: FinalCtaContent;
};
