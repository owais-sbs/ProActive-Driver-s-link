import Link from 'next/link';
import { cn } from '@/lib/utils';

/** dark = navy logo on white/light backgrounds · light = white logo on dark/navy backgrounds */
const LOGO_SRC = {
  dark: '/images/logo-blue.png',
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
  const heights = {
    sm: 'h-12 sm:h-14',
    md: 'h-[5.75rem] sm:h-[5.5rem] lg:h-[6rem]',
    lg: 'h-20 sm:h-24',
  };

  const widths = {
    sm: 'max-w-[160px] sm:max-w-[200px]',
    md: 'max-w-[290px] sm:max-w-[310px] md:max-w-[360px]',
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
  size?: 'sm' | 'md';
}) {
  return (
    <Link href="/" aria-label="Turbo Teach home" className={cn('shrink-0', className)}>
      <Logo variant={variant} size={size} />
    </Link>
  );
}
