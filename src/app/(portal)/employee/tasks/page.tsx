import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function EmployeeTasksPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const tasks = await prisma.task.findMany({
    where: { assignedToId: user.id },
    include: {
      project: true
    },
    orderBy: { dueDate: 'asc' }
  });

  const tableData = tasks.map(task => ({
    id: task.id,
    title: task.title,
    project: task.project?.name || 'Internal',
    dueDate: task.dueDate ? format(new Date(task.dueDate), 'dd MMM yyyy') : 'No Date',
    priority: task.priority,
    status: task.status
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">My Tasks</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage your assigned work and deadlines.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input 
              type="text" 
              placeholder="Search my tasks..." 
              className="pl-9 pr-4 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-full sm:w-[250px]"
            />
          </div>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Task', accessorKey: 'title' },
          { header: 'Project', accessorKey: 'project' },
          { header: 'Due Date', accessorKey: 'dueDate' },
          { 
            header: 'Priority', 
            accessorKey: 'priority',
            cell: (item) => (
              <StatusBadge 
                status={item.priority} 
                variant={item.priority === 'HIGH' || item.priority === 'URGENT' ? 'error' : item.priority === 'MEDIUM' ? 'warning' : 'info'} 
              />
            )
          },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status.replace('_', ' ')} />
          },
          {
            header: 'Action',
            accessorKey: 'id',
            cell: (item) => (
              <Link href={`/employee/tasks/${item.id}`} className="text-[var(--color-slate)] hover:text-[var(--color-obsidian)] underline text-[13px]">
                Update
              </Link>
            )
          }
        ]}
      />
    </div>
  );
}
