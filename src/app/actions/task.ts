'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { TaskStatus, TaskPriority } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth';

export async function createTask(projectId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const assignedToId = formData.get('assignedToId') as string;
  const priority = formData.get('priority') as TaskPriority;
  const dueDate = formData.get('dueDate') as string;

  if (!title) return { error: 'Title is required' };

  const user = await getCurrentUser();
  if (!user) return { error: 'Unauthorized' };

  await prisma.task.create({
    data: {
      projectId,
      title,
      description: description || null,
      createdById: user.id,
      assignedToId: assignedToId || null,
      priority: priority || 'MEDIUM',
      dueDate: dueDate ? new Date(dueDate) : null,
      status: 'PENDING'
    }
  });

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath('/admin/tasks');
  redirect(`/admin/projects/${projectId}?tab=tasks`);
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  await prisma.task.update({
    where: { id: taskId },
    data: { status }
  });

  revalidatePath('/admin/tasks');
  return { success: true };
}
