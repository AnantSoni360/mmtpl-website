import { Button } from '@/components/ui/Button';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Save, Settings, UserCircle, Shield, Briefcase } from 'lucide-react';
import { updateSettings } from '@/app/actions/settings';

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') redirect('/auth/login');

  const settingsRecords = await prisma.setting.findMany();
  const settings = settingsRecords.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold font-switzer text-[var(--color-obsidian)] mb-1">Settings</h1>
        <p className="text-[13px] text-[var(--color-slate)] font-switzer">Manage company details, portal configuration, and profile.</p>
      </div>

      <div className="space-y-8">
        
        {/* Global Company Settings */}
        <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
          <div className="flex items-center gap-2 border-b border-[var(--color-silver)] pb-4">
            <Briefcase size={20} className="text-[var(--color-slate)]" />
            <h2 className="text-[16px] font-semibold text-[var(--color-obsidian)] font-switzer">Company Profile</h2>
          </div>

          <form action={updateSettings} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Company Name</label>
                <input name="CompanyName" defaultValue={settings['CompanyName'] || 'Mac-Metals'} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Company Logo URL</label>
                <input name="LogoURL" defaultValue={settings['LogoURL'] || '/logo.png'} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[var(--color-obsidian)] font-switzer">Support Email</label>
                <input type="email" name="SupportEmail" defaultValue={settings['SupportEmail'] || 'support@mmtpl.in'} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] outline-none focus:border-[var(--color-obsidian)]" />
              </div>
            </div>

            <div className="pt-2 flex justify-start">
              <Button type="submit" variant="lilac">
                <Save size={16} className="mr-2" /> Save Company Settings
              </Button>
            </div>
          </form>
        </div>

        {/* Profile Settings */}
        <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
          <div className="flex items-center gap-2 border-b border-[var(--color-silver)] pb-4">
            <UserCircle size={20} className="text-[var(--color-slate)]" />
            <h2 className="text-[16px] font-semibold text-[var(--color-obsidian)] font-switzer">Personal Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[12px] font-medium text-[var(--color-slate)]">Name</label>
              <input type="text" defaultValue={user.name || ''} className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)]" />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-medium text-[var(--color-slate)]">Email</label>
              <input type="email" defaultValue={user.email} disabled className="w-full bg-[rgba(0,0,0,0.02)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] font-switzer text-[var(--color-slate)] cursor-not-allowed" />
            </div>
          </div>
          <Button variant="outline" className="mt-2">Update Profile</Button>
        </div>

        {/* Security Settings */}
        <div className="bg-[var(--color-paper)] p-8 rounded-[16px] border-[0.5px] border-[var(--color-silver)] shadow-[var(--shadow-card)] space-y-6">
          <div className="flex items-center gap-2 border-b border-[var(--color-silver)] pb-4">
            <Shield size={20} className="text-[var(--color-slate)]" />
            <h2 className="text-[16px] font-semibold text-[var(--color-obsidian)] font-switzer">Security</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[12px] font-medium text-[var(--color-slate)]">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)]" />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-medium text-[var(--color-slate)]">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[var(--color-bone)] border border-[var(--color-silver)] rounded-[var(--radius-control)] px-4 py-2 text-[14px] font-switzer outline-none focus:border-[var(--color-obsidian)]" />
            </div>
          </div>
          <Button variant="outline" className="mt-2">Change Password</Button>
        </div>

      </div>
    </div>
  );
}
