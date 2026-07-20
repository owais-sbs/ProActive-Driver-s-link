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
    sm: 'h-14 sm:h-16',
    md: 'h-16 sm:h-[4.5rem]',
    lg: 'h-18 sm:h-20',
  };

  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-turbo2.png"
        alt="Turbo Teach Driving School"
        className={cn(
          'w-auto max-w-[180px] object-contain object-left sm:max-w-[260px] md:max-w-[300px]',
          heights[size],
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
