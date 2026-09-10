import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from '@/components/portal/tables/DataTable';

export default async function JobPostingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const job = await prisma.jobPosting.findUnique({
    where: { id },
    include: {
      applications: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!job) notFound();

  const applicationsData = job.applications.map(app => ({
    id: app.id,
    name: app.name,
    experience: app.experience,
    appliedOn: format(new Date(app.createdAt), 'dd MMM yyyy'),
    status: app.status
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/recruitment" className="w-10 h-10 rounded-full border border-[var(--color-silver)] flex items-center justify-center hover:bg-[var(--color-bone)] transition-colors">
            <ArrowLeft size={16} className="text-[var(--color-obsidian)]" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1 flex items-center gap-3">
              {job.title}
              <StatusBadge status={job.isActive ? 'ACTIVE' : 'CLOSED'} variant={job.isActive ? 'success' : 'default'} />
            </h1>
            <p className="text-[13px] text-[var(--color-slate)] font-switzer">
              {job.department} • {job.location} • {job.type.replace('_', ' ')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">Edit Job</Button>
          <form action={async () => {
            'use server';
            const prisma = (await import('@/lib/prisma')).default;
            const { revalidatePath } = await import('next/cache');
            await prisma.jobPosting.update({ where: { id: job.id }, data: { isActive: !job.isActive } });
            revalidatePath(`/admin/recruitment/${job.id}`);
            revalidatePath('/admin/recruitment');
          }}>
            <Button type="submit" variant={job.isActive ? 'outline' : 'lilac'} className={job.isActive ? 'text-red-600 border-red-200 hover:bg-red-50' : ''}>
              {job.isActive ? 'Deactivate Posting' : 'Reactivate Posting'}
            </Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider border-b border-[var(--color-silver)] pb-2">Description</h2>
            <p className="text-[14px] text-[var(--color-obsidian)] font-switzer whitespace-pre-wrap">{job.description}</p>
            
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider border-b border-[var(--color-silver)] pb-2 pt-4">Requirements</h2>
            <p className="text-[14px] text-[var(--color-obsidian)] font-switzer whitespace-pre-wrap">{job.requirements}</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-[var(--color-slate)]" />
              <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">
                Candidates ({job.applications.length})
              </h2>
            </div>
            
            {applicationsData.length > 0 ? (
              <DataTable 
                data={applicationsData}
                columns={[
                  { header: 'Applicant Name', accessorKey: 'name' },
                  { header: 'Experience', accessorKey: 'experience' },
                  { header: 'Applied On', accessorKey: 'appliedOn' },
                  { 
                    header: 'Status', 
                    accessorKey: 'status',
                    cell: (item) => <StatusBadge status={item.status.replace('_', ' ')} />
                  },
                  {
                    header: 'Action',
                    accessorKey: 'id',
                    cell: (item) => (
                      <Link href={`/admin/recruitment/applications/${item.id}`}>
                        <Button variant="outline" className="h-8 text-[12px] px-3">
                          Review
                        </Button>
                      </Link>
                    )
                  }
                ]}
              />
            ) : (
              <p className="text-[14px] text-[var(--color-slate)] font-switzer py-4">No candidates have applied for this position yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
