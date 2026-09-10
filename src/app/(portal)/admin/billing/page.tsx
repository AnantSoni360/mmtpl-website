import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Plus, Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function AdminBillingPage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      client: true,
      project: true
    },
    orderBy: { createdAt: 'desc' }
  });

  const tableData = invoices.map(inv => ({
    id: inv.id,
    number: inv.invoiceNumber,
    client: inv.client.companyName,
    project: inv.project.name,
    amount: `₹${inv.total.toLocaleString()}`,
    dueDate: format(new Date(inv.dueDate), 'dd MMM yyyy'),
    status: inv.status
  }));

  // Calculate quick stats
  const totalOutstanding = invoices
    .filter(i => i.status !== 'PAID' && i.status !== 'CANCELLED')
    .reduce((sum, i) => sum + i.total, 0);
    
  const totalOverdue = invoices
    .filter(i => i.status === 'OVERDUE')
    .reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Billing & Invoices</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage all client invoices and payments.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="pl-9 pr-4 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-full sm:w-[250px]"
            />
          </div>
          <Link href="/admin/billing/new">
            <Button variant="lilac" className="h-[40px]">
              <Plus size={16} />
              Create Invoice
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Total Outstanding</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">₹{totalOutstanding.toLocaleString()}</p>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Total Overdue</p>
          <p className="text-3xl font-semibold text-red-600 font-switzer">₹{totalOverdue.toLocaleString()}</p>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Pending Invoices</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">
            {invoices.filter(i => i.status === 'SENT' || i.status === 'OVERDUE').length}
          </p>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Invoice #', accessorKey: 'number' },
          { header: 'Client', accessorKey: 'client' },
          { header: 'Project', accessorKey: 'project' },
          { header: 'Amount', accessorKey: 'amount' },
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
              <div className="flex items-center gap-3">
                <Button variant="outline" className="h-8 text-[12px] px-3">
                  Edit
                </Button>
                <Link href={`/admin/billing/${item.id}/print`}>
                  <Button variant="outline" className="h-8 text-[12px] px-3 font-medium">
                    <Download size={14} className="mr-1" /> PDF
                  </Button>
                </Link>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
