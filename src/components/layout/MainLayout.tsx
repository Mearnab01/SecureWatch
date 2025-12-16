import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function MainLayout({ children, showFooter = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
