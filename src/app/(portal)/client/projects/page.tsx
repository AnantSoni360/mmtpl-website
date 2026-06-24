import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function ClientProjectsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CLIENT') redirect('/auth/login');

  const client = await prisma.client.findUnique({
    where: { userId: user.id }
  });

  if (!client) return <div>Client profile not found.</div>;

  const projects = await prisma.project.findMany({
    where: { clientId: client.id },
    orderBy: { createdAt: 'desc' }
  });

  const tableData = projects.map(proj => ({
    id: proj.id,
    name: proj.name,
    location: proj.location || 'N/A',
    valueCr: proj.valueCr ? `₹${proj.valueCr} Cr` : 'N/A',
    startDate: proj.startDate ? format(new Date(proj.startDate), 'dd MMM yyyy') : 'TBA',
    endDate: proj.endDate ? format(new Date(proj.endDate), 'dd MMM yyyy') : 'TBA',
    status: proj.status
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">My Projects</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Track the status of all your MMTPL contracts.</p>
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
          { header: 'Project Name', accessorKey: 'name' },
          { header: 'Location', accessorKey: 'location' },
          { header: 'Contract Value', accessorKey: 'valueCr' },
          { header: 'Start Date', accessorKey: 'startDate' },
          { header: 'Target End Date', accessorKey: 'endDate' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status.replace('_', ' ')} />
          },
          {
            header: 'Action',
            accessorKey: 'id',
            cell: (item) => (
              <Link href={`/client/projects/${item.id}`} className="text-[var(--color-slate)] hover:text-[var(--color-obsidian)] underline text-[13px]">
                View Details
              </Link>
            )
          }
        ]}
      />
    </div>
  );
}
