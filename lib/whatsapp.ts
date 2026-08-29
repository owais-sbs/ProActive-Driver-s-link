export const WHATSAPP_PHONE = '14168814079';
export const DISPLAY_PHONE = '416-881-4079';
export const DISPLAY_PHONE_FULL = '+1 (416) 881-4079';

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About Us',
  '/services': 'Services',
  '/packages': 'Packages',
  '/contact': 'Contact Us',
};

export function getPageLabel(pathname: string): string {
  return PAGE_LABELS[pathname] ?? 'your website';
}

export function buildWhatsAppUrl(pageLabel: string, pageUrl: string): string {
  const text = `Hello ProActive Driver's Link,\nI would like to know more information about ${pageLabel}. Here's the URL: ${pageUrl}`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export function defaultWhatsAppUrl(): string {
  return buildWhatsAppUrl('Home', 'https://proactivedriverslink.ca/');
}
