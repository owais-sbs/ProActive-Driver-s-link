'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const view = { once: false, amount: 0.15, margin: '0px 0px -20px 0px' as const };

/** Text-only reveal from left/right — replays on scroll up or down */
export function RevealText({
  children,
  from = 'left',
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  from?: 'left' | 'right';
  delay?: number;
  className?: string;
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'p';
}) {
  const x = from === 'left' ? -48 : 48;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={view}
      transition={{ duration: 0.65, delay, ease }}
      className={className}
    >
      {Tag === 'div' ? children : <Tag className="contents">{children}</Tag>}
    </motion.div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** @deprecated use RevealText for intros */
export function SectionIntro({
  children,
  from = 'left',
  className,
  delay = 0,
}: {
  children: ReactNode;
  from?: 'left' | 'right';
  className?: string;
  delay?: number;
}) {
  return (
    <RevealText from={from} delay={delay} className={className}>
      {children}
    </RevealText>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={view}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
