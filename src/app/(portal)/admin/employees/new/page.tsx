'use client';

import { Button } from '@/components/ui/Button';
import { createEmployee } from '@/app/actions/employee';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmployeeSchema, type EmployeeInput } from '@/lib/validations';

export default function NewEmployeePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeInput>({
    resolver: zodResolver(EmployeeSchema)
  });

  const onSubmit = async (data: EmployeeInput) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value as string);
    });

    try {
      const result = await createEmployee(formData);
      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
      } else {
        toast.success('Employee created successfully');
      }
    } catch (e) {
      toast.error('An unexpected error occurred');
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]";
  const errorClass = "text-red-500 text-xs mt-1 block";

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Add Employee</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Create a new employee account and generate their login credentials.</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Full Name</label>
              <input {...register('name')} className={inputClass} />
              {errors.name && <span className={errorClass}>{errors.name.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Email Address</label>
              <input type="email" {...register('email')} className={inputClass} />
              {errors.email && <span className={errorClass}>{errors.email.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Temporary Password</label>
              <input type="password" {...register('password')} className={inputClass} />
              {errors.password && <span className={errorClass}>{errors.password.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Employee Code</label>
              <input {...register('employeeCode')} placeholder="EMP-001" className={inputClass} />
              {errors.employeeCode && <span className={errorClass}>{errors.employeeCode.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Department</label>
              <input {...register('department')} className={inputClass} />
              {errors.department && <span className={errorClass}>{errors.department.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Designation</label>
              <input {...register('designation')} className={inputClass} />
              {errors.designation && <span className={errorClass}>{errors.designation.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Phone Number</label>
              <input {...register('phone')} className={inputClass} />
              {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Location / Branch</label>
              <input {...register('location')} className={inputClass} />
              {errors.location && <span className={errorClass}>{errors.location.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Employment Type</label>
              <select {...register('employmentType')} className={inputClass}>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Intern</option>
              </select>
              {errors.employmentType && <span className={errorClass}>{errors.employmentType.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Joining Date</label>
              <input type="date" {...register('joinDate')} className={inputClass} />
              {errors.joinDate && <span className={errorClass}>{errors.joinDate.message}</span>}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)] mt-8">
            <Button type="button" variant="outline" onClick={() => router.push('/admin/employees')} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="lilac" disabled={loading}>
              {loading ? 'Creating...' : 'Create Employee'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
