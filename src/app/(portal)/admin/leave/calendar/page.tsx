import prisma from '@/lib/prisma';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function LeaveCalendarPage({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const { month } = await searchParams;
  
  const targetDate = month ? new Date(`${month}-01`) : new Date();
  const start = startOfMonth(targetDate);
  const end = endOfMonth(targetDate);
  const daysInMonth = eachDayOfInterval({ start, end });

  const approvedLeaves = await prisma.leaveRequest.findMany({
    where: {
      status: 'APPROVED',
      AND: [
        { fromDate: { lte: end } },
        { toDate: { gte: start } }
      ]
    },
    include: { employee: { include: { user: true } } }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/leave" className="w-10 h-10 rounded-full border border-[var(--color-silver)] flex items-center justify-center hover:bg-[var(--color-bone)] transition-colors">
          <ArrowLeft size={16} className="text-[var(--color-obsidian)]" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Leave Calendar</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">{format(start, 'MMMM yyyy')}</p>
        </div>
      </div>

      <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-[12px] font-semibold text-[var(--color-slate)] font-switzer py-2">
              {d}
            </div>
          ))}
          
          {/* Padding days for first week */}
          {Array.from({ length: start.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] bg-[var(--color-bone)] rounded-lg opacity-50" />
          ))}

          {daysInMonth.map(day => {
            const leavesOnDay = approvedLeaves.filter(l => {
              const f = new Date(l.fromDate);
              const t = new Date(l.toDate);
              return day >= f && day <= t;
            });

            return (
              <div key={day.toISOString()} className="min-h-[100px] border border-[var(--color-silver)] rounded-lg p-2 bg-white">
                <p className={`text-[12px] font-semibold font-switzer mb-2 ${isSameDay(day, new Date()) ? 'text-[var(--color-lilac-bloom)]' : 'text-[var(--color-obsidian)]'}`}>
                  {format(day, 'd')}
                </p>
                <div className="space-y-1">
                  {leavesOnDay.map(l => (
                    <div key={l.id} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded truncate font-switzer" title={`${l.employee.user.name} - ${l.leaveType}`}>
                      {l.employee.user.name?.split(' ')[0]}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
