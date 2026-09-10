'use client';

import { Button } from '@/components/ui/Button';
import { applyForLeave } from '@/app/actions/leave';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LeaveSchema, type LeaveInput } from '@/lib/validations';

interface LeaveFormProps {
  employeeId: string;
}

export function LeaveForm({ employeeId }: LeaveFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LeaveInput>({
    resolver: zodResolver(LeaveSchema),
    defaultValues: {
      type: 'CASUAL',
    }
  });

  const onSubmit = async (data: LeaveInput) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('employeeId', employeeId);
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value as string);
    });

    try {
      const result = await applyForLeave(formData);
      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
      } else {
        toast.success('Leave applied successfully');
      }
    } catch (e) {
      toast.error('An unexpected error occurred');
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] outline-none focus:border-[var(--color-obsidian)]";
  const errorClass = "text-red-500 text-xs mt-1 block";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
      <div>
        <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Leave Type</label>
        <select {...register('type')} className={inputClass}>
          <option value="CASUAL">Casual Leave</option>
          <option value="MEDICAL">Medical Leave</option>
          <option value="EARNED">Earned Leave</option>
          <option value="UNPAID">Unpaid Leave</option>
        </select>
        {errors.type && <span className={errorClass}>{errors.type.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">From Date</label>
          <input type="date" {...register('fromDate')} className={inputClass} />
          {errors.fromDate && <span className={errorClass}>{errors.fromDate.message}</span>}
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">To Date</label>
          <input type="date" {...register('toDate')} className={inputClass} />
          {errors.toDate && <span className={errorClass}>{errors.toDate.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Reason</label>
        <textarea rows={4} {...register('reason')} className={inputClass} placeholder="Please provide details about your leave..." />
        {errors.reason && <span className={errorClass}>{errors.reason.message}</span>}
      </div>

      <div className="pt-2 flex gap-3">
        <Button type="button" variant="outline" className="flex-1" onClick={() => router.push('/employee/leave')} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="lilac" className="flex-1" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </div>
    </form>
  );
}
