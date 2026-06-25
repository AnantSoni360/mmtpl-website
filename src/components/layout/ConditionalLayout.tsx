'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes where public Navbar/Footer should be hidden
  const portalRoutes = ['/admin', '/employee', '/client', '/auth'];
  const isPortal = portalRoutes.some(route => pathname === route || pathname?.startsWith(`${route}/`));

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
