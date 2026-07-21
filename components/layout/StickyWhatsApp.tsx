'use client';

import { MessageCircle } from 'lucide-react';
import { useWhatsAppLink } from '@/lib/hooks/useWhatsAppLink';

export function StickyWhatsApp() {
  const whatsappHref = useWhatsAppLink();

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 z-[60] inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-[#1a1f1c] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03] hover:bg-[#243028] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25D366] text-white">
        <MessageCircle className="h-4 w-4 fill-white" />
      </span>
      <span className="hidden sm:inline">WhatsApp Now</span>
    </a>
  );
}
