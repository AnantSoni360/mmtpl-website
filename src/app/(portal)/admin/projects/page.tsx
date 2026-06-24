import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function AdminProjectsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || '1', 10));
  const take = 20;
  const skip = (pageNum - 1) * take;

  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      include: {
        client: true,
        _count: {
          select: { tasks: true, assignments: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take,
      skip
    }),
    prisma.project.count()
  ]);

  const totalPages = Math.ceil(totalCount / take);

  const tableData = projects.map(proj => ({
    id: proj.id,
    name: proj.name,
    client: proj.client?.companyName || 'Internal',
    startDate: proj.startDate ? format(new Date(proj.startDate), 'dd MMM yyyy') : 'N/A',
    endDate: proj.endDate ? format(new Date(proj.endDate), 'dd MMM yyyy') : 'N/A',
    status: proj.status,
    tasks: proj._count.tasks,
    team: proj._count.assignments
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Projects</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage all client and internal projects.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-9 pr-4 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-full sm:w-[250px]"
            />
          </div>
          <Link href="/admin/projects/new">
            <Button variant="lilac" className="h-[40px]">
              <Plus size={16} />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Project Name', accessorKey: 'name' },
          { header: 'Client', accessorKey: 'client' },
          { header: 'Start Date', accessorKey: 'startDate' },
          { header: 'End Date', accessorKey: 'endDate' },
          { 
            header: 'Team Size', 
            accessorKey: 'team',
            cell: (item) => <span className="font-medium">{item.team} members</span>
          },
          { 
            header: 'Tasks', 
            accessorKey: 'tasks',
            cell: (item) => <span className="text-[var(--color-slate)]">{item.tasks} tasks</span>
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
              <Link href={`/admin/projects/${item.id}`} className="text-[var(--color-slate)] hover:text-[var(--color-obsidian)] underline text-[13px]">
                Manage
              </Link>
            )
          }
        ]}
        pagination={{ page: pageNum, totalPages }}
      />
    </div>
  );
}
