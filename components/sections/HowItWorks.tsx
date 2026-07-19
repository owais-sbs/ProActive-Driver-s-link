'use client';

import { motion } from 'framer-motion';
import { Phone, CalendarClock, Car } from 'lucide-react';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

const steps = [
  {
    icon: Phone,
    step: '01',
    title: 'Contact Us',
    description:
      'Call, WhatsApp, or submit the booking form. Tell us your goals, location, and preferred schedule.',
  },
  {
    icon: CalendarClock,
    step: '02',
    title: 'Choose Your Time',
    description:
      'Pick a lesson slot that works for you — evenings, weekends, we’ll make it happen. Confirm with an e-transfer.',
  },
  {
    icon: Car,
    step: '03',
    title: 'Start Driving & Pass',
    description:
      'Your instructor picks you up, you train one-on-one, and you walk into your road test ready to pass.',
  },
];

export function HowItWorks() {
  return (
<<<<<<< HEAD
    <section id="how" className="bg-cream py-16 sm:py-20 lg:py-28">
=======
    <section id="how" className="bg-cream py-10 sm:py-12 lg:py-14">
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <RevealText from="left">
            <span className="section-label">How It Works</span>
          </RevealText>
          <RevealText from="left" delay={0.08}>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Three simple steps to <span className="italic text-forest">your licence</span>
            </h2>
          </RevealText>
          <RevealText from="right" delay={0.14}>
            <p className="mt-3 text-sm text-ink/65 sm:mt-4 sm:text-base">
              Getting started is easy. Here’s the path from first call to first pass.
            </p>
          </RevealText>
        </div>

<<<<<<< HEAD
        <div className="relative mt-12 sm:mt-16">
=======
        <div className="relative mt-8 sm:mt-10">
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
          {/* Desktop horizontal line */}
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-mist lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{ originX: 0 }}
              className="h-full origin-left bg-forest"
            />
          </div>

          {/* Mobile vertical line */}
          <div className="absolute bottom-8 left-10 top-8 w-px bg-mist lg:hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              style={{ originY: 0 }}
              className="h-full w-full origin-top bg-forest"
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.12} y={30}>
                <div className="relative flex gap-5 text-left lg:block lg:text-left">
                  <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-forest shadow-sm ring-1 ring-mist sm:h-20 sm:w-20 lg:mx-0">
                    <s.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div className="min-w-0 flex-1 pt-1 lg:pt-0">
                    <span className="mt-0 inline-block font-display text-xs font-bold uppercase tracking-widest text-mist lg:mt-6">
                      Step {s.step}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-ink sm:text-xl">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink/65">{s.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
