'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import {
  overviewIcons,
  probateCases,
  probateStats,
  stakeholderQueues,
  workflowGuardrails,
  workflowSteps,
} from '@/lib/probadmin-data';

export default function DashboardOverview() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-slate-900">Probadmin Command Centre</h1>
            <p className="max-w-3xl text-slate-600">
              Digitize intake, codification, bank confirmation, lawyer and court reconfirmation, KYC,
              compliance, and final transmission from one FRISOPS workflow desk.
            </p>
          </div>
          <Link href="/dashboard/cases/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Probadmin Request
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {probateStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-2 text-sm text-slate-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{stat.note}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-slate-900">Workflow Progression</h2>
            <div className="space-y-4">
              {workflowSteps.map((step) => (
                <div key={step.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-900">{step.name}</span>
                    <span className="text-slate-500">{step.completed} files</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${Math.min(step.completed * 2, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <overviewIcons.bank className="h-4 w-4 text-blue-600" />
                  Bank and Court Dependencies
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  Banker confirmation, lawyer reconfirmation, court stamping, and OTP approvals remain the
                  biggest cycle-time drivers.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <overviewIcons.payment className="h-4 w-4 text-blue-600" />
                  Payment and Feedback
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  Every triggered fee, receipt upload, and workflow decision must notify the client and only
                  approved proxies.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <div className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-slate-900">Stakeholder Queues</h2>
            <div className="space-y-4">
              {stakeholderQueues.map((queue) => {
                const Icon = queue.icon;
                return (
                  <div key={queue.title} className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{queue.title}</p>
                          <p className="text-xs text-slate-500">{queue.owner}</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {queue.count}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{queue.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-8">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Live Probate Matters</h2>
            <Link href="/dashboard/cases">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Control Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Deceased Shareholder</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Current Stage</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Next Action</th>
                </tr>
              </thead>
              <tbody>
                {probateCases.slice(0, 4).map((caseItem) => (
                  <tr key={caseItem.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{caseItem.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{caseItem.deceased}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {caseItem.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{caseItem.nextAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Operating Guardrails</h2>
              <Link href="/dashboard/compliance" className="text-sm font-medium text-blue-600">
                Review compliance
              </Link>
            </div>
            <div className="space-y-3">
              {workflowGuardrails.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                  <overviewIcons.approval className="mt-0.5 h-4 w-4 text-blue-600" />
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="mb-6 text-lg font-semibold text-slate-900">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/dashboard/cases/new">
                <Button variant="outline" className="w-full justify-between">
                  <span>Create alleged deceased or probate request</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/documents">
                <Button variant="outline" className="w-full justify-between">
                  <span>Bind documents to control codes</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/payments">
                <Button variant="outline" className="w-full justify-between">
                  <span>Issue payment links and review receipts</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
