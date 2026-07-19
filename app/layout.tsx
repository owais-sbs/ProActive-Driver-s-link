import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Turbo Teach — G2 & G Driving School Toronto / GTA',
  description:
    'Private, MTO-approved driving lessons in Toronto and the GTA. Flexible scheduling, pick-up & drop-off, multilingual instructors, high pass rate.',
  keywords: ['driving school Toronto', 'G2 test', 'G test', 'driving lessons GTA', 'BDE course', 'Turbo Teach'],
<<<<<<< HEAD
=======
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
>>>>>>> c9f587eb743ccc8122bf9588835c869240d2e09b
  openGraph: {
    title: 'Turbo Teach Driving School',
    description: 'Pass your G2 & G driving test with confidence.',
    type: 'website',
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
