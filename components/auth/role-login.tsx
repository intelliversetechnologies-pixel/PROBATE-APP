'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ArrowRight, Briefcase, ChevronLeft, Eye, EyeOff, Lock, Mail, Scale, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

type RoleKey = 'client' | 'officer' | 'legal';

const roleConfig: Record<RoleKey, {
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  gradient: string;
  icon: typeof User;
  oauthLabel: string;
}> = {
  client: {
    title: 'Beneficiary Portal',
    description: 'Securely manage estate transmission, payment updates, and uploaded documents.',
    accent: '#0EA5E9',
    accentSoft: '#F0F9FF',
    gradient: 'linear-gradient(135deg, #0284C7 0%, #075985 100%)',
    icon: User,
    oauthLabel: 'Continue with Google',
  },
  officer: {
    title: 'Probate Officer',
    description: 'Authorized personnel access for workflow administration and desk coordination.',
    accent: '#0F172A',
    accentSoft: '#F1F5F9',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
    icon: Briefcase,
    oauthLabel: 'Continue with Microsoft',
  },
  legal: {
    title: 'Legal Interface',
    description: 'Digital verification desk for court agents and lawyers handling probate returns.',
    accent: '#7C3AED',
    accentSoft: '#F5F3FF',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
    icon: Scale,
    oauthLabel: 'Continue with Google',
  },
};

export default function RoleLogin({ role }: { role?: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const currentRole = useMemo<RoleKey>(() => {
    if (role === 'officer' || role === 'legal' || role === 'client') {
      return role;
    }
    return 'client';
  }, [role]);

  const config = roleConfig[currentRole];
  const Icon = config.icon;

  const handleOAuth = async () => {
    setIsLoading(true);
    try {
      const provider = currentRole === 'officer' ? 'azure-ad' : 'google';
      await signIn(provider, { redirectTo: '/dashboard' });
    } catch (error) {
      console.error('[probate-ease] Sign in error:', error);
      setIsLoading(false);
    }
  };

  const handleDemoEnter = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-white">
      <div
        className="relative hidden flex-1 overflow-hidden px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between"
        style={{ background: config.gradient }}
      >
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex rounded-2xl bg-white px-5 py-3 shadow-lg">
            <Image
              src="/first-registrars-logo.png"
              alt="First Registrars"
              width={148}
              height={54}
              className="h-9 w-auto"
              priority
            />
          </div>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight">
            Probate
            <br />
            Ease.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-white/85">
            The unified digital platform for transparent estate administration and stakeholder workflow handling.
          </p>
        </div>

        <p className="relative z-10 text-sm text-white/65">© 2026 First Registrars & Investor Services.</p>
      </div>

      <div className="relative flex min-h-screen flex-1 items-center justify-center bg-white px-6 py-10 lg:max-w-[620px] lg:px-12">
        <Link
          href="/"
          className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="w-full max-w-md">
          <div
            className="mb-6 inline-flex rounded-2xl p-4"
            style={{ backgroundColor: config.accentSoft, color: config.accent }}
          >
            <Icon className="h-9 w-9" />
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-slate-950">Welcome Back</h2>
          <p className="mt-3 text-lg leading-8 text-slate-500">{config.description}</p>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-400">{config.title}</p>

          <div className="mt-10 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-12 pr-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleOAuth}
              disabled={isLoading}
              className="h-13 w-full justify-center rounded-2xl text-base"
              style={{ backgroundColor: config.accent }}
            >
              <span>{isLoading ? 'Authenticating...' : config.oauthLabel}</span>
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>

            <Button
              onClick={handleDemoEnter}
              disabled={isLoading}
              variant="outline"
              className="h-13 w-full justify-center rounded-2xl border-slate-200 text-base"
            >
              Enter demo workspace
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
