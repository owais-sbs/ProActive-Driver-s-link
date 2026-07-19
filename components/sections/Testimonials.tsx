'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

const reviews = [
  { name: 'Karen Smith', initials: 'KS', rating: 5, text: 'I was so nervous before my G2, but my instructor was incredibly patient. He explained everything clearly and I passed on my first try. Highly recommend Turbo Teach!' },
  { name: 'Ali Khan', initials: 'AK', rating: 5, text: 'Flexible timing was a game-changer for me. I could book lessons after work and on weekends. The pick-up and drop-off made everything so convenient.' },
  { name: 'Priya Sharma', initials: 'PS', rating: 5, text: 'Lessons in my own language made a huge difference. I finally understood the rules properly and felt confident going into my G test. Passed with flying colours!' },
  { name: 'Marcus Lee', initials: 'ML', rating: 5, text: 'The BDE course was worth every penny. The classroom sessions were engaging and the in-car lessons were thorough. My insurance went down too!' },
  { name: 'Sofia Rodriguez', initials: 'SR', rating: 5, text: 'Refresher lessons got me back behind the wheel after years of not driving. Friendly, professional, and never made me feel embarrassed. Thank you!' },
  { name: 'Daniel Chen', initials: 'DC', rating: 5, text: 'Highway driving used to terrify me. After a few G prep lessons I felt totally in control. Smooth merges, confident lane changes — passed my G easily.' },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-forest text-forest sm:h-4 sm:w-4" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
<<<<<<< HEAD
    <section id="testimonials" className="overflow-x-hidden bg-white py-16 sm:py-20 lg:py-28">
=======
    <section id="testimonials" className="overflow-x-hidden bg-white py-10 sm:py-12 lg:py-14">
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <RevealText from="left">
              <span className="section-label">Testimonials</span>
            </RevealText>
            <RevealText from="left" delay={0.08}>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
                Loved by <span className="italic text-forest">GTA drivers</span>
              </h2>
            </RevealText>
            <RevealText from="right" delay={0.14}>
              <p className="mt-3 max-w-lg text-sm text-ink/65 sm:mt-4 sm:text-base">
                Real reviews from real students who passed their road tests with Turbo Teach.
              </p>
            </RevealText>
          </div>
          <FadeIn delay={0.1} y={20} className="hidden sm:block">
            <div className="relative overflow-hidden rounded-2xl shadow-md">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=80"
                alt="Happy driver celebrating after passing their road test"
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
            </div>
          </FadeIn>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex h-full flex-col rounded-xl border border-mist bg-cream p-5 card-hover sm:p-6"
            >
              <Quote className="absolute right-4 top-4 h-6 w-6 text-mist/40 sm:right-5 sm:top-5 sm:h-8 sm:w-8" />
              <Stars count={r.rating} />
              <blockquote className="mt-3 flex-1 text-xs leading-relaxed text-ink/75 sm:mt-4 sm:text-sm">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-mist pt-3 sm:mt-5 sm:pt-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-forest font-display text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm">
                  {r.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{r.name}</p>
                  <p className="text-[11px] text-mist sm:text-xs">Verified Google Review</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
