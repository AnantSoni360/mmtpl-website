import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { NewInvoiceForm } from '@/components/portal/billing/NewInvoiceForm';

export default async function NewInvoicePage() {
  const projects = await prisma.project.findMany({
    include: { client: true },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Create Invoice</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Draft a new invoice for a project.</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <NewInvoiceForm projects={projects.map(p => ({
          id: p.id,
          name: p.name,
          clientName: p.client?.companyName || 'Unknown Client'
        }))} />
      </div>
    </div>
  );
}
