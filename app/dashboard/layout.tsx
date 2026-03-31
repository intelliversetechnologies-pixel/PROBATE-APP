import { auth } from '@/auth';
import Sidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';

const demoUser = {
  name: 'Demo User',
  email: 'demo@probateease.local',
  image: null,
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user ?? demoUser;

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
