import Link from 'next/link';
import { cn } from '@/lib/utils';

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
    md: 'h-[5.25rem] sm:h-[5rem] lg:h-[5.25rem]',
    lg: 'h-20 sm:h-24',
  };

  const widths = {
    sm: 'max-w-[160px] sm:max-w-[200px]',
    md: 'max-w-[260px] sm:max-w-[280px] md:max-w-[320px]',
    lg: 'max-w-[280px] sm:max-w-[340px]',
  };

  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-turbo2.png"
        alt="Turbo Teach Driving School"
        className={cn(
          'w-auto object-contain object-left',
          heights[size],
          widths[size],
          variant === 'light' && 'brightness-110'
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
