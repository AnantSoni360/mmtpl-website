import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay, isWeekend } from 'date-fns';

export default async function EmployeePerformancePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const employee = await prisma.employee.findUnique({
    where: { userId: user.id }
  });

  if (!employee) return <div>Employee not found.</div>;

  const targetDate = new Date();
  const start = startOfMonth(targetDate);
  const end = endOfMonth(targetDate);
  const daysInMonth = eachDayOfInterval({ start, end });

  const [attendance, leaves, completedTasks, allAssignedTasks] = await Promise.all([
    prisma.attendance.findMany({
      where: { employeeId: employee.id, date: { gte: start, lte: end } }
    }),
    prisma.leaveRequest.findMany({
      where: { employeeId: employee.id, status: 'APPROVED', fromDate: { lte: end }, toDate: { gte: start } }
    }),
    prisma.task.count({
      where: { assignedToId: user.id, status: 'COMPLETED' }
    }),
    prisma.task.count({
      where: { assignedToId: user.id }
    })
  ]);

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

  const attendanceRate = totalWorkingDays > 0 ? Math.round((presentDays / totalWorkingDays) * 100) : 0;
  const taskCompletionRate = allAssignedTasks > 0 ? Math.round((completedTasks / allAssignedTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">My Performance</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Overview of your KPIs for {format(targetDate, 'MMMM yyyy')}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] flex flex-col justify-between h-[150px]">
          <p className="text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">Attendance Rate</p>
          <div className="flex items-end justify-between">
            <p className={`text-5xl font-semibold font-switzer ${attendanceRate >= 90 ? 'text-green-600' : attendanceRate >= 75 ? 'text-amber-500' : 'text-red-500'}`}>
              {attendanceRate}%
            </p>
            <p className="text-[13px] text-[var(--color-slate)] mb-1">Target: 95%</p>
          </div>
        </div>

        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] flex flex-col justify-between h-[150px]">
          <p className="text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">Tasks Completed</p>
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-2">
              <p className="text-5xl font-semibold text-[var(--color-obsidian)] font-switzer">{completedTasks}</p>
              <p className="text-xl text-[var(--color-slate)] font-medium mb-1">/ {allAssignedTasks}</p>
            </div>
            <p className="text-[13px] text-[var(--color-slate)] mb-1">{taskCompletionRate}% Rate</p>
          </div>
        </div>

        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] flex flex-col justify-between h-[150px]">
          <p className="text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">Leaves Taken</p>
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-2">
              <p className="text-5xl font-semibold text-[var(--color-obsidian)] font-switzer">{leaves.length}</p>
              <p className="text-xl text-[var(--color-slate)] font-medium mb-1">/ 12</p>
            </div>
            <p className="text-[13px] text-[var(--color-slate)] mb-1">Yearly Limit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
