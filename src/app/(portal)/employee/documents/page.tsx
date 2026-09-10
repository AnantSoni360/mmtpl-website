import { DataTable } from '@/components/portal/tables/DataTable';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Download, Search } from 'lucide-react';
import { format } from 'date-fns';

export default async function EmployeeDocumentsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const documents = await prisma.document.findMany({
    where: { isEmployeeVisible: true },
    include: { project: true, uploadedBy: true },
    orderBy: { createdAt: 'desc' }
  });

  const tableData = documents.map(doc => ({
    id: doc.id,
    name: doc.name,
    project: doc.project?.name || 'Company Document',
    uploadedBy: doc.uploadedBy.name || 'Admin',
    uploadedAt: format(new Date(doc.createdAt), 'dd MMM yyyy'),
    fileUrl: doc.fileUrl
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Documents</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Access company policies, project files, and shared documents.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="pl-9 pr-4 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-full sm:w-[250px]"
            />
          </div>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'File Name', accessorKey: 'name' },
          { header: 'Project / Scope', accessorKey: 'project' },
          { header: 'Uploaded By', accessorKey: 'uploadedBy' },
          { header: 'Date', accessorKey: 'uploadedAt' },
          {
            header: 'Download',
            accessorKey: 'fileUrl',
            cell: (item) => (
              <a href={item.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[var(--color-lilac-bloom)] hover:underline font-medium text-[13px]">
                <Download size={14} /> Open
              </a>
            )
          }
        ]}
      />
    </div>
  );
}
