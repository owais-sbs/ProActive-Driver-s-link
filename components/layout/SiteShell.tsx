import { Header } from './Header';
import { Footer } from './Footer';
import { StickyWhatsApp } from './StickyWhatsApp';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="min-w-0 flex-1">{children}</main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}
