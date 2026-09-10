import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';

export default async function ClientProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user || user.role !== 'CLIENT') redirect('/auth/login');

  const client = await prisma.client.findUnique({
    where: { userId: user.id }
  });

  if (!client) return <div>Client not found.</div>;

  const project = await prisma.project.findUnique({
    where: { id, clientId: client.id },
    include: {
      assignments: true,
      updates: {
        where: { isClientVisible: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!project) return <div>Project not found or unauthorized.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">{project.name}</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Project Code: {project.projectCode}</p>
        </div>
        <StatusBadge status={project.status.replace('_', ' ')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2 border-b border-[var(--color-silver)] pb-2">Project Overview</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer mb-1">Location</p>
                <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{project.location || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer mb-1">Contract Value</p>
                <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{project.valueCr ? `₹${project.valueCr} Cr` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer mb-1">Start Date</p>
                <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{project.startDate ? format(new Date(project.startDate), 'dd MMM yyyy') : 'TBA'}</p>
              </div>
              <div>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer mb-1">Target End Date</p>
                <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{project.endDate ? format(new Date(project.endDate), 'dd MMM yyyy') : 'TBA'}</p>
              </div>
            </div>

            <div>
              <p className="text-[12px] text-[var(--color-slate)] font-switzer mb-1">Scope of Work</p>
              <p className="text-[14px] text-[var(--color-obsidian)] font-switzer leading-relaxed whitespace-pre-wrap bg-[var(--color-bone)] p-4 rounded-[12px] border border-[var(--color-silver)]">
                {project.scope || 'No scope details provided.'}
              </p>
            </div>
            
            <div>
              <p className="text-[12px] text-[var(--color-slate)] font-switzer mb-1">Assigned Team Count</p>
              <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{project.assignments.length} Team Members</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] h-fit max-h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer flex items-center gap-2 uppercase tracking-wider">
              <Activity size={18} className="text-[var(--color-slate)]" />
              Project Updates
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {project.updates.length === 0 ? (
              <p className="text-[13px] text-[var(--color-slate)] text-center py-4">No updates posted yet.</p>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--color-silver)] before:to-transparent">
                {project.updates.map((update) => (
                  <div key={update.id} className="relative flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full bg-[var(--color-paper)] border-2 border-[var(--color-lilac-bloom)] shrink-0 mt-1 z-10" />
                    <div className="flex-1 bg-[var(--color-bone)] p-3 rounded-[12px] border border-[var(--color-silver)]">
                      <p className="text-[14px] font-semibold text-[var(--color-obsidian)] font-switzer leading-tight">{update.title}</p>
                      <p className="text-[11px] text-[var(--color-slate)] font-switzer mt-1 mb-2">
                        {format(new Date(update.createdAt), 'dd MMM yyyy, hh:mm a')}
                      </p>
                      <p className="text-[13px] text-[var(--color-obsidian)] font-switzer whitespace-pre-wrap">{update.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
