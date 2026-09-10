'use client';

import { Button } from '@/components/ui/Button';
import { updateEmployee } from '@/app/actions/employee';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function EditEmployeeForm({ id, initialData }: { id: string, initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateEmployee(id, formData);
    
    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success('Employee updated successfully');
      router.push(`/admin/employees/${id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Full Name</label>
          <input name="name" defaultValue={initialData.user.name} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Department</label>
          <input name="department" defaultValue={initialData.department} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Designation</label>
          <input name="designation" defaultValue={initialData.designation} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
        </div>
        <div className="space-y-2">
          <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Phone Number</label>
          <input name="phone" defaultValue={initialData.phone || ''} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
        </div>
        <div className="space-y-2 flex items-center gap-3 mt-4">
          <input type="checkbox" name="isActive" defaultChecked={initialData.user.isActive} className="w-4 h-4 rounded border-[var(--color-silver)] text-[var(--color-lilac-bloom)] focus:ring-[var(--color-lilac-bloom)]" />
          <label className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">Account Active</label>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)]">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" variant="lilac" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
