import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { TaskStatus } from '@prisma/client';

export default async function AdminTasksPage({ searchParams }: { searchParams: Promise<{ q?: string, status?: string, assignee?: string, page?: string }> }) {
  const { q = '', status = '', assignee = '', page = '1' } = await searchParams;
  const pageNum = Math.max(1, parseInt(page, 10));
  const take = 20;
  const skip = (pageNum - 1) * take;

  const whereClause = {
    AND: [
      q ? {
        OR: [
          { title: { contains: q, mode: 'insensitive' as any } },
          { project: { name: { contains: q, mode: 'insensitive' as any } } }
        ]
      } : {},
      status ? { status: status as TaskStatus } : {},
      assignee ? { assignedToId: assignee } : {}
    ]
  };

  const [tasks, totalCount] = await Promise.all([
    prisma.task.findMany({
      where: whereClause,
      include: {
        project: true,
        assignedTo: true
      },
      orderBy: { dueDate: 'asc' },
      take,
      skip
    }),
    prisma.task.count({ where: whereClause })
  ]);

  const totalPages = Math.ceil(totalCount / take);
  const allAssignees = await prisma.user.findMany({
    where: { role: 'EMPLOYEE' },
    select: { id: true, name: true }
  });

  const tableData = tasks.map(task => ({
    id: task.id,
    title: task.title,
    project: task.project?.name || 'Internal',
    assignedTo: task.assignedTo?.name || 'Unassigned',
    dueDate: task.dueDate ? format(new Date(task.dueDate), 'dd MMM yyyy') : 'No Date',
    priority: task.priority,
    status: task.status
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Tasks</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage and track all project tasks.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <form className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
              <input 
                type="text" 
                name="q"
                defaultValue={q}
                placeholder="Search tasks..." 
                className="pl-9 pr-4 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-full sm:w-[200px]"
              />
            </div>
            <select name="status" defaultValue={status} className="px-3 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors">
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <select name="assignee" defaultValue={assignee} className="px-3 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors">
              <option value="">All Assignees</option>
              {allAssignees.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <Button type="submit" variant="outline" className="h-[40px] px-4">Filter</Button>
          </form>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Task', accessorKey: 'title' },
          { header: 'Project', accessorKey: 'project' },
          { header: 'Assigned To', accessorKey: 'assignedTo' },
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
              <form action={async () => {
                'use server';
                const prisma = (await import('@/lib/prisma')).default;
                const { revalidatePath } = await import('next/cache');
                
                const task = await prisma.task.findUnique({ where: { id: item.id } });
                if(!task) return;
                
                const nextStatus: Record<string, TaskStatus> = {
                  PENDING: 'IN_PROGRESS',
                  IN_PROGRESS: 'COMPLETED',
                  COMPLETED: 'PENDING'
                };
                
                await prisma.task.update({
                  where: { id: item.id },
                  data: { status: nextStatus[task.status] || 'PENDING' }
                });
                
                revalidatePath('/admin/tasks');
              }}>
                <button type="submit" className="text-[var(--color-slate)] hover:text-[var(--color-obsidian)] underline text-[13px]">
                  Next Status
                </button>
              </form>
            )
          }
        ]}
        pagination={{ page: pageNum, totalPages }}
      />
    </div>
  );
}
