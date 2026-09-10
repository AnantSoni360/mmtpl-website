import prisma from '@/lib/prisma';
import { ProjectForm } from './ProjectForm';

export default async function NewProjectPage({ searchParams }: { searchParams: Promise<{ name?: string, scope?: string }> }) {
  const { name = '', scope = '' } = await searchParams;

  const clients = await prisma.client.findMany({
    orderBy: { companyName: 'asc' },
    select: { id: true, companyName: true }
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Create Project</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Add a new project and assign it to a client.</p>
      </div>

      <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)]">
        <ProjectForm clients={clients} defaultName={name} defaultScope={scope} />
      </div>
    </div>
  );
}
