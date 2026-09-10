import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { StatusBadge } from '@/components/portal/shared/StatusBadge';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';

export default async function EmployeeTaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const task = await prisma.task.findUnique({
    where: { id, assignedToId: user.id },
    include: { project: true }
  });

  if (!task) return <div>Task not found or unauthorized.</div>;

  async function updateStatus(formData: FormData) {
    'use server';
    const newStatus = formData.get('status') as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    await prisma.task.update({
      where: { id },
      data: { status: newStatus }
    });
    revalidatePath(`/employee/tasks/${id}`);
    revalidatePath('/employee/tasks');
    revalidatePath('/employee');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Task Details</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage this task and update its progress.</p>
        </div>
      </div>

      <div className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--color-obsidian)] font-switzer mb-2">{task.title}</h2>
          <div className="flex gap-2">
            <StatusBadge 
              status={task.priority} 
              variant={task.priority === 'HIGH' || task.priority === 'URGENT' ? 'error' : task.priority === 'MEDIUM' ? 'warning' : 'info'} 
            />
            <StatusBadge status={task.status.replace('_', ' ')} />
          </div>
        </div>

        <div>
          <h3 className="text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Description</h3>
          <p className="text-[14px] text-[var(--color-slate)] font-switzer whitespace-pre-wrap">
            {task.description || 'No description provided.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[12px] p-4">
          <div>
            <p className="text-[12px] text-[var(--color-slate)] font-switzer mb-1">Project</p>
            <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">{task.project?.name || 'Internal'}</p>
          </div>
          <div>
            <p className="text-[12px] text-[var(--color-slate)] font-switzer mb-1">Due Date</p>
            <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">
              {task.dueDate ? format(new Date(task.dueDate), 'dd MMM yyyy') : 'No Date'}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-silver)]">
          <h3 className="text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4">Update Status</h3>
          <form action={updateStatus} className="flex gap-3">
            <select name="status" defaultValue={task.status} className="bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]">
              <option value="PENDING">PENDING</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
            <Button type="submit" variant="lilac">Save Status</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
