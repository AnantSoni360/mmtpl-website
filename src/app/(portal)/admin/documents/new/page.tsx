import { Button } from '@/components/ui/Button';
import { uploadDocument } from '@/app/actions/document';
import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function UploadDocumentPage() {
  const projects = await prisma.project.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Upload Document</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Add a new file to the company repository.</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <form action={uploadDocument} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Document Name</label>
              <input name="name" required placeholder="e.g. Q3 Financial Report" className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Document Type</label>
              <select name="docType" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]">
                <option value="POLICY">Company Policy</option>
                <option value="CONTRACT">Contract</option>
                <option value="INVOICE">Invoice</option>
                <option value="REPORT">Report</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Link to Project (Optional)</label>
              <select name="projectId" className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]">
                <option value="">-- No Project --</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">File</label>
              <div className="w-full border-2 border-dashed border-[var(--color-silver)] rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-[var(--color-bone)] transition-colors cursor-pointer">
                <p className="text-[14px] font-medium text-[var(--color-obsidian)] font-switzer">Click to upload or drag and drop</p>
                <p className="text-[12px] text-[var(--color-slate)] font-switzer mt-1">PDF, DOCX, XLSX up to 10MB</p>
                <input type="file" className="hidden" />
              </div>
              <p className="text-[11px] text-[var(--color-slate)] font-switzer italic mt-1">* Note: This is a simulated upload for demonstration purposes.</p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-silver)]">
            <Link href="/admin/documents">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" variant="lilac">Save Document</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
