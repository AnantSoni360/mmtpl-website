import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay, isWeekend } from 'date-fns';

export default async function EmployeeAttendancePage({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const { month } = await searchParams;
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const employee = await prisma.employee.findUnique({
    where: { userId: user.id }
  });

  if (!employee) return <div>Employee not found.</div>;

  const targetDate = month ? new Date(month) : new Date();
  const start = startOfMonth(targetDate);
  const end = endOfMonth(targetDate);
  const daysInMonth = eachDayOfInterval({ start, end });

  const attendance = await prisma.attendance.findMany({
    where: { 
      employeeId: employee.id,
      date: { gte: start, lte: end }
    }
  });

  const leaves = await prisma.leaveRequest.findMany({
    where: {
      employeeId: employee.id,
      status: 'APPROVED',
      fromDate: { lte: end },
      toDate: { gte: start }
    }
  });

  let presentDays = 0;
  let totalWorkingDays = 0;

  daysInMonth.forEach(day => {
    if (!isWeekend(day) && day <= new Date()) {
      totalWorkingDays++;
      const record = attendance.find(a => isSameDay(new Date(a.date), day));
      if (record && (record.status === 'PRESENT' || record.status === 'HALF_DAY')) {
        presentDays++;
      }
    }
  });

  const percentage = totalWorkingDays > 0 ? Math.round((presentDays / totalWorkingDays) * 100) : 0;

  // Render Calendar Grid
  const startDay = getDay(start); // 0 = Sunday
  const blanks = Array.from({ length: startDay }).map((_, i) => <div key={`blank-${i}`} className="h-24 bg-[var(--color-bone)]/50 rounded-[12px]"></div>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">My Attendance</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Track your monthly attendance and calculate performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <form method="GET" className="flex items-center gap-2">
            <input 
              type="month" 
              name="month" 
              defaultValue={format(start, 'yyyy-MM')}
              className="bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]"
            />
            <button type="submit" className="bg-[var(--color-paper)] border border-[var(--color-silver)] px-4 py-2 rounded-[var(--radius-control)] text-[13px] font-medium hover:bg-[var(--color-bone)] transition-colors">
              Filter
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Attendance Rate</p>
          <div className="flex items-end gap-2">
            <p className={`text-3xl font-semibold font-switzer ${percentage >= 90 ? 'text-green-600' : percentage >= 75 ? 'text-amber-500' : 'text-red-500'}`}>
              {percentage}%
            </p>
            <p className="text-[13px] text-[var(--color-slate)] mb-1">this month</p>
          </div>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Days Present</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">{presentDays} <span className="text-lg text-[var(--color-slate)] font-medium">/ {totalWorkingDays}</span></p>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Leaves Taken</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">{leaves.length}</p>
        </div>
      </div>

      <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-[13px] text-[var(--color-slate)] uppercase tracking-wider">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4">
          {blanks}
          {daysInMonth.map(day => {
            const isFuture = day > new Date();
            const record = attendance.find(a => isSameDay(new Date(a.date), day));
            const isLeave = leaves.some(l => day >= new Date(l.fromDate) && day <= new Date(l.toDate));
            
            let bgClass = "bg-[var(--color-bone)]";
            let statusText = "";
            let textColor = "text-[var(--color-obsidian)]";

            if (isFuture) {
              bgClass = "bg-[var(--color-bone)]/30 opacity-50";
            } else if (isWeekend(day)) {
              bgClass = "bg-[var(--color-silver)]/20";
              statusText = "Weekend";
              textColor = "text-[var(--color-slate)]";
            } else if (isLeave) {
              bgClass = "bg-purple-50 border border-purple-200";
              statusText = "On Leave";
              textColor = "text-purple-700";
            } else if (record?.status === 'PRESENT') {
              bgClass = "bg-green-50 border border-green-200";
              statusText = "Present";
              textColor = "text-green-700";
            } else if (record?.status === 'HALF_DAY') {
              bgClass = "bg-amber-50 border border-amber-200";
              statusText = "Half Day";
              textColor = "text-amber-700";
            } else if (record?.status === 'ABSENT' || (!record && day < new Date())) {
              bgClass = "bg-red-50 border border-red-200";
              statusText = "Absent";
              textColor = "text-red-700";
            }

            return (
              <div key={day.toISOString()} className={`h-24 p-2 rounded-[12px] flex flex-col justify-between ${bgClass}`}>
                <span className={`text-[14px] font-semibold font-switzer ${textColor}`}>{format(day, 'd')}</span>
                <span className={`text-[11px] font-medium ${textColor} leading-tight`}>{statusText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
