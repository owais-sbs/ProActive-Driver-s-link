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
<<<<<<< HEAD
    sm: 'h-11 sm:h-12',
    md: 'h-12 sm:h-[3.25rem]',
    lg: 'h-14 sm:h-16',
=======
    sm: 'h-14 sm:h-16',
    md: 'h-16 sm:h-[4.5rem]',
    lg: 'h-18 sm:h-20',
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
  };

  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
<<<<<<< HEAD
        src="/images/logo-turbo.png"
        alt="Turbo Teach Driving School"
        className={cn(
          'w-auto max-w-[140px] object-contain object-left sm:max-w-[200px] md:max-w-[240px]',
=======
        src="/images/logo-turbo2.png"
        alt="Turbo Teach Driving School"
        className={cn(
          'w-auto max-w-[180px] object-contain object-left sm:max-w-[260px] md:max-w-[300px]',
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
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
