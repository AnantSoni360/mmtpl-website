import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/Button';

export default async function ClientProfilePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CLIENT') redirect('/auth/login');

  const client = await prisma.client.findUnique({
    where: { userId: user.id },
    include: { user: true }
  });

  if (!client) return <div>Client not found</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Company Profile</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage your company information and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form action={async (formData) => {
          'use server';
          const prisma = (await import('@/lib/prisma')).default;
          const { revalidatePath } = await import('next/cache');
          
          const contactPerson = formData.get('contactPerson') as string;
          const gstin = formData.get('gstin') as string;
          const address = formData.get('address') as string;
          
          await prisma.client.update({
            where: { id: client.id },
            data: { contactPerson, gstin, address }
          });
          
          revalidatePath('/client/profile');
        }} className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
          <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4 border-b border-[var(--color-silver)] pb-2">Company Information</h2>
          
          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Company Name</label>
            <input type="text" disabled defaultValue={client.companyName} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer text-[var(--color-slate)] opacity-70" />
            <p className="text-[11px] text-[var(--color-slate)] mt-1">Contact your MMTPL representative to update company name.</p>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Contact Person</label>
            <input type="text" name="contactPerson" defaultValue={client.contactPerson || client.user.name || ''} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" disabled defaultValue={client.user.email} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer text-[var(--color-slate)] opacity-70" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">GSTIN</label>
            <input type="text" name="gstin" defaultValue={client.gstin || ''} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Office Address</label>
            <textarea name="address" defaultValue={client.address || ''} rows={3} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors resize-none"></textarea>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="lilac" className="w-full">Update Information</Button>
          </div>
        </form>

        <form action={async (formData) => {
          'use server';
          const bcrypt = await import('bcryptjs');
          const prisma = (await import('@/lib/prisma')).default;
          const { redirect } = await import('next/navigation');
          const password = formData.get('password') as string;
          const confirmPassword = formData.get('confirmPassword') as string;
          
          if (password !== confirmPassword) throw new Error("Passwords don't match");
          
          const hashedPassword = await bcrypt.hash(password, 10);
          await prisma.user.update({
            where: { id: user.id },
            data: { passwordHash: hashedPassword }
          });
          redirect('/auth/login');
        }} className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6 h-fit">
          <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4 border-b border-[var(--color-silver)] pb-2">Change Password</h2>
          
          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">New Password</label>
            <input type="password" name="password" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Confirm New Password</label>
            <input type="password" name="confirmPassword" required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors" />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">Change Password</Button>
            <p className="text-[11px] text-[var(--color-slate)] mt-2 text-center">You will be required to log in again after changing your password.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
