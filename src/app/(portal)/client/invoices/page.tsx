import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function ClientInvoicesPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CLIENT') redirect('/auth/login');

  const client = await prisma.client.findUnique({
    where: { userId: user.id }
  });

  if (!client) return <div>Client profile not found.</div>;

  const invoices = await prisma.invoice.findMany({
    where: { clientId: client.id, status: { not: 'DRAFT' } },
    include: { project: true },
    orderBy: { dueDate: 'desc' }
  });

  const tableData = invoices.map(inv => ({
    id: inv.id,
    number: inv.invoiceNumber,
    project: inv.project.name,
    amount: `₹${inv.total.toLocaleString()}`,
    dueDate: format(new Date(inv.dueDate), 'dd MMM yyyy'),
    status: inv.status
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Invoices</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage your billing and payments.</p>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Invoice #', accessorKey: 'number' },
          { header: 'Project', accessorKey: 'project' },
          { header: 'Total Amount', accessorKey: 'amount' },
          { header: 'Due Date', accessorKey: 'dueDate' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status} variant={item.status === 'OVERDUE' ? 'error' : item.status === 'PAID' ? 'success' : 'warning'} />
          },
          {
            header: 'Action',
            accessorKey: 'id',
            cell: (item) => (
              <Link href={`/client/invoices/${item.id}/print`}>
                <Button variant="outline" className="h-8 text-[12px] px-3 font-medium">
                  <Download size={14} className="mr-1" /> PDF
                </Button>
              </Link>
            )
          }
        ]}
      />
    </div>
  );
}
