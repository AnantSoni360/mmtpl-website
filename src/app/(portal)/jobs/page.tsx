import prisma from '@/lib/prisma';
import JobsPortalClient from './JobsPortalClient';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function JobsPortalPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'JOB_SEEKER') redirect('/auth/login');

  const jobs = await prisma.jobPosting.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return <JobsPortalClient jobs={jobs} />;
}
