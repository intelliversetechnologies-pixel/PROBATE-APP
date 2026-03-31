'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Download, Trash2, Eye, Filter } from 'lucide-react';
import { documentRegister, requiredDocumentPack } from '@/lib/probadmin-data';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  'Approved': 'bg-green-50 text-green-700',
  'Awaiting Court Feedback': 'bg-amber-50 text-amber-700',
  'Needs Codification': 'bg-slate-100 text-slate-700',
  'Under Review': 'bg-blue-50 text-blue-700',
};

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDocuments = documentRegister.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.caseId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Probate Document Pack</h1>
        <p className="text-slate-600">Manage intake, court, bank, KYC, and compliance documents bound to control codes.</p>
      </div>

      <Card className="mb-8">
        <div className="p-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-blue-500">
              <Upload className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <p className="mb-2 text-lg font-semibold text-slate-900">Bind New Probate Documents</p>
              <p className="mb-4 text-slate-600">Upload scanned or digital files and attach them to an existing control code.</p>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Select Files
              </Button>
              <p className="mt-4 text-sm text-slate-500">Accepted inputs include bank confirmations, court returns, NIN IDs, proxy letters, e-dividend, and CSCS forms.</p>
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50 p-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Form DOC. 01</p>
              <p className="mb-3 text-lg font-semibold text-slate-900">Registrar request form, now digitized</p>
              <p className="mb-5 text-sm leading-6 text-slate-600">
                Capture the paper checklist digitally for Letters of Administration, change-of-name, and company change requests.
              </p>
              <Link href="/dashboard/documents/form-doc-01">
                <Button className="gap-2">
                  <FileText className="h-4 w-4" />
                  Open Digital Form
                </Button>
              </Link>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Transmission Pack</p>
              <p className="mb-3 text-lg font-semibold text-slate-900">Transmission request and premium consent</p>
              <p className="mb-5 text-sm leading-6 text-slate-600">
                Capture transmission requirements, statutory charges, client election, and premium service consent digitally.
              </p>
              <Link href="/dashboard/documents/transmission-pack">
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Open Transmission Pack
                </Button>
              </Link>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-8 lg:col-span-3">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Letter Of Request</p>
                  <p className="mb-2 text-lg font-semibold text-slate-900">Fillable request letter and signature schedule</p>
                  <p className="text-sm leading-6 text-slate-600">
                    Capture the deceased holder request letter, declaration text, administrator or executor entries, and witness details digitally.
                  </p>
                </div>
                <Link href="/dashboard/documents/letter-of-request">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Open Letter Of Request
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="p-6">
            <h3 className="mb-4 font-semibold text-slate-900">Mandatory Pack</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {requiredDocumentPack.map((item) => (
                <p key={item} className="text-sm text-slate-600">• {item}</p>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h3 className="mb-4 font-semibold text-slate-900">Watermark Logic</h3>
            <p className="text-sm leading-6 text-slate-600">
              Returned documents should carry statuses such as approved, rejected by bank, view-only, or pending account numbering so all communities see the same truth.
            </p>
          </div>
        </Card>
      </div>

      <Card className="mb-8">
        <div className="p-4 flex gap-4 flex-wrap items-center">
          <Input
            placeholder="Search by document name or control code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-64"
          />
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter Register
          </Button>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Document Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Control Code</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Category</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Owner</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Upload Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Watermark</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-slate-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{doc.caseId}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{doc.category}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{doc.owner}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{doc.uploadDate}</td>
                  <td className="py-4 px-6 text-sm">
                    <Badge className={statusColors[doc.status] || 'bg-slate-50 text-slate-700'}>
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{doc.watermark}</td>
                  <td className="py-4 px-6 text-sm">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No documents found</p>
          </div>
        )}
      </Card>
    </div>
  );
}
