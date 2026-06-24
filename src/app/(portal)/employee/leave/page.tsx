import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function EmployeeLeavePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const employee = await prisma.employee.findUnique({
    where: { userId: user.id }
  });

  if (!employee) return <div>Employee not found.</div>;

  const leaves = await prisma.leaveRequest.findMany({
    where: { employeeId: employee.id },
    orderBy: { createdAt: 'desc' }
  });

  const tableData = leaves.map(leave => ({
    id: leave.id,
    type: leave.leaveType,
    fromDate: format(new Date(leave.fromDate), 'dd MMM yyyy'),
    toDate: format(new Date(leave.toDate), 'dd MMM yyyy'),
    reason: leave.reason,
    status: leave.status,
    appliedOn: format(new Date(leave.createdAt), 'dd MMM yyyy')
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">My Leave Requests</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Track and manage your time off.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/employee/leave/new">
            <Button variant="lilac" className="h-[40px]">
              <Plus size={16} className="mr-2" />
              Apply for Leave
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Casual Leave</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">10</p>
            <p className="text-[13px] text-[var(--color-slate)] mb-1">days remaining</p>
          </div>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Medical Leave</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">5</p>
            <p className="text-[13px] text-[var(--color-slate)] mb-1">days remaining</p>
          </div>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Earned Leave</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">12</p>
            <p className="text-[13px] text-[var(--color-slate)] mb-1">days remaining</p>
          </div>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Type', accessorKey: 'type' },
          { header: 'From Date', accessorKey: 'fromDate' },
          { header: 'To Date', accessorKey: 'toDate' },
          { header: 'Applied On', accessorKey: 'appliedOn' },
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
