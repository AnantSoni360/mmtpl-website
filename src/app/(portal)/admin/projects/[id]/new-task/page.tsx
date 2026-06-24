import prisma from '@/lib/prisma';
import { TaskForm } from './TaskForm';

export default async function NewTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await prisma.project.findUnique({ 
    where: { id },
    include: {
      assignments: { include: { employee: { include: { user: true } } } }
    }
  });

  if (!project) return null;

  const assignees = project.assignments.map(a => ({
    id: a.employee.userId,
    name: a.employee.user.name || 'Unnamed'
  }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Create Task</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Add a new task to "{project.name}".</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <TaskForm projectId={id} assignees={assignees} />
      </div>
    </div>
  );
}
