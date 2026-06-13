import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import { AdminShell } from '@/components/admin/AdminShell';
import { hasAdminAccess } from '@/lib/auth/authorization';

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin?callbackUrl=/admin');
  }
  if (!hasAdminAccess(session)) {
    redirect('/inicio');
  }

  return (
    <AdminShell
      userLabel={session.user.email || session.user.name || 'Administrador'}
      logoutAction={async () => {
        'use server';
        await signOut({ redirectTo: '/inicio' });
      }}
    >
      {children}
    </AdminShell>
  );
}
