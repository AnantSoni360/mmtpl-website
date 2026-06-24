import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function ClientTicketNewPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CLIENT') redirect('/auth/login');

  const client = await prisma.client.findUnique({
    where: { userId: user.id }
  });

  if (!client) return <div>Client not found.</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Create Support Ticket</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Submit a new issue or request.</p>
      </div>

      <form action={async (formData) => {
        'use server';
        const prisma = (await import('@/lib/prisma')).default;
        const { revalidatePath } = await import('next/cache');
        const { redirect } = await import('next/navigation');
        
        const subject = formData.get('subject') as string;
        const description = formData.get('description') as string;
        
        if (!subject || !description) return;

        await prisma.supportTicket.create({
          data: {
            clientId: client.id,
            subject,
            description,
            status: 'OPEN'
          }
        });

        revalidatePath('/client/tickets');
        redirect('/client/tickets');
      }} className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
        
        <div>
          <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Subject</label>
          <input 
            type="text" 
            name="subject"
            required
            className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors"
            placeholder="Brief summary of the issue"
          />
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Description</label>
          <textarea 
            name="description"
            required
            rows={6}
            className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-3 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors resize-none"
            placeholder="Please provide detailed information about your request..."
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/client/tickets">
            <Button variant="outline" type="button">Cancel</Button>
          </Link>
          <Button variant="lilac" type="submit">Submit Ticket</Button>
        </div>
      </form>
    </div>
  );
}
