import CareersClient from './CareersClient';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const metadata = {
  title: 'Careers | MMTPL',
  description: 'Build your career with MMTPL. We are looking for passionate individuals to join our team.',
};

export default async function CareersPage() {
  const user = await getCurrentUser();
  const isLoggedIn = !!user;

  const jobs = await prisma.jobPosting.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  return <CareersClient jobs={jobs} isLoggedIn={isLoggedIn} />;
}
