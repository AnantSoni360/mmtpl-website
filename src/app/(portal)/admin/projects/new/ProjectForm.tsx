'use client';

import { Button } from '@/components/ui/Button';
import { createProject } from '@/app/actions/project';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectSchema, type ProjectInput } from '@/lib/validations';

interface ProjectFormProps {
  clients: { id: string; companyName: string }[];
  defaultName?: string;
  defaultScope?: string;
}

export function ProjectForm({ clients, defaultName = '', defaultScope = '' }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectInput>({
    resolver: zodResolver(ProjectSchema) as any,
    defaultValues: {
      name: defaultName,
      description: defaultScope,
      status: 'PLANNING'
    }
  });

  const onSubmit = async (data: ProjectInput) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value as string);
    });

    try {
      const result = await createProject(formData);
      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
      } else {
        toast.success('Project created successfully');
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Project Name</label>
          <input {...register('name')} className={inputClass} />
          {errors.name && <span className={errorClass}>{errors.name.message}</span>}
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Client</label>
          <select {...register('clientId')} className={inputClass}>
            <option value="">Select a client...</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.companyName}</option>
            ))}
          </select>
          {errors.clientId && <span className={errorClass}>{errors.clientId.message}</span>}
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Scope of Work</label>
          <textarea rows={3} {...register('description')} className={inputClass} />
          {errors.description && <span className={errorClass}>{errors.description.message}</span>}
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Start Date</label>
          <input type="date" {...register('startDate')} className={inputClass} />
          {errors.startDate && <span className={errorClass}>{errors.startDate.message}</span>}
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">End Date (Optional)</label>
          <input type="date" {...register('endDate')} className={inputClass} />
          {errors.endDate && <span className={errorClass}>{errors.endDate.message}</span>}
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Budget (Value Cr)</label>
          <input type="number" step="0.01" {...register('budget', { valueAsNumber: true })} className={inputClass} placeholder="e.g. 5.50" />
          {errors.budget && <span className={errorClass}>{errors.budget.message}</span>}
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Status</label>
          <select {...register('status')} className={inputClass}>
            <option value="PLANNING">Planning</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="COMPLETED">Completed</option>
          </select>
          {errors.status && <span className={errorClass}>{errors.status.message}</span>}
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)] mt-8">
        <Button type="button" variant="outline" onClick={() => router.push('/admin/projects')} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="lilac" disabled={loading}>
          {loading ? 'Creating...' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}
