'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { AttendanceStatus } from '@prisma/client';

export async function correctAttendance(formData: FormData) {
  const employeeId = formData.get('employeeId') as string;
  const dateStr = formData.get('date') as string;
  const status = formData.get('status') as AttendanceStatus;
  const checkIn = formData.get('checkIn') as string;
  const checkOut = formData.get('checkOut') as string;

  if (!employeeId || !dateStr || !status) return { error: 'Missing required fields' };

  const date = new Date(dateStr);
  date.setHours(12, 0, 0, 0); // avoid timezone issues by setting mid-day

  let checkInDate = null;
  let checkOutDate = null;
  let hoursWorked = null;

  if (checkIn) {
    const [hours, minutes] = checkIn.split(':');
    checkInDate = new Date(date);
    checkInDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  }

  if (checkOut) {
    const [hours, minutes] = checkOut.split(':');
    checkOutDate = new Date(date);
    checkOutDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  }

  if (checkInDate && checkOutDate) {
    hoursWorked = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60);
  }

  // Upsert attendance
  const startOfDay = new Date(dateStr);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(dateStr);
  endOfDay.setHours(23, 59, 59, 999);

  const existing = await prisma.attendance.findFirst({
    where: {
      employeeId,
      date: { gte: startOfDay, lte: endOfDay }
    }
  });

  if (existing) {
    await prisma.attendance.update({
      where: { id: existing.id },
      data: { status, checkIn: checkInDate, checkOut: checkOutDate, hoursWorked }
    });
  } else {
    await prisma.attendance.create({
      data: {
        employeeId,
        date,
        status,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        hoursWorked
      }
    });
  }

  revalidatePath('/admin/attendance');
  return { success: true };
}
