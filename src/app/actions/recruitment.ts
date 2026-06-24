'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { JobType, ApplicationStatus } from '@prisma/client';

export async function createJobPosting(formData: FormData) {
  const title = formData.get('title') as string;
  const department = formData.get('department') as string;
  const location = formData.get('location') as string;
  const type = formData.get('type') as JobType;
  const description = formData.get('description') as string;
  const requirements = formData.get('requirements') as string;
  const isActive = formData.get('isActive') === 'on';

  if (!title || !department || !location) {
    throw new Error('Missing required fields');
  }

  await prisma.jobPosting.create({
    data: {
      title,
      department,
      location,
      experience: formData.get('experience') as string || 'Not specified',
      type: type || 'FULL_TIME',
      description,
      requirements: requirements.split('\\n').map(req => req.trim()).filter(Boolean),
      isActive
    }
  });

  revalidatePath('/admin/recruitment');
  redirect('/admin/recruitment');
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const app = await prisma.jobApplication.findUnique({ where: { id }, include: { jobPosting: true } });
  if (!app) throw new Error('Application not found');

  await prisma.jobApplication.update({
    where: { id },
    data: { status }
  });

  if (status === 'INTERVIEW_SCHEDULED') {
    // "Schedule interview action sends automated email to candidate with details"
    console.log(`[Email Mock] Sent INTERVIEW_SCHEDULED email to ${app.email} for position ${app.jobPosting?.title || app.position}`);
  }

  revalidatePath('/admin/recruitment');
  revalidatePath(`/admin/recruitment/applications/${id}`);
}
