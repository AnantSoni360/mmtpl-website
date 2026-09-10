'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CloudinaryUploadWidget } from '@/components/cloudinary/CloudinaryUploadWidget';
import { toast } from 'sonner';

interface ProfileFormClientProps {
  initialData: {
    name: string;
    phone: string;
    experience: string;
    currentRole: string;
    resumeUrl: string;
  };
}

export function ProfileFormClient({ initialData }: ProfileFormClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(initialData.resumeUrl || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      experience: formData.get('experience') as string,
      currentRole: formData.get('currentRole') as string,
      resumeUrl
    };

    try {
      const res = await fetch('/api/jobs/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!res.ok) throw new Error('Failed to update');
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
      <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4 border-b border-[var(--color-silver)] pb-2">Professional Information</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Full Name</label>
          <input type="text" name="name" defaultValue={initialData.name} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors" />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Phone Number</label>
          <input type="text" name="phone" defaultValue={initialData.phone} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors" />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Current Role</label>
          <input type="text" name="currentRole" defaultValue={initialData.currentRole} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors" />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Years of Experience</label>
          <input type="text" name="experience" defaultValue={initialData.experience} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Resume Document</label>
        {resumeUrl && (
          <div className="mb-4">
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-[var(--color-lilac-bloom)] hover:underline">
              Current Resume Attached
            </a>
          </div>
        )}
        <CloudinaryUploadWidget 
          onUploadSuccess={(url) => setResumeUrl(url)}
          resourceType="raw"
          clientAllowedFormats={['pdf', 'doc', 'docx']}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" variant="lilac" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Information'}
        </Button>
      </div>
    </form>
  );
}
