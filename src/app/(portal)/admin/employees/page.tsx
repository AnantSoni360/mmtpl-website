import { DataTable } from '@/components/portal/tables/DataTable';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function EmployeesPage({ searchParams }: { searchParams: Promise<{ q?: string, dept?: string, page?: string }> }) {
  const { q = '', dept = '', page = '1' } = await searchParams;
  const query = q;
  const pageNum = Math.max(1, parseInt(page, 10));
  const take = 20;
  const skip = (pageNum - 1) * take;

  const whereClause = {
    AND: [
      query ? {
        OR: [
          { employeeCode: { contains: query, mode: 'insensitive' as any } },
          { user: { name: { contains: query, mode: 'insensitive' as any } } },
          { user: { email: { contains: query, mode: 'insensitive' as any } } }
        ]
      } : {},
      dept ? { department: dept } : {}
    ]
  };

  const [employees, totalCount] = await Promise.all([
    prisma.employee.findMany({
      where: whereClause,
      include: {
        user: true,
      },
      orderBy: { employeeCode: 'asc' },
      take,
      skip
    }),
    prisma.employee.count({ where: whereClause })
  ]);
  
  const totalPages = Math.ceil(totalCount / take);

  const allDepts = await prisma.employee.findMany({
    select: { department: true },
    distinct: ['department']
  });

  // Prepare data for table
  const tableData = employees.map(emp => ({
    id: emp.id,
    code: emp.employeeCode,
    name: emp.user.name || 'N/A',
    email: emp.user.email,
    department: emp.department,
    designation: emp.designation,
    joinDate: format(new Date(emp.joinDate), 'dd MMM yyyy'),
    status: emp.user.isActive ? 'Active' : 'Inactive'
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Employees</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage company staff and their roles.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <form className="flex items-center gap-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
              <input 
                type="text" 
                name="q"
                defaultValue={query}
                placeholder="Search employees..." 
                className="pl-9 pr-4 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-full sm:w-[200px]"
              />
            </div>
            <select 
              name="dept" 
              defaultValue={dept}
              className="px-3 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors"
            >
              <option value="">All Depts</option>
              {allDepts.map(d => (
                <option key={d.department} value={d.department}>{d.department}</option>
              ))}
            </select>
            <Button type="submit" variant="outline" className="h-[40px] px-4">Filter</Button>
          </form>
          <Link href="/admin/employees/new">
            <Button variant="lilac" className="h-[40px]">
              <Plus size={16} />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'Code', accessorKey: 'code' },
          { header: 'Name', accessorKey: 'name' },
          { header: 'Department', accessorKey: 'department' },
          { header: 'Designation', accessorKey: 'designation' },
          { header: 'Join Date', accessorKey: 'joinDate' },
          { 
            header: 'Status', 
            accessorKey: 'status',
            cell: (item) => <StatusBadge status={item.status} variant={item.status === 'Active' ? 'success' : 'default'} />
          },
          {
            header: 'Action',
            accessorKey: 'id',
            cell: (item) => (
              <Link href={`/admin/employees/${item.id}`} className="text-[var(--color-slate)] hover:text-[var(--color-obsidian)] underline text-[13px]">
                View Profile
              </Link>
            )
          }
        ]}
        pagination={{ page: pageNum, totalPages }}
      />
    </div>
  );
}
