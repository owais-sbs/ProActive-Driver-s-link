'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { buildWhatsAppUrl, getPageLabel } from '@/lib/whatsapp';

export function useWhatsAppLink() {
  const pathname = usePathname() ?? '/';

  return useMemo(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://proactivedriverslink.ca';
    const url = pathname === '/' ? `${origin}/` : `${origin}${pathname}`;
    return buildWhatsAppUrl(getPageLabel(pathname), url);
  }, [pathname]);
}
