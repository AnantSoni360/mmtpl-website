import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Check, X, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function LeaveManagementPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || '1', 10));
  const take = 20;
  const skip = (pageNum - 1) * take;

  const [pendingLeaves, totalCount] = await Promise.all([
    prisma.leaveRequest.findMany({
      where: { status: 'PENDING' },
      include: {
        employee: {
          include: {
            user: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take,
      skip
    }),
    prisma.leaveRequest.count({ where: { status: 'PENDING' } })
  ]);
  
  const totalPages = Math.ceil(totalCount / take);

  const tableData = pendingLeaves.map(leave => ({
    id: leave.id,
    empCode: leave.employee.employeeCode,
    name: leave.employee.user.name || 'N/A',
    leaveType: leave.leaveType,
    dates: `${format(new Date(leave.fromDate), 'dd MMM')} - ${format(new Date(leave.toDate), 'dd MMM yyyy')}`,
    reason: leave.reason,
    status: leave.status,
    appliedOn: format(new Date(leave.createdAt), 'dd MMM yyyy')
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Leave Management</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">
            Review and manage employee leave requests.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/admin/leave/calendar">
            <Button variant="outline" className="h-[40px]">
              <CalendarIcon size={16} className="mr-2" />
              Leave Calendar
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4">Pending Requests Queue ({pendingLeaves.length})</h2>
        
        <DataTable 
          data={tableData}
          columns={[
            { header: 'Emp Code', accessorKey: 'empCode' },
            { header: 'Name', accessorKey: 'name' },
            { 
              header: 'Type', 
              accessorKey: 'leaveType',
              cell: (item) => <span className="capitalize">{item.leaveType.toLowerCase()}</span>
            },
            { header: 'Dates', accessorKey: 'dates' },
            { 
              header: 'Reason', 
              accessorKey: 'reason',
              cell: (item) => <span className="max-w-[200px] truncate block" title={item.reason}>{item.reason}</span>
            },
            { header: 'Applied', accessorKey: 'appliedOn' },
            { 
              header: 'Action', 
              accessorKey: 'id',
              cell: (item) => (
                <div className="flex gap-2">
                  <form action={async () => {
                    'use server';
                    const { approveLeave } = await import('@/app/actions/leave');
                    await approveLeave(item.id);
                  }}>
                    <button type="submit" className="w-8 h-8 rounded-md bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors border border-green-200" title="Approve">
                      <Check size={14} />
                    </button>
                  </form>
                  <Link href={`/admin/leave/${item.id}/reject`}>
                    <button className="w-8 h-8 rounded-md bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors border border-red-200" title="Reject">
                      <X size={14} />
                    </button>
                  </Link>
                </div>
              )
            }
          ]}
          pagination={{ page: pageNum, totalPages }}
        />
      </div>
      
      {/* Leave Balances Placeholder */}
      <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4">Employee Leave Balances</h2>
        <div className="flex items-center justify-center h-32 bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-lg">
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Select an employee to view leave balances</p>
        </div>
      </div>
    </div>
  );
}
