import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import { Clock, CalendarDays, CheckSquare, Plus, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function EmployeeDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const employee = await prisma.employee.findUnique({
    where: { userId: user.id }
  });

  if (!employee) return <div>Employee profile not found.</div>;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Quick stats
  const [todaysAttendance, pendingLeaves, myTasks, activeProjectsCount, openTasksCount] = await Promise.all([
    prisma.attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId: employee.id,
          date: today
        }
      }
    }),
    prisma.leaveRequest.count({
      where: { employeeId: employee.id, status: 'PENDING' }
    }),
    prisma.task.findMany({
      where: { assignedToId: user.id, status: { not: 'COMPLETED' } },
      include: { project: true },
      orderBy: { dueDate: 'asc' },
      take: 5
    }),
    prisma.project.count({
      where: { 
        assignments: { some: { employeeId: employee.id } },
        status: { notIn: ['COMPLETED', 'ON_HOLD'] }
      }
    }),
    prisma.task.count({
      where: { assignedToId: user.id, status: { not: 'COMPLETED' } }
    })
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Welcome back, {user.name?.split(' ')[0]}</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Here's your schedule and tasks for today.</p>
        </div>
        <p className="text-[14px] font-medium text-[var(--color-obsidian)] bg-[var(--color-paper)] border border-[var(--color-silver)] px-4 py-2 rounded-[var(--radius-control)]">
          {format(new Date(), 'EEEE, MMMM do')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Open Tasks</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">{openTasksCount}</p>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Active Projects</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">{activeProjectsCount}</p>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Leave Balance</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions & Attendance */}
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
          <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer flex items-center gap-2 uppercase tracking-wider">
            <Clock size={18} className="text-[var(--color-slate)]" />
            Today's Attendance
          </h2>
          
          <div className="bg-[var(--color-bone)] border border-[var(--color-silver)] p-4 rounded-[12px] flex flex-col items-center justify-center text-center space-y-3">
            {todaysAttendance?.checkIn ? (
              <>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[20px] font-semibold text-[var(--color-obsidian)] font-switzer">
                    {format(new Date(todaysAttendance.checkIn), 'hh:mm a')}
                  </p>
                  <p className="text-[13px] text-[var(--color-slate)] font-switzer">Checked In</p>
                </div>
                {!todaysAttendance.checkOut && (
                  <form action="/api/employee/checkout" method="POST" className="w-full pt-2">
                    <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                      Check Out
                    </Button>
                  </form>
                )}
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[var(--color-silver)] flex items-center justify-center text-[var(--color-slate)] mb-2">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">Not Checked In</p>
                  <p className="text-[13px] text-[var(--color-slate)] font-switzer">You haven't marked your attendance yet.</p>
                </div>
                <form action="/api/employee/checkin" method="POST" className="w-full pt-2">
                  <Button variant="lilac" className="w-full">
                    Check In Now
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Leave Balance / Status */}
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer flex items-center gap-2 uppercase tracking-wider">
              <CalendarDays size={18} className="text-[var(--color-slate)]" />
              Leave Requests
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--color-bone)] border border-[var(--color-silver)] p-4 rounded-[12px] text-center">
              <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Pending</p>
              <p className="text-[24px] font-semibold text-[var(--color-obsidian)] mt-1">{pendingLeaves}</p>
            </div>
            <div className="bg-[var(--color-bone)] border border-[var(--color-silver)] p-4 rounded-[12px] text-center">
              <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase">Balance</p>
              <p className="text-[24px] font-semibold text-[var(--color-obsidian)] mt-1">12</p>
            </div>
          </div>
          
          <div className="pt-2">
            <Link href="/employee/leave">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Plus size={16} /> Request Leave
              </Button>
            </Link>
          </div>
        </div>

        {/* My Tasks Summary */}
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer flex items-center gap-2 uppercase tracking-wider">
              <CheckSquare size={18} className="text-[var(--color-slate)]" />
              My Tasks
            </h2>
            <Link href="/employee/tasks" className="text-[12px] text-[var(--color-slate)] hover:text-[var(--color-obsidian)] flex items-center gap-1 font-medium transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {myTasks.length === 0 ? (
              <p className="text-[13px] text-[var(--color-slate)] text-center py-4">You have no pending tasks.</p>
            ) : (
              myTasks.map(task => (
                <div key={task.id} className="flex justify-between items-start p-3 bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[12px] group hover:border-[var(--color-slate)] transition-colors cursor-pointer">
                  <div>
                    <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer leading-tight">{task.title}</p>
                    <p className="text-[12px] text-[var(--color-slate)] font-switzer mt-1">{task.project.name}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge 
                      status={task.priority} 
                      variant={task.priority === 'HIGH' || task.priority === 'URGENT' ? 'error' : task.priority === 'MEDIUM' ? 'warning' : 'info'} 
                    />
                    <span className={`text-[11px] font-medium ${new Date(task.dueDate!) < new Date() ? 'text-red-600' : 'text-[var(--color-slate)]'}`}>
                      {task.dueDate ? format(new Date(task.dueDate), 'MMM dd') : ''}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
