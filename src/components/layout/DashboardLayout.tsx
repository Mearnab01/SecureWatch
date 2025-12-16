import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar className="hidden lg:flex" />
      <main className="pt-16 lg:pl-[240px] min-h-screen">
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
