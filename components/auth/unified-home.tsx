'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Briefcase, Scale, User } from 'lucide-react';
import { stakeholderQueues } from '@/lib/probadmin-data';
import type { Session } from 'next-auth';

interface UnifiedHomeProps {
  session: Session | null;
}

export default function UnifiedHome({ session }: UnifiedHomeProps) {
  const roleCards = [
    {
      key: 'client',
      title: 'Beneficiary / Client',
      description: 'Initiate probate, track applications, and manage uploaded documents.',
      icon: User,
    },
    {
      key: 'officer',
      title: 'Probate Officer',
      description: 'Process transmissions, verify documents, and manage compliance.',
      icon: Briefcase,
    },
    {
      key: 'legal',
      title: 'Legal / Court Agent',
      description: 'Review legal documents, confirm schedules, and validate orders.',
      icon: Scale,
    },
  ] as const;

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,#0F172A_0%,#1E293B_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-12 lg:px-8">
        <div className="mb-12 flex max-w-3xl flex-col items-center text-center">
          <div className="rounded-2xl bg-white px-6 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
            <Image
              src="/first-registrars-logo.png"
              alt="First Registrars"
              width={185}
              height={68}
              className="h-14 w-auto"
              priority
            />
          </div>

          <h1 className="mt-8 text-5xl font-semibold tracking-tight lg:text-6xl">Probate Ease</h1>
          <p className="mt-4 text-xl font-light text-white/75">
            Digital Probate Administration & Workflow System
          </p>
          {session?.user ? (
            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Resume workspace
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
          {roleCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.key}
                href={`/login?role=${card.key}`}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-sky-400/70 hover:bg-white/10 hover:shadow-[0_25px_50px_rgba(15,23,42,0.35)]"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">{card.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
                  Open portal
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-4 lg:grid-cols-4">
          {stakeholderQueues.map((queue) => {
            const Icon = queue.icon;

            return (
              <div key={queue.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="rounded-2xl bg-white/10 p-2 text-sky-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    {queue.count}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-white">{queue.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">{queue.owner}</p>
                <p className="mt-3 text-sm leading-6 text-white/60">{queue.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
