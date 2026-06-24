import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/Button';

export default async function EmployeeProfilePage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'EMPLOYEE') redirect('/auth/login');

  const employee = await prisma.employee.findUnique({
    where: { userId: user.id },
    include: { user: true }
  });

  if (!employee) return <div>Employee not found</div>;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">My Profile</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage your personal information and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form action={async (formData) => {
          'use server';
          const prisma = (await import('@/lib/prisma')).default;
          const { revalidatePath } = await import('next/cache');
          const phone = formData.get('phone') as string;
          await prisma.employee.update({
            where: { id: employee.id },
            data: { phone }
          });
          revalidatePath('/employee/profile');
        }} className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
          <h2 className="text-[15px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-4 border-b border-[var(--color-silver)] pb-2">Personal Information</h2>
          
          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Full Name</label>
            <input type="text" disabled defaultValue={employee.user.name || ''} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer text-[var(--color-slate)] opacity-70" />
            <p className="text-[11px] text-[var(--color-slate)] mt-1">Contact HR to change your name.</p>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" disabled defaultValue={employee.user.email} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer text-[var(--color-slate)] opacity-70" />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[var(--color-obsidian)] font-switzer uppercase tracking-wider mb-2">Phone Number</label>
            <input type="tel" name="phone" defaultValue={employee.phone || ''} required className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2.5 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)] transition-colors" />
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
        }} className="bg-[var(--color-paper)] p-6 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
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
