import prisma from '@/lib/prisma';
import { AssignForm } from './AssignForm';

export default async function AssignEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await prisma.project.findUnique({ where: { id } });
  const employeesData = await prisma.employee.findMany({ include: { user: true } });

  if (!project) return null;

  const employees = employeesData.map(e => ({
    id: e.id,
    name: e.user.name || 'Unnamed',
    department: e.department || 'N/A'
  }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Add Team Member</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Assign an employee to "{project.name}".</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <AssignForm projectId={id} employees={employees} />
      </div>
    </div>
  );
}
