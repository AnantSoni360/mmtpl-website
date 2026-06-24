import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { format } from 'date-fns';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date');
  const selectedDate = dateStr ? new Date(dateStr) : new Date();

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const attendances = await prisma.attendance.findMany({
    where: {
      date: { gte: startOfDay, lte: endOfDay }
    },
    include: {
      employee: { include: { user: true } }
    },
    orderBy: { employee: { employeeCode: 'asc' } }
  });

  const header = ['Employee Code', 'Name', 'Department', 'Date', 'Status', 'Check In', 'Check Out', 'Hours Worked'];
  
  const rows = attendances.map(att => [
    att.employee.employeeCode,
    att.employee.user.name || '',
    att.employee.department,
    format(new Date(att.date), 'yyyy-MM-dd'),
    att.status,
    att.checkIn ? format(new Date(att.checkIn), 'HH:mm:ss') : '',
    att.checkOut ? format(new Date(att.checkOut), 'HH:mm:ss') : '',
    att.hoursWorked ? att.hoursWorked.toFixed(2) : ''
  ]);

  const csvContent = [
    header.join(','),
    ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="attendance-${format(selectedDate, 'yyyy-MM-dd')}.csv"`
    }
  });
}
