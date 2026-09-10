import prisma from '@/lib/prisma';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { format, startOfMonth, endOfMonth, subMonths, isBefore, addDays } from 'date-fns';
import { DataTable } from '@/components/portal/tables/DataTable';
import { RevenueChart } from '@/components/portal/reports/RevenueChart';

export default async function AdminReportsPage({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const { month } = await searchParams;
  
  // Use selected month or current month
  const targetDate = month ? new Date(month) : new Date();
  const start = startOfMonth(targetDate);
  const end = endOfMonth(targetDate);

  // Financial Summary from Invoices
  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: { gte: start, lte: end }
    }
  });

  const revenue = invoices.filter(i => i.status === 'PAID').reduce((sum, i) => sum + i.total, 0);
  const pending = invoices.filter(i => i.status === 'SENT' || i.status === 'OVERDUE').reduce((sum, i) => sum + i.total, 0);
  const expenses = 0; // Placeholder as requested

  // Revenue Chart Data (Last 6 months)
  const revenueChartData = [];
  for (let i = 5; i >= 0; i--) {
    const d = subMonths(new Date(), i);
    const mStart = startOfMonth(d);
    const mEnd = endOfMonth(d);
    
    const monthlyInvoices = await prisma.invoice.findMany({
      where: {
        createdAt: { gte: mStart, lte: mEnd },
        status: 'PAID'
      }
    });
    
    revenueChartData.push({
      name: format(d, 'MMM'),
      revenue: monthlyInvoices.reduce((sum, inv) => sum + inv.total, 0)
    });
  }

  // Invoice Aging
  const now = new Date();
  const weekFromNow = addDays(now, 7);
  const monthFromNow = addDays(now, 30);
  
  const unpaidInvoices = await prisma.invoice.findMany({
    where: { status: { in: ['SENT', 'OVERDUE'] } },
    include: { client: true }
  });

  const overdueInvoices = unpaidInvoices.filter(i => isBefore(new Date(i.dueDate), now));
  const dueThisWeek = unpaidInvoices.filter(i => !isBefore(new Date(i.dueDate), now) && isBefore(new Date(i.dueDate), weekFromNow));
  const dueThisMonth = unpaidInvoices.filter(i => !isBefore(new Date(i.dueDate), weekFromNow) && isBefore(new Date(i.dueDate), monthFromNow));

  const agingData = [
    ...overdueInvoices.map(i => ({ ...i, agingStatus: 'Overdue' })),
    ...dueThisWeek.map(i => ({ ...i, agingStatus: 'Due This Week' })),
    ...dueThisMonth.map(i => ({ ...i, agingStatus: 'Due This Month' }))
  ];

  // Attendance Summary
  const attendanceRecords = await prisma.attendance.findMany({
    where: {
      date: { gte: start, lte: end }
    },
    include: {
      employee: {
        include: { user: true }
      }
    }
  });

  // Group attendance by employee
  const employeeAttendance = new Map<string, { name: string, present: number, absent: number, leave: number }>();
  
  attendanceRecords.forEach(record => {
    const empId = record.employeeId;
    if (!employeeAttendance.has(empId)) {
      employeeAttendance.set(empId, {
        name: record.employee.user.name || 'Unknown',
        present: 0,
        absent: 0,
        leave: 0
      });
    }
    const stats = employeeAttendance.get(empId)!;
    if (record.status === 'PRESENT' || record.status === 'HALF_DAY') stats.present++;
    else if (record.status === 'ABSENT') stats.absent++;
    else if (record.status === 'LEAVE') stats.leave++;
  });

  const tableData = Array.from(employeeAttendance.values());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Reports & Analytics</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Overview of company performance and metrics for {format(start, 'MMMM yyyy')}.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <form method="GET" className="flex items-center gap-2">
            <input 
              type="month" 
              name="month" 
              defaultValue={format(start, 'yyyy-MM')}
              onChange={(e) => e.target.form?.submit()}
              className="bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]"
            />
          </form>
          <Button variant="outline" className="h-[40px]" asChild>
            <a href="/api/admin/reports/export?type=revenue" download>
              <Download size={16} className="mr-2" />
              Export Revenue CSV
            </a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Revenue (Paid)</p>
          <p className="text-3xl font-semibold text-[var(--color-obsidian)] font-switzer">₹{revenue.toLocaleString()}</p>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Pending (Sent/Overdue)</p>
          <p className="text-3xl font-semibold text-yellow-600 font-switzer">₹{pending.toLocaleString()}</p>
        </div>
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <p className="text-[12px] text-[var(--color-slate)] font-switzer uppercase tracking-wider mb-2">Expenses</p>
          <p className="text-3xl font-semibold text-red-600 font-switzer">₹{expenses.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-4">
        <h3 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Attendance Summary</h3>
        <DataTable 
          data={tableData}
          columns={[
            { header: 'Employee', accessorKey: 'name' },
            { header: 'Days Present', accessorKey: 'present' },
            { header: 'Days Absent', accessorKey: 'absent' },
            { header: 'Days on Leave', accessorKey: 'leave' },
            {
              header: 'Total Working Days',
              accessorKey: 'name', // Dummy key
              cell: (item) => <span className="font-medium">{item.present + item.absent + item.leave}</span>
            }
          ]}
        />
        {tableData.length === 0 && (
          <p className="text-[13px] text-[var(--color-slate)] font-switzer text-center py-4">No attendance records found for this month.</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <h3 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-6">Project Revenue (Last 6 Months)</h3>
          <RevenueChart data={revenueChartData} />
        </div>

        <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
          <h3 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4">Invoice Aging</h3>
          <div className="space-y-4">
            <DataTable 
              data={agingData}
              columns={[
                { header: 'Invoice #', accessorKey: 'invoiceNumber' },
                { header: 'Client', accessorKey: 'client', cell: (item) => item.client.companyName },
                { 
                  header: 'Status', 
                  accessorKey: 'agingStatus',
                  cell: (item) => (
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      item.agingStatus === 'Overdue' ? 'bg-red-100 text-red-700' :
                      item.agingStatus === 'Due This Week' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.agingStatus}
                    </span>
                  )
                },
                { header: 'Amount', accessorKey: 'total', cell: (item) => `₹${item.total.toLocaleString()}` }
              ]}
            />
            {agingData.length === 0 && (
              <p className="text-[13px] text-[var(--color-slate)] font-switzer text-center py-4">No pending or overdue invoices.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
