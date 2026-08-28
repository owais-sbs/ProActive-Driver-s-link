import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/data/site';

/** dark = teal on light backgrounds · light = white on dark/teal backgrounds */
const LOGO_SRC = {
  dark: {
    full: '/images/logo-blue.png?v=pdlc-20260827',
    mark: '/images/logo-mark-blue.png?v=pdlc-20260827',
  },
  light: {
    full: '/images/logo-white.png?v=pdlc-20260827',
    mark: '/images/logo-mark-white.png?v=pdlc-20260827',
  },
} as const;

/** Same height for mark + wordmark; mobile uses the compact P, sm+ uses the full lockup. */
const SIZE = {
  sm: 'h-8 sm:h-9 sm:max-w-[200px]',
  md: 'h-9 sm:h-10 sm:max-w-[220px] lg:max-w-[240px]',
  lg: 'h-10 sm:h-11 sm:max-w-[240px] lg:max-w-[260px]',
} as const;

export function Logo({
  className,
  variant = 'dark',
  size = 'md',
  lockup = 'auto',
}: {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  /** auto = P-mark on mobile, full wordmark from sm up */
  lockup?: 'auto' | 'full' | 'mark';
}) {
  const src = LOGO_SRC[variant];
  const frame = cn('w-auto object-contain object-left', SIZE[size]);

  const img = (srcUrl: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={srcUrl} alt={siteConfig.fullName} className={frame} draggable={false} />
  );

  return (
    <span className={cn('inline-flex shrink-0 items-center', className)}>
      {lockup === 'auto' ? (
        <picture>
          <source media="(min-width: 640px)" srcSet={src.full} />
          {img(src.mark)}
        </picture>
      ) : (
        img(lockup === 'mark' ? src.mark : src.full)
      )}
    </span>
  );
}

export function LogoLink({
  className,
  variant = 'dark',
  size = 'md',
  lockup = 'auto',
}: {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  lockup?: 'auto' | 'full' | 'mark';
}) {
  return (
    <Link href="/" aria-label={`${siteConfig.name} home`} className={cn('shrink-0', className)}>
      <Logo variant={variant} size={size} lockup={lockup} />
    </Link>
  );
}
