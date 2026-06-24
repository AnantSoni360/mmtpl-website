import { DataTable } from '@/components/portal/tables/DataTable';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function AdminClientsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || '1', 10));
  const take = 20;
  const skip = (pageNum - 1) * take;

  const [clients, totalCount] = await Promise.all([
    prisma.client.findMany({
      include: {
        user: true,
        _count: { select: { projects: true } }
      },
      orderBy: { companyName: 'asc' },
      take,
      skip
    }),
    prisma.client.count()
  ]);

  const totalPages = Math.ceil(totalCount / take);

  const tableData = clients.map(client => ({
    id: client.id,
    company: client.companyName,
    contactPerson: client.contactPerson || 'N/A',
    email: client.user.email,
    projects: client._count.projects,
    joined: format(new Date(client.user.createdAt), 'MMM yyyy')
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Clients</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage your client organizations and contacts.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="pl-9 pr-4 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-full sm:w-[250px]"
            />
          </div>
          <Button variant="lilac" className="h-[40px]">
            <Plus size={16} />
            Add Client
          </Button>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Company Name', accessorKey: 'company' },
          { header: 'Contact Person', accessorKey: 'contactPerson' },
          { header: 'Email', accessorKey: 'email' },
          { header: 'Active Projects', accessorKey: 'projects' },
          { header: 'Joined', accessorKey: 'joined' },
          {
            header: 'Action',
            accessorKey: 'id',
            cell: () => (
              <Button variant="outline" className="h-8 text-[12px] px-3">
                Manage
              </Button>
            )
          }
        ]}
        pagination={{ page: pageNum, totalPages }}
      />
    </div>
  );
}
