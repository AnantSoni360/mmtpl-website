'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const employeeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  employeeCode: z.string().min(2),
  department: z.string().min(2),
  designation: z.string().min(2),
  phone: z.string().min(10),
  joinDate: z.string()
});

export async function createEmployee(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  const parsed = employeeSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Invalid form data' };
  }

  const { name, email, password, employeeCode, department, designation, phone, joinDate } = parsed.data;

  // Check if email or code exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: 'Email already exists' };

  const existingCode = await prisma.employee.findUnique({ where: { employeeCode } });
  if (existingCode) return { error: 'Employee code already exists' };

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: 'EMPLOYEE',
      isActive: true,
      employee: {
        create: {
          employeeCode,
          department,
          designation,
          phone,
          joinDate: new Date(joinDate),
          employmentType: 'FULL_TIME'
        }
      }
    }
  });

  revalidatePath('/admin/employees');
  redirect('/admin/employees');
}

export async function updateEmployee(id: string, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  // We don't update password here, only details
  const name = data.name as string;
  const department = data.department as string;
  const designation = data.designation as string;
  const phone = data.phone as string;
  const isActive = data.isActive === 'on';

  const employee = await prisma.employee.findUnique({ where: { id }, include: { user: true } });
  if (!employee) return { error: 'Employee not found' };

  await prisma.user.update({
    where: { id: employee.userId },
    data: {
      name,
      isActive,
      employee: {
        update: {
          department,
          designation,
          phone
        }
      }
    }
  });

  revalidatePath('/admin/employees');
  revalidatePath(`/admin/employees/${id}`);
  return { success: true };
}
