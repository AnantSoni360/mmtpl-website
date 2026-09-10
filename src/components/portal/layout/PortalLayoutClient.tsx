'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { cn } from '@/lib/utils';

interface PortalLayoutClientProps {
  role: string;
  user?: { name: string; email: string; avatarUrl: string | null };
  children: React.ReactNode;
}

export function PortalLayoutClient({ role, user, children }: PortalLayoutClientProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Auto-close on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bone)] flex portal-container">
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <Sidebar role={role} isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div 
        className={cn(
          "flex flex-col min-h-screen flex-1 transition-all duration-300 w-full", 
          "md:pl-[240px]" // Fixed 240px offset on md+
        )}
      >
        <Topbar isOpen={isOpen} setIsOpen={setIsOpen} user={user} role={role} />
        <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
