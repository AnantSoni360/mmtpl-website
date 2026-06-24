'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deactivateEmployee(id: string) {
  const employee = await prisma.employee.findUnique({ where: { id }, select: { userId: true } });
  if (!employee) throw new Error('Employee not found');

  await prisma.user.update({
    where: { id: employee.userId },
    data: { isActive: false }
  });

  revalidatePath('/admin/employees');
  revalidatePath(`/admin/employees/${id}`);
}
