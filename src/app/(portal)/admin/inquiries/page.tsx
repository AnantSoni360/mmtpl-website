import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const tableData = inquiries.map(inq => ({
    id: inq.id,
    name: inq.name,
    company: inq.company || 'N/A',
    service: inq.service,
    date: format(new Date(inq.createdAt), 'dd MMM yyyy'),
    status: inq.status
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Inquiries</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage website contact forms and leads.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input 
              type="text" 
              placeholder="Search inquiries..." 
              className="pl-9 pr-4 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-full sm:w-[250px]"
            />
          </div>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Name', accessorKey: 'name' },
          { header: 'Company', accessorKey: 'company' },
          { header: 'Service Interest', accessorKey: 'service' },
          { header: 'Received On', accessorKey: 'date' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status} variant={item.status === 'NEW' ? 'error' : item.status === 'CLOSED' ? 'default' : 'warning'} />
          },
          {
            header: 'Action',
            accessorKey: 'id',
            cell: (item) => (
              <Link href={`/admin/inquiries/${item.id}`}>
                <Button variant="outline" className="h-8 text-[12px] px-3">
                  View
                </Button>
              </Link>
            )
          }
        ]}
      />
    </div>
  );
}
