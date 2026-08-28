import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { siteConfig } from '@/lib/data/site';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://turbotechcars.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteConfig.fullName} — G2 & G Driving School Toronto / GTA`,
  description:
    'Private, MTO-approved driving lessons in Toronto and the GTA. Flexible scheduling, pick-up & drop-off, multilingual instructors, high pass rate.',
  keywords: [
    'driving school Toronto',
    'G2 test',
    'G test',
    'driving lessons GTA',
    'BDE course',
    siteConfig.name,
    siteConfig.fullName,
  ],
  openGraph: {
    title: siteConfig.fullName,
    description: 'Pass your G2 & G driving test with confidence.',
    type: 'website',
    siteName: siteConfig.fullName,
    url: siteUrl,
    images: [
      {
        url: '/og-image.png?v=pdlc-20260827',
        width: 1200,
        height: 630,
        alt: siteConfig.fullName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.fullName,
    description: 'Pass your G2 & G driving test with confidence.',
    images: ['/og-image.png?v=pdlc-20260827'],
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
