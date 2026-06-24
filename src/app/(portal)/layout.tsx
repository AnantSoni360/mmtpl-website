import { getCurrentUser } from '@/lib/auth';
import { PortalLayoutClient } from '@/components/portal/layout/PortalLayoutClient';
import { redirect } from 'next/navigation';

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <PortalLayoutClient role={user.role} user={{ ...user, name: user.name || 'User' }}>
      {children}
    </PortalLayoutClient>
  );
}
