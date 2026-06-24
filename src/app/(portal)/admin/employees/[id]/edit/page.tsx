import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { EditEmployeeForm } from '@/components/portal/employees/EditEmployeeForm';

export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { user: true }
  });

  if (!employee) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Edit Employee</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Update employee details and status.</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <EditEmployeeForm id={employee.id} initialData={employee} />
      </div>
    </div>
  );
}
