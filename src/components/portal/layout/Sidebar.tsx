'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CheckSquare, 
  Clock, 
  CalendarDays, 
  Building2, 
  Inbox, 
  FileText, 
  BriefcaseBusiness, 
  FolderOpen, 
  MessageSquare, 
  BarChart3, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  role: string;
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function Sidebar({ role, isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  // Define navigation items based on role
  // This is a simplified version; normally we'd pass these or map them completely
  const adminNav = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Employees', href: '/admin/employees', icon: Users },
    { name: 'Projects', href: '/admin/projects', icon: Briefcase },
    { name: 'Tasks', href: '/admin/tasks', icon: CheckSquare },
    { name: 'Attendance', href: '/admin/attendance', icon: Clock },
    { name: 'Leave', href: '/admin/leave', icon: CalendarDays },
    { name: 'Clients', href: '/admin/clients', icon: Building2 },
    { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
    { name: 'Billing', href: '/admin/billing', icon: FileText },
    { name: 'Recruitment', href: '/admin/recruitment', icon: BriefcaseBusiness },
    { name: 'Documents', href: '/admin/documents', icon: FolderOpen },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const employeeNav = [
    { name: 'Dashboard', href: '/employee', icon: LayoutDashboard },
    { name: 'My Tasks', href: '/employee/tasks', icon: CheckSquare },
    { name: 'My Projects', href: '/employee/projects', icon: Briefcase },
    { name: 'Attendance', href: '/employee/attendance', icon: Clock },
    { name: 'Leave', href: '/employee/leave', icon: CalendarDays },
    { name: 'Documents', href: '/employee/documents', icon: FolderOpen },
    { name: 'Messages', href: '/employee/messages', icon: MessageSquare },
    { name: 'Profile', href: '/employee/profile', icon: Users },
  ];

  const clientNav = [
    { name: 'Dashboard', href: '/client', icon: LayoutDashboard },
    { name: 'Projects', href: '/client/projects', icon: Briefcase },
    { name: 'Invoices', href: '/client/invoices', icon: FileText },
    { name: 'Documents', href: '/client/documents', icon: FolderOpen },
    { name: 'Messages', href: '/client/messages', icon: MessageSquare },
    { name: 'Support', href: '/client/tickets', icon: Settings },
  ];

  const jobSeekerNav = [
    { name: 'Browse Jobs', href: '/jobs', icon: Briefcase },
    { name: 'My Applications', href: '/jobs/applications', icon: Inbox },
    { name: 'Profile', href: '/jobs/profile', icon: Users },
  ];

  let navItems = adminNav;
  if (role === 'EMPLOYEE') navItems = employeeNav;
  if (role === 'CLIENT') navItems = clientNav;
  if (role === 'JOB_SEEKER') navItems = jobSeekerNav;
  
  return (
    <aside 
      className={cn(
        "h-screen bg-[var(--color-obsidian)] fixed top-0 left-0 flex flex-col z-50 transition-transform duration-300 w-[240px]",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className={cn("h-16 flex items-center border-b border-white/10 px-6")}>
        <span className="font-switzer font-bold text-white text-lg tracking-wide whitespace-nowrap overflow-hidden">
          MMTPL Portal
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3 custom-scrollbar">
        {navItems.map((item) => {
          const isRootPath = item.href === '/admin' || item.href === '/employee' || item.href === '/client';
          const isActive = isRootPath 
            ? pathname === item.href 
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 768 && setIsOpen) setIsOpen(false);
              }}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg font-switzer text-[13px] font-medium transition-all relative group',
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-[var(--color-slate)] hover:text-white hover:bg-white/5'
              )}
            >
              <Icon size={20} className={cn('shrink-0 transition-colors', isActive ? 'text-white' : 'text-[var(--color-slate)] group-hover:text-white')} />
              
              <span className="truncate">{item.name}</span>
              
              {isActive && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-lilac-bloom)] shrink-0" />
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
