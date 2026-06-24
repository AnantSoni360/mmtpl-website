'use client';

import { Button } from '@/components/ui/Button';
import { assignEmployeeToProject } from '@/app/actions/project';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface AssignFormProps {
  projectId: string;
  employees: { id: string; name: string; department: string }[];
}

export function AssignForm({ projectId, employees }: AssignFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await assignEmployeeToProject(projectId, formData);
      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
      } else {
        toast.success('Employee assigned successfully');
        // Action handles redirect
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Employee</label>
          <select name="employeeId" required className={inputClass}>
            <option value="">Select an employee...</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>{e.name} ({e.department})</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Role on Project</label>
          <input name="roleOnProject" placeholder="e.g. Lead Engineer" required className={inputClass} />
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)]">
        <Button type="button" variant="outline" onClick={() => router.push(`/admin/projects/${projectId}?tab=overview`)} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="lilac" disabled={loading}>
          {loading ? 'Assigning...' : 'Assign Employee'}
        </Button>
      </div>
    </form>
  );
}
