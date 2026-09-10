import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Search } from 'lucide-react';
import { format } from 'date-fns';

export default async function EmployeeProjectsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const employee = await prisma.employee.findUnique({
    where: { userId: user.id }
  });

  if (!employee) return <div>Employee not found.</div>;

  const projects = await prisma.project.findMany({
    where: { assignments: { some: { employeeId: employee.id } } },
    include: { client: true },
    orderBy: { createdAt: 'desc' }
  });

  const tableData = projects.map(proj => ({
    id: proj.id,
    projectCode: proj.projectCode,
    name: proj.name,
    client: proj.client?.companyName || 'Internal',
    startDate: proj.startDate ? format(new Date(proj.startDate), 'dd MMM yyyy') : 'No Date',
    status: proj.status
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">My Projects</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Projects you are actively assigned to.</p>
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
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Project Code', accessorKey: 'projectCode' },
          { header: 'Name', accessorKey: 'name' },
          { header: 'Client', accessorKey: 'client' },
          { header: 'Start Date', accessorKey: 'startDate' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status.replace('_', ' ')} />
          }
        ]}
      />
    </div>
  );
}
