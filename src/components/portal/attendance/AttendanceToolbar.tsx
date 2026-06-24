'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CalendarIcon, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AttendanceToolbar({ initialDate }: { initialDate: string }) {
  const router = useRouter();
  
  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    router.push(`/admin/attendance?date=${e.target.value}`);
  }

  function handleExport() {
    window.location.href = `/api/admin/attendance/export?date=${initialDate}`;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-3 py-2">
        <CalendarIcon size={16} className="text-[var(--color-slate)]" />
        <input 
          type="date" 
          defaultValue={initialDate}
          onChange={handleDateChange}
          className="bg-transparent text-[13px] font-switzer text-[var(--color-obsidian)] outline-none"
        />
      </div>
      <Button variant="outline" className="h-[40px]" onClick={handleExport}>
        <Download size={16} />
        Export CSV
      </Button>
      <Button variant="dark" className="h-[40px]" onClick={() => router.push(`/admin/attendance/corrections?date=${initialDate}`)}>
        <Clock size={16} />
        Mark Corrections
      </Button>
    </div>
  );
}
