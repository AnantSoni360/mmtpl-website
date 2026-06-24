import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import { AttendanceToolbar } from '@/components/portal/attendance/AttendanceToolbar';

export default async function AttendancePage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedDate = resolvedSearchParams.date ? new Date(resolvedSearchParams.date) : new Date();
  
  // Start of day and end of day for querying
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const attendances = await prisma.attendance.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      }
    },
    include: {
      employee: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      employee: {
        employeeCode: 'asc'
      }
    }
  });

  const tableData = attendances.map(att => ({
    id: att.id,
    empCode: att.employee.employeeCode,
    name: att.employee.user.name || 'N/A',
    department: att.employee.department,
    checkIn: att.checkIn ? format(new Date(att.checkIn), 'hh:mm a') : '--:--',
    checkOut: att.checkOut ? format(new Date(att.checkOut), 'hh:mm a') : '--:--',
    status: att.status,
    hoursWorked: att.hoursWorked ? `${att.hoursWorked.toFixed(1)} hrs` : '--'
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Attendance</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">
            Viewing records for {format(selectedDate, 'dd MMMM yyyy')}
          </p>
        </div>
        <AttendanceToolbar initialDate={format(selectedDate, 'yyyy-MM-dd')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[var(--color-paper)] p-4 rounded-[12px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-control)] flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-1">Total Present</p>
            <p className="text-2xl font-semibold text-[var(--color-obsidian)] font-switzer leading-none">
              {attendances.filter(a => a.status === 'PRESENT').length}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
        <div className="bg-[var(--color-paper)] p-4 rounded-[12px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-control)] flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-1">On Leave</p>
            <p className="text-2xl font-semibold text-[var(--color-obsidian)] font-switzer leading-none">
              {attendances.filter(a => a.status === 'LEAVE').length}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
        </div>
        <div className="bg-[var(--color-paper)] p-4 rounded-[12px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-control)] flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-1">Absent</p>
            <p className="text-2xl font-semibold text-[var(--color-obsidian)] font-switzer leading-none">
              {attendances.filter(a => a.status === 'ABSENT').length}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-red-500" />
          </div>
        </div>
        <div className="bg-[var(--color-paper)] p-4 rounded-[12px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-control)] flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-1">Half Day</p>
            <p className="text-2xl font-semibold text-[var(--color-obsidian)] font-switzer leading-none">
              {attendances.filter(a => a.status === 'HALF_DAY').length}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
          </div>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Emp Code', accessorKey: 'empCode' },
          { header: 'Name', accessorKey: 'name' },
          { header: 'Department', accessorKey: 'department' },
          { header: 'Check In', accessorKey: 'checkIn' },
          { header: 'Check Out', accessorKey: 'checkOut' },
          { header: 'Hours', accessorKey: 'hoursWorked' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status} />
          }
        ]}
      />
    </div>
  );
}
