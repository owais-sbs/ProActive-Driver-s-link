import Link from 'next/link';
import { cn } from '@/lib/utils';

/** dark = teal logo on white/light backgrounds · light = white logo on dark/teal backgrounds */
const LOGO_SRC = {
  dark: '/images/logo-blue.png?v=2',
  light: '/images/logo-white.png',
} as const;

export function Logo({
  className,
  variant = 'dark',
  size = 'md',
}: {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}) {
  /** Hero (light) = larger like before · White header (dark) = balanced mid size */
  const heights = {
    sm: 'h-11 sm:h-12',
    md:
      variant === 'light'
        ? 'h-[5.75rem] sm:h-[6.25rem] lg:h-[6.75rem]'
        : 'h-[4.5rem] sm:h-[4.75rem] lg:h-[5rem]',
    lg: 'h-20 sm:h-24',
  };

  const widths = {
    sm: 'max-w-[160px] sm:max-w-[190px]',
    md:
      variant === 'light'
        ? 'max-w-[320px] sm:max-w-[360px] md:max-w-[420px]'
        : 'max-w-[240px] sm:max-w-[270px] md:max-w-[300px]',
    lg: 'max-w-[280px] sm:max-w-[340px]',
  };

  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC[variant]}
        alt="Turbo Teach Driving School"
        className={cn(
          'w-auto object-contain object-left',
          heights[size],
          widths[size]
        )}
        draggable={false}
      />
    </span>
  );
}

export function LogoLink({
  className,
  variant = 'dark',
  size = 'md',
}: {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <Link href="/" aria-label="Turbo Teach home" className={cn('shrink-0', className)}>
      <Logo variant={variant} size={size} />
    </Link>
  );
}
