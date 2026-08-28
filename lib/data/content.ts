import type { SiteContentMap } from '@/types/content';

export const defaultSiteContent: SiteContentMap = {
  hero: {
    eyebrow: 'MTO-Approved · Toronto / GTA',
    title: 'Pass Your G2 & G Driving Test With Confidence!',
    titleAccent: 'G2 & G',
    tagline: 'Where great drivers are made, not born.',
    body: 'Private, one-on-one driving lessons across the Greater Toronto Area with flexible scheduling and complimentary pick-up & drop-off.',
    videoUrl: '/videos/hero-screen.mp4',
  },
  why: {
    title: 'Why Choose',
    titleAccent: "ProActive Driver's Link?",
    subtitle:
      "ProActive Driver's Link Canada provides private G2 & G driving lessons across GTA with a focus on confidence, safety, and test success.",
    features: [
      { title: 'Road Test Preparation', description: 'Expert guidance to help you ace your G2 and G road tests.' },
      { title: 'One-on-One Lessons', description: 'Personalized instruction tailored to your learning pace.' },
      { title: 'Flexible Scheduling', description: 'Choose times that work best for your busy schedule.' },
      { title: 'Patient & Friendly Teaching', description: 'Build confidence with supportive, encouraging instruction.' },
      { title: 'Multilingual Instruction', description: 'Learn comfortably in English, Urdu, Hindi, and Punjabi.' },
      { title: 'High Pass Rate', description: 'Proven methods that help students build confidence and pass.' },
    ],
    media: [
      '/videos/why-choose-us-3.mp4',
      '/images/why-choose-us-1.jpg',
      '/images/why-choose-us-2.jpg',
      '/images/why-choose-us-4.jpg',
    ],
  },
  lessons: {
    items: [
      {
        title: 'G2 Preparation',
        description: 'Master the basics and build confidence for your G2 exit test.',
        price: 'From $50 / hr',
        image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'G Road Test Prep',
        description: 'Highway-focused training to help you upgrade to a full G licence.',
        price: 'From $55 / hr',
        image: 'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'Refresher Lessons',
        description: 'Targeted refresher sessions to rebuild confidence behind the wheel.',
        price: 'From $50 / hr',
        image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      {
        title: 'BDE Course (MTO-approved)',
        description: 'Full 20-hour Beginner Driver Education program with MTO certification.',
        price: 'From $399',
        image: 'https://images.pexels.com/photos/2076622/pexels-photo-2076622.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
    ],
  },
  testimonials: {
    items: [
      { name: 'Karen Smith', rating: 5, text: 'I was so nervous before my G2, but my instructor was incredibly patient.' },
      { name: 'Ali Khan', rating: 5, text: 'Flexible timing was a game-changer for me.' },
      { name: 'Priya Sharma', rating: 5, text: 'Lessons in my own language made a huge difference.' },
    ],
  },
  final_cta: {
    eyebrow: 'Get Started Today',
    title: 'Ready to Pass Your',
    titleAccent: 'Driving Test?',
    body: 'Join hundreds of GTA drivers who passed with confidence. Book your first lesson today.',
  },
};
