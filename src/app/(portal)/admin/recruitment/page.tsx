import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Plus, Users, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function AdminRecruitmentPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || '1', 10));
  const take = 20;
  const skip = (pageNum - 1) * take;

  const [postings, applications, totalAppsCount] = await Promise.all([
    prisma.jobPosting.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { applications: true } }
      }
    }),
    prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: { jobPosting: true },
      take,
      skip
    }),
    prisma.jobApplication.count()
  ]);

  const totalPages = Math.ceil(totalAppsCount / take);

  const postingsData = postings.map(post => ({
    id: post.id,
    title: post.title,
    department: post.department,
    location: post.location,
    type: post.type.replace('_', ' '),
    applicants: post._count.applications,
    status: post.isActive ? 'ACTIVE' : 'CLOSED'
  }));

  const applicationsData = applications.map(app => ({
    id: app.id,
    name: app.name,
    position: app.jobPosting?.title || app.position,
    experience: app.experience,
    appliedOn: format(new Date(app.createdAt), 'dd MMM yyyy'),
    status: app.status
  }));

  return (
    <div className="space-y-10">
      {/* Active Job Postings Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Recruitment</h1>
            <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage job postings and review applicants.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/admin/recruitment/new">
              <Button variant="lilac" className="h-[40px]">
                <Plus size={16} />
                New Job Posting
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={18} className="text-[var(--color-slate)]" />
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">
              Job Postings
            </h2>
          </div>
          
          <DataTable 
            data={postingsData}
            columns={[
              { header: 'Title', accessorKey: 'title' },
              { header: 'Department', accessorKey: 'department' },
              { header: 'Location', accessorKey: 'location' },
              { header: 'Type', accessorKey: 'type' },
              { 
                header: 'Applicants', 
                accessorKey: 'applicants',
                cell: (item) => <span className="font-medium">{item.applicants}</span>
              },
              { 
                header: 'Status', 
                accessorKey: 'status',
                cell: (item) => <StatusBadge status={item.status} variant={item.status === 'ACTIVE' ? 'success' : 'default'} />
              },
              {
                header: 'Action',
                accessorKey: 'id',
                cell: (item) => (
                  <Link href={`/admin/recruitment/${item.id}`}>
                    <Button variant="outline" className="h-8 text-[12px] px-3">
                      Manage
                    </Button>
                  </Link>
                )
              }
            ]}
          />
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="space-y-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} className="text-[var(--color-slate)]" />
            <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider">
              Recent Applications
            </h2>
          </div>
          
          <DataTable 
            data={applicationsData}
            columns={[
              { header: 'Applicant Name', accessorKey: 'name' },
              { header: 'Position', accessorKey: 'position' },
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
            pagination={{ page: pageNum, totalPages }}
          />
        </div>
      </div>

    </div>
  );
}
