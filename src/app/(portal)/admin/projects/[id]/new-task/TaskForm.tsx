'use client';

import { Button } from '@/components/ui/Button';
import { createTask } from '@/app/actions/task';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskSchema, type TaskInput } from '@/lib/validations';

interface TaskFormProps {
  projectId: string;
  assignees: { id: string; name: string }[];
}

export function TaskForm({ projectId, assignees }: TaskFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<TaskInput>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      priority: 'MEDIUM',
    }
  });

  const onSubmit = async (data: TaskInput) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value as string);
    });

    try {
      const result = await createTask(projectId, formData);
      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
      } else {
        toast.success('Task created successfully');
        // Action handles redirect
      }
    } catch (e) {
      toast.error('An unexpected error occurred');
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]";
  const errorClass = "text-red-500 text-xs mt-1 block";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Task Title</label>
          <input {...register('title')} className={inputClass} />
          {errors.title && <span className={errorClass}>{errors.title.message}</span>}
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Description (Optional)</label>
          <textarea rows={3} {...register('description')} className={inputClass} />
          {errors.description && <span className={errorClass}>{errors.description.message}</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Assign To</label>
            <select {...register('assignedToId')} className={inputClass}>
              <option value="">Select Assignee...</option>
              {assignees.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            {errors.assignedToId && <span className={errorClass}>{errors.assignedToId.message}</span>}
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Priority</label>
            <select {...register('priority')} className={inputClass}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
            {errors.priority && <span className={errorClass}>{errors.priority.message}</span>}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Due Date (Optional)</label>
          <input type="date" {...register('dueDate')} className={inputClass} />
          {errors.dueDate && <span className={errorClass}>{errors.dueDate.message}</span>}
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)]">
        <Button type="button" variant="outline" onClick={() => router.push(`/admin/projects/${projectId}`)} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="lilac" disabled={loading}>
          {loading ? 'Creating...' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}
