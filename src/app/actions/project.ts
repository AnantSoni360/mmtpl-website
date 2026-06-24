'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ProjectStatus } from '@prisma/client';

const projectSchema = z.object({
  clientId: z.string().cuid(),
  name: z.string().min(2),
  location: z.string().optional(),
  scope: z.string().optional(),
  valueCr: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  category: z.string().optional(),
  status: z.nativeEnum(ProjectStatus).optional(),
});

export async function createProject(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Invalid form data' };
  }

  const { clientId, name, location, scope, valueCr, startDate, endDate, category, status } = parsed.data;

  // Generate project code
  const currentYear = new Date().getFullYear();
  const countThisYear = await prisma.project.count({
    where: {
      createdAt: {
        gte: new Date(`${currentYear}-01-01`),
        lte: new Date(`${currentYear}-12-31`)
      }
    }
  });
  const projectCode = `MMTPL-${currentYear}-${String(countThisYear + 1).padStart(3, '0')}`;

  const project = await prisma.project.create({
    data: {
      projectCode,
      clientId,
      name,
      location: location || null,
      scope: scope || null,
      valueCr: valueCr ? parseFloat(valueCr) : null,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      category: category || null,
      status: status || 'PLANNING',
    }
  });

  revalidatePath('/admin/projects');
  redirect(`/admin/projects/${project.id}`);
}

export async function assignEmployeeToProject(projectId: string, formData: FormData) {
  const employeeId = formData.get('employeeId') as string;
  const roleOnProject = formData.get('roleOnProject') as string;

  if (!employeeId || !roleOnProject) return { error: 'Missing fields' };

  await prisma.projectAssignment.create({
    data: {
      projectId,
      employeeId,
      roleOnProject,
      assignedFrom: new Date()
    }
  });

  revalidatePath(`/admin/projects/${projectId}`);
  redirect(`/admin/projects/${projectId}?tab=overview`);
}
