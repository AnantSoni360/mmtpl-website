import { DataTable } from '@/components/portal/tables/DataTable';
import { Button } from '@/components/ui/Button';
import prisma from '@/lib/prisma';
import { Plus, Search, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default async function AdminDocumentsPage() {
  const documents = await prisma.document.findMany({
    include: {
      project: true,
      uploadedBy: true
    },
    orderBy: { createdAt: 'desc' }
  });

  const tableData = documents.map(doc => ({
    id: doc.id,
    name: doc.name,
    type: doc.docType,
    project: doc.project?.name || 'Internal',
    uploadedBy: doc.uploadedBy.name,
    date: format(new Date(doc.createdAt), 'dd MMM yyyy')
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Documents</h1>
          <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage all company and project files.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate)]" />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="pl-9 pr-4 py-2 h-[40px] bg-[var(--color-paper)] border border-[var(--color-silver)] rounded-[var(--radius-control)] text-[13px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors w-full sm:w-[250px]"
            />
          </div>
          <Link href="/admin/documents/new">
            <Button variant="lilac" className="h-[40px]">
              <Plus size={16} />
              Upload File
            </Button>
          </Link>
        </div>
      </div>

      <DataTable 
        data={tableData}
        columns={[
          { header: 'File Name', accessorKey: 'name' },
          { header: 'Type', accessorKey: 'type' },
          { header: 'Project', accessorKey: 'project' },
          { header: 'Uploaded By', accessorKey: 'uploadedBy' },
          { header: 'Date', accessorKey: 'date' },
          {
            header: 'Action',
            accessorKey: 'id',
            cell: () => (
              <Button variant="outline" className="h-8 text-[12px] px-3 font-medium">
                <FileDown size={14} className="mr-1" /> Download
              </Button>
            )
          }
        ]}
      />
    </div>
  );
}
