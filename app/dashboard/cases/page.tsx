'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { probateCases } from '@/lib/probadmin-data';

const statusColors: Record<string, string> = {
  'Awaiting Court Confirmation': 'bg-amber-50 text-amber-700',
  'Awaiting Codification': 'bg-slate-100 text-slate-700',
  'Compliance Review': 'bg-blue-50 text-blue-700',
  'Pending Bank OTP Approval': 'bg-rose-50 text-rose-700',
};

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCases = probateCases.filter((caseItem) => {
    const matchesSearch =
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.deceased.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.nin.includes(searchTerm) ||
      caseItem.proxyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Probadmin Register</h1>
            <p className="text-slate-600">
              Track every probate matter from alleged deceased intake through final transmission.
            </p>
          </div>
          <Link href="/dashboard/cases/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Request
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <div className="p-4 flex gap-4 flex-wrap items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by control code, deceased name, proxy, or NIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Workflow Filters
          </Button>
        </div>
      </Card>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card><div className="p-5"><p className="text-sm text-slate-500">Onsite / DCP</p><p className="mt-2 text-2xl font-bold text-slate-900">19</p></div></Card>
        <Card><div className="p-5"><p className="text-sm text-slate-500">Portal Initiations</p><p className="mt-2 text-2xl font-bold text-slate-900">12</p></div></Card>
        <Card><div className="p-5"><p className="text-sm text-slate-500">Approved Proxies</p><p className="mt-2 text-2xl font-bold text-slate-900">21</p></div></Card>
        <Card><div className="p-5"><p className="text-sm text-slate-500">Need Feedback</p><p className="mt-2 text-2xl font-bold text-slate-900">5</p></div></Card>
      </div>

      {/* Cases Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Control Code</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Deceased</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Request</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Gateway / Proxy</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Bank / Court / KYC</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Progress</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-6 text-sm font-medium text-blue-600">
                    <Link href={`/dashboard/cases/${caseItem.id}`} className="hover:underline">
                      {caseItem.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-900">{caseItem.deceased}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    <p>{caseItem.requestType}</p>
                    <p className="text-xs text-slate-500">{caseItem.intakeChannel}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    <p>{caseItem.gateway}</p>
                    <p className="text-xs text-slate-500">{caseItem.proxyType}: {caseItem.proxyName}</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">
                    <p>Bank: {caseItem.bankStatus}</p>
                    <p>Court: {caseItem.courtStatus}</p>
                    <p>KYC: {caseItem.kycStatus}</p>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <Badge className={statusColors[caseItem.status] || 'bg-slate-50 text-slate-700'}>
                      {caseItem.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${caseItem.progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/dashboard/cases/${caseItem.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Issue Feedback</DropdownMenuItem>
                        <DropdownMenuItem>Open Document Pack</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No cases found matching your search.</p>
            <Link href="/dashboard/cases/new">
              <Button>Create First Request</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
