import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function ClientTicketsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CLIENT') redirect('/auth/login');

  const client = await prisma.client.findUnique({
    where: { userId: user.id }
  });

  if (!client) return <div>Client not found.</div>;

  const tickets = await prisma.supportTicket.findMany({
    where: { clientId: client.id },
    orderBy: { createdAt: 'desc' }
  });

  const tableData = tickets.map(ticket => ({
    id: ticket.id,
    subject: ticket.subject,
    description: ticket.description.substring(0, 50) + (ticket.description.length > 50 ? '...' : ''),
    date: format(new Date(ticket.createdAt), 'dd MMM yyyy'),
    status: ticket.status
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Support Tickets</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Submit and track your support requests.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/client/tickets/new">
            <Button variant="lilac" className="h-[40px]">
              <Plus size={16} className="mr-2" />
              New Ticket
            </Button>
          </Link>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Subject', accessorKey: 'subject' },
          { header: 'Description', accessorKey: 'description' },
          { header: 'Date Submitted', accessorKey: 'date' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status} variant={item.status === 'CLOSED' ? 'success' : item.status === 'IN_PROGRESS' ? 'warning' : 'default'} />
          }
        ]}
      />
    </div>
  );
}
