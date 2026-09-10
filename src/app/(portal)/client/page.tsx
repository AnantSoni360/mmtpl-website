import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import { Briefcase, FileText, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function ClientDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CLIENT') redirect('/auth/login');

  const client = await prisma.client.findUnique({
    where: { userId: user.id }
  });

  if (!client) return <div>Client profile not found.</div>;

  // Fetch client data
  const [activeProjects, unpaidInvoices, recentUpdates] = await Promise.all([
    prisma.project.findMany({
      where: { clientId: client.id, status: { not: 'COMPLETED' } },
      orderBy: { updatedAt: 'desc' },
      take: 3
    }),
    prisma.invoice.findMany({
      where: { clientId: client.id, status: { notIn: ['PAID', 'CANCELLED'] } },
      orderBy: { dueDate: 'asc' },
      take: 3
    }),
    prisma.projectUpdate.findMany({
      where: { project: { clientId: client.id }, isClientVisible: true },
      orderBy: { createdAt: 'desc' },
      include: { project: true },
      take: 5
    })
  ]);

  const outstandingTotal = unpaidInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const lastUpdate = recentUpdates.length > 0 ? recentUpdates[0].createdAt : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">
            Welcome, {client.contactPerson || user.name}
          </h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">{client.companyName} Dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Active Projects</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">{activeProjects.length}</p>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Outstanding Total</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">₹{outstandingTotal.toLocaleString()}</p>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Last Update</p>
          <p className="text-xl font-semibold text-[var(--color-obsidian)] font-switzer mt-2">
            {lastUpdate ? format(new Date(lastUpdate), 'dd MMM, hh:mm a') : 'No updates'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Projects & Invoices */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Projects */}
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer flex items-center gap-2 uppercase tracking-wider">
                <Briefcase size={18} className="text-[var(--color-slate)]" />
                Active Projects
              </h2>
              <Link href="/client/projects" className="text-[12px] text-[var(--color-slate)] hover:text-[var(--color-obsidian)] flex items-center gap-1 font-medium transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            {activeProjects.length === 0 ? (
              <p className="text-[13px] text-[var(--color-slate)] py-4">No active projects found.</p>
            ) : (
              <div className="space-y-3">
                {activeProjects.map(project => (
                  <Link href={`/client/projects/${project.id}`} key={project.id}>
                    <div className="flex items-center justify-between p-4 bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[12px] group hover:border-[var(--color-obsidian)] transition-all cursor-pointer mb-3 last:mb-0">
                      <div>
                        <p className="text-[14px] font-semibold text-[var(--color-obsidian)] font-switzer group-hover:text-[var(--color-lilac-bloom)] transition-colors">{project.name}</p>
                        <p className="text-[12px] text-[var(--color-slate)] font-switzer mt-1">Started: {project.startDate ? format(new Date(project.startDate), 'MMM yyyy') : 'TBA'}</p>
                      </div>
                      <StatusBadge status={project.status.replace('_', ' ')} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Pending Invoices */}
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer flex items-center gap-2 uppercase tracking-wider">
                <FileText size={18} className="text-[var(--color-slate)]" />
                Pending Invoices
              </h2>
              <Link href="/client/invoices" className="text-[12px] text-[var(--color-slate)] hover:text-[var(--color-obsidian)] flex items-center gap-1 font-medium transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            {unpaidInvoices.length === 0 ? (
              <p className="text-[13px] text-[var(--color-slate)] py-4">All invoices are paid. Thank you!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] font-switzer">
                  <thead>
                    <tr className="border-b border-[var(--color-silver)] text-[var(--color-slate)] uppercase tracking-wider">
                      <th className="pb-3 font-medium">Invoice #</th>
                      <th className="pb-3 font-medium">Due Date</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                      <th className="pb-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unpaidInvoices.map(invoice => (
                      <tr key={invoice.id} className="border-b-[0.5px] border-[var(--color-silver)] last:border-0">
                        <td className="py-3 font-medium text-[var(--color-obsidian)]">{invoice.invoiceNumber}</td>
                        <td className="py-3 text-[var(--color-slate)]">{format(new Date(invoice.dueDate), 'dd MMM yyyy')}</td>
                        <td className="py-3 font-semibold text-[var(--color-obsidian)] text-right">₹{invoice.total.toLocaleString()}</td>
                        <td className="py-3 text-right">
                          <StatusBadge status={invoice.status} variant={invoice.status === 'OVERDUE' ? 'error' : 'warning'} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Project Updates Timeline */}
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] h-fit">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer flex items-center gap-2 uppercase tracking-wider">
              <Activity size={18} className="text-[var(--color-slate)]" />
              Latest Updates
            </h2>
          </div>

          {recentUpdates.length === 0 ? (
            <p className="text-[13px] text-[var(--color-slate)] py-4 text-center">No recent project updates.</p>
          ) : (
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-silver)] before:to-transparent">
              {recentUpdates.map((update) => (
                <div key={update.id} className="relative flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-[var(--color-paper)] border-2 border-[var(--color-lilac-bloom)] shrink-0 mt-1 z-10" />
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-[var(--color-obsidian)] font-switzer leading-tight">{update.title}</p>
                    <p className="text-[11px] text-[var(--color-slate)] font-switzer mt-1 mb-2">
                      {update.project.name} • {format(new Date(update.createdAt), 'dd MMM, hh:mm a')}
                    </p>
                    <div className="bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[12px] p-3 text-[13px] text-[var(--color-obsidian)] font-switzer line-clamp-3">
                      {update.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
