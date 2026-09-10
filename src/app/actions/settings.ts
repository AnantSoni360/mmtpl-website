'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth';

export async function updateSettings(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');

  const keys = ['CompanyName', 'LogoURL', 'SupportEmail'];

  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value !== null && value !== undefined) {
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }
  }

  revalidatePath('/admin/settings');
}
