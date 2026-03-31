'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BriefcaseBusiness,
  LayoutDashboard,
  FileStack,
  CheckSquare,
  Users,
  Settings,
  BarChart3,
  Shield,
  Clock,
  Wallet,
  ScanSearch,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Probate Register', href: '/dashboard/cases', icon: FileStack },
  { name: 'Document Pack', href: '/dashboard/documents', icon: CheckSquare },
  { name: 'Workflow Desk', href: '/dashboard/approvals', icon: Clock },
  { name: 'KYC Desk', href: '/dashboard/kyc', icon: ScanSearch },
  { name: 'Compliance', href: '/dashboard/compliance', icon: Shield },
  { name: 'Payments', href: '/dashboard/payments', icon: Wallet },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">
            PE
          </div>
          <div>
            <span className="block font-bold text-lg">Probate Ease</span>
            <span className="text-[11px] text-slate-400">FRISOPS Probadmin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
            <BriefcaseBusiness className="h-4 w-4 text-blue-400" />
            Active Focus
          </div>
          <p className="text-xs leading-5 text-slate-400">
            Codification, bank confirmation, lawyer/court return, KYC, compliance, and final transmission.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-400 text-center">
          <p>Probate Ease v1.0</p>
          <p>© 2026 FRISL / FirstTech</p>
        </div>
      </div>
    </div>
  );
}
