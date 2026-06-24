'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  companyName: z.string().min(2),
  gstin: z.string().optional(),
  address: z.string().optional(),
  contactPerson: z.string().optional()
});

export async function createClient(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  const parsed = clientSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Invalid form data' };
  }

  const { name, email, password, companyName, gstin, address, contactPerson } = parsed.data;

  // Check if email exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: 'Email already exists' };

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: 'CLIENT',
      isActive: true,
      client: {
        create: {
          companyName,
          gstin: gstin || null,
          address: address || null,
          contactPerson: contactPerson || null
        }
      }
    }
  });

  revalidatePath('/admin/clients');
  redirect('/admin/clients');
}
