'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function approveLeave(id: string) {
  const leave = await prisma.leaveRequest.findUnique({ where: { id }, include: { employee: { include: { user: true } } } });
  if (!leave) throw new Error('Leave request not found');

  await prisma.leaveRequest.update({
    where: { id },
    data: { status: 'APPROVED' }
  });

  // Mock sending email to employee
  console.log(`[Email Mock] Sent APPROVED email to ${leave.employee.user.email} for leave on ${leave.fromDate}`);

  revalidatePath('/admin/leave');
}

export async function rejectLeave(formData: FormData) {
  const id = formData.get('id') as string;
  const remark = formData.get('remark') as string;

  if (!id || !remark) throw new Error('Remark is required');

  const leave = await prisma.leaveRequest.findUnique({ where: { id }, include: { employee: { include: { user: true } } } });
  if (!leave) throw new Error('Leave not found');

  await prisma.leaveRequest.update({
    where: { id },
    data: { status: 'REJECTED', adminRemark: remark }
  });

  // Mock sending email to employee
  console.log(`[Email Mock] Sent REJECTED email to ${leave.employee.user.email} for leave on ${leave.fromDate}`);

  revalidatePath('/admin/leave');
  redirect('/admin/leave');
}

export async function applyForLeave(formData: FormData) {
  const employeeId = formData.get('employeeId') as string;
  const leaveType = formData.get('leaveType') as any;
  const fromDate = formData.get('fromDate') as string;
  const toDate = formData.get('toDate') as string;
  const reason = formData.get('reason') as string;

  if (!employeeId || !leaveType || !fromDate || !toDate || !reason) {
    return { error: 'All fields are required' };
  }

  await prisma.leaveRequest.create({
    data: {
      employeeId,
      leaveType,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      reason,
      status: 'PENDING'
    }
  });

  revalidatePath('/employee/leave');
  revalidatePath('/employee');
  redirect('/employee/leave');
}
