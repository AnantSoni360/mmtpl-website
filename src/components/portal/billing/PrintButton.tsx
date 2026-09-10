'use client';

import { Button } from '@/components/ui/Button';
import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <Button variant="lilac" onClick={() => window.print()} className="print-button">
      <Printer size={16} className="mr-2" /> Print PDF
    </Button>
  );
}
