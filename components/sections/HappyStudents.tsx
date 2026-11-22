'use client';

import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';
import { RevealText } from '@/components/motion/Reveal';
import { useSiteContent } from '@/lib/queries/useContent';

export function HappyStudents() {
  const { data: content } = useSiteContent();
  const students = content.happy_students.items.filter((s) => s.image);

  if (students.length === 0) return null;

  return (
    <section id="happy-students" className="overflow-x-hidden bg-cream py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <RevealText from="left">
            <span className="section-label">Happy Students</span>
          </RevealText>
          <RevealText from="right" delay={0.08}>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              They passed. <span className="italic text-forest">You can too.</span>
            </h2>
          </RevealText>
          <RevealText from="left" delay={0.14}>
            <p className="mt-3 text-sm text-ink/65 sm:mt-4 sm:text-base">
              Celebrating our students who passed their road tests with ProActive Driver&apos;s Link.
            </p>
          </RevealText>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-5 sm:mt-12 sm:gap-6">
          {students.map((s, i) => (
            <motion.figure
              key={`${s.image}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-mist bg-white shadow-md card-hover"
            >
              <img
                src={s.image}
                alt={s.name ? `${s.name} after passing the road test` : 'Happy student after passing the road test'}
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-4 pt-12 text-white sm:p-5 sm:pt-14">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-sage">
                  <PartyPopper className="h-3.5 w-3.5" /> Road test passed
                </span>
                {s.name && <p className="mt-1 font-display text-base font-bold sm:text-lg">{s.name}</p>}
                {s.caption && <p className="mt-0.5 text-xs text-white/80 sm:text-sm">{s.caption}</p>}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
