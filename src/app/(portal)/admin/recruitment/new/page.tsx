import { Button } from '@/components/ui/Button';
import { createJobPosting } from '@/app/actions/recruitment';
import Link from 'next/link';

export default function NewJobPostingPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">New Job Posting</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Create a new job opening to publish on the careers page.</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <form action={createJobPosting} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Job Title</label>
              <input name="title" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Department</label>
              <select name="department" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]">
                <option value="Engineering">Engineering</option>
                <option value="Operations">Operations</option>
                <option value="Management">Management</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Location</label>
              <input name="location" defaultValue="Bhilai, Chhattisgarh" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Job Type</label>
              <select name="type" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]">
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Description</label>
              <textarea name="description" required rows={4} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Requirements</label>
              <textarea name="requirements" required rows={4} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" placeholder="- B.Tech in Mechanical Engineering&#10;- 5+ years experience" />
            </div>
            <div className="space-y-2 md:col-span-2 flex items-center gap-2">
              <input type="checkbox" name="isActive" id="isActive" defaultChecked className="w-4 h-4" />
              <label htmlFor="isActive" className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Publish immediately (Active)</label>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)]">
            <Link href="/admin/recruitment">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" variant="lilac">Create Job Posting</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
