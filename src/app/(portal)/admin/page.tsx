import { StatCard } from '@/components/portal/dashboard/StatCard';
import { ProjectsChart } from '@/components/portal/dashboard/ProjectsChart';
import { Briefcase, Users, Inbox, FileText, CalendarDays, CheckSquare } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/auth/login');

  // Fetch real stats from the database
  const [
    activeProjects,
    employeesCount,
    inquiriesCount,
    unpaidInvoices,
    pendingLeaves,
    openTasks
  ] = await Promise.all([
    prisma.project.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.employee.count(),
    prisma.inquiry.count({ where: { status: 'NEW' } }),
    prisma.invoice.count({ where: { status: { in: ['DRAFT', 'SENT', 'OVERDUE'] } } }),
    prisma.leaveRequest.count({ where: { status: 'PENDING' } }),
    prisma.task.count({ where: { status: { in: ['PENDING', 'IN_PROGRESS'] } } }),
  ]);

  // Generate Month-by-Month data for the last 6 months
  const chartData = [];
  for (let i = 5; i >= 0; i--) {
    const date = subMonths(new Date(), i);
    const start = startOfMonth(date);
    const end = endOfMonth(date);

    const [inProgressCount, completedCount] = await Promise.all([
      prisma.project.count({
        where: {
          createdAt: { gte: start, lte: end },
          status: { in: ['PLANNING', 'IN_PROGRESS', 'ON_HOLD'] }
        }
      }),
      prisma.project.count({
        where: {
          createdAt: { gte: start, lte: end },
          status: 'COMPLETED'
        }
      })
    ]);

    chartData.push({
      name: format(date, 'MMM'),
      inProgress: inProgressCount,
      completed: completedCount,
    });
  }

  // Fetch recent activity (last 10 across a few models)
  const recentProjects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { id: true, name: true, createdAt: true }
  });
  const recentTasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { id: true, title: true, createdAt: true }
  });
  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { id: true, name: true, createdAt: true }
  });

  const activities = [
    ...recentProjects.map(p => ({
      id: `proj-${p.id}`,
      text: `New project "${p.name}" created`,
      date: p.createdAt,
      color: 'bg-[var(--color-lilac-bloom)]'
    })),
    ...recentTasks.map(t => ({
      id: `task-${t.id}`,
      text: `Task "${t.title}" was added`,
      date: t.createdAt,
      color: 'bg-blue-500'
    })),
    ...recentInquiries.map(i => ({
      id: `inq-${i.id}`,
      text: `New inquiry received from ${i.name}`,
      date: i.createdAt,
      color: 'bg-green-500'
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-2">Admin Dashboard</h1>
        <p className="text-[var(--color-slate)] font-switzer">Welcome back, {user.name || 'Admin'}. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Active Projects" value={activeProjects} icon={Briefcase} trend={{ value: 8, isPositive: true }} />
        <StatCard title="Total Employees" value={employeesCount} icon={Users} trend={{ value: 2, isPositive: true }} />
        <StatCard title="New Inquiries" value={inquiriesCount} icon={Inbox} />
        <StatCard title="Unpaid Invoices" value={unpaidInvoices} icon={FileText} trend={{ value: 12, isPositive: false }} />
        <StatCard title="Pending Leaves" value={pendingLeaves} icon={CalendarDays} />
        <StatCard title="Open Tasks" value={openTasks} icon={CheckSquare} trend={{ value: 5, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-medium font-switzer text-[var(--color-obsidian)] mb-4">Project Overview</h2>
          <ProjectsChart data={chartData} />
        </div>

        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-medium font-switzer text-[var(--color-obsidian)] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.length > 0 ? activities.map(activity => (
              <div key={activity.id} className="flex gap-4">
                <div className={`w-2 h-2 mt-2 rounded-full ${activity.color} shrink-0`} />
                <div>
                  <p className="text-[14px] font-switzer text-[var(--color-obsidian)]">{activity.text}</p>
                  <span className="text-[12px] text-[var(--color-slate)] font-switzer">
                    {format(activity.date, 'MMM d, hh:mm a')}
                  </span>
                </div>
              </div>
            )) : (
              <p className="text-[13px] text-[var(--color-slate)] font-switzer">No recent activity.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
