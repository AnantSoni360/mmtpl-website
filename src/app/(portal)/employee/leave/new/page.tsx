import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { LeaveForm } from './LeaveForm';

export default async function EmployeeLeaveNewPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const employee = await prisma.employee.findUnique({ where: { userId: user.id } });
  if (!employee) return <div>Employee not found</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Apply for Leave</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Submit a new leave request for approval.</p>
      </div>

      <LeaveForm employeeId={employee.id} />
    </div>
  );
}
