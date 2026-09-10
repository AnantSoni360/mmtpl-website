'use client';

import { Button } from '@/components/ui/Button';
import { createClient } from '@/app/actions/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientSchema, type ClientInput } from '@/lib/validations';

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ClientInput>({
    resolver: zodResolver(ClientSchema)
  });

  const onSubmit = async (data: ClientInput) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value as string);
    });

    try {
      const result = await createClient(formData);
      if (result?.error) {
        toast.error(result.error);
        setLoading(false);
      } else {
        toast.success('Client created successfully');
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
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Add Client</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Create a new client account to give them portal access.</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <h3 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer border-b border-[var(--color-silver)] pb-2 mb-4">Company Details</h3>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Company Name</label>
              <input {...register('companyName')} className={inputClass} />
              {errors.companyName && <span className={errorClass}>{errors.companyName.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">GSTIN (Optional)</label>
              <input {...register('gstin')} className={inputClass} />
              {errors.gstin && <span className={errorClass}>{errors.gstin.message}</span>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Address</label>
              <textarea rows={2} {...register('address')} className={inputClass} />
              {errors.address && <span className={errorClass}>{errors.address.message}</span>}
            </div>

            <div className="space-y-2 md:col-span-2 mt-4">
              <h3 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer border-b border-[var(--color-silver)] pb-2 mb-4">Portal Account Details</h3>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Contact Person (Name)</label>
              <input {...register('name')} className={inputClass} />
              {errors.name && <span className={errorClass}>{errors.name.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Email Address (Login ID)</label>
              <input type="email" {...register('email')} className={inputClass} />
              {errors.email && <span className={errorClass}>{errors.email.message}</span>}
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Temporary Password</label>
              <input type="password" {...register('password')} className={inputClass} />
              {errors.password && <span className={errorClass}>{errors.password.message}</span>}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)] mt-8">
            <Button type="button" variant="outline" onClick={() => router.push('/admin/clients')} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="lilac" disabled={loading}>
              {loading ? 'Creating...' : 'Create Client'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
