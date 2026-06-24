import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

export default async function JobApplicationsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'JOB_SEEKER') redirect('/auth/login');

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: user.id }
  });

  if (!jobSeeker) return <div>Job Seeker profile not found.</div>;

  const applications = await prisma.jobApplication.findMany({
    where: { jobSeekerId: jobSeeker.id },
    include: { jobPosting: true },
    orderBy: { createdAt: 'desc' }
  });

  const tableData = applications.map(app => ({
    id: app.id,
    position: app.jobPosting ? app.jobPosting.title : app.position,
    department: app.jobPosting ? app.jobPosting.department : 'General Application',
    dateApplied: format(new Date(app.createdAt), 'dd MMM yyyy'),
    status: app.status
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">My Applications</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Track the status of your submitted job applications.</p>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Position', accessorKey: 'position' },
          { header: 'Department', accessorKey: 'department' },
          { header: 'Date Applied', accessorKey: 'dateApplied' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status} variant={
              item.status === 'HIRED' ? 'success' : 
              item.status === 'REJECTED' ? 'error' : 
              item.status === 'SHORTLISTED' || item.status === 'INTERVIEW_SCHEDULED' ? 'warning' : 'default'
            } />
          }
        ]}
      />
    </div>
  );
}
