'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Clock, FileText, Landmark, Plus, Scale, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { caseDetail, probateCases, requiredDocumentPack } from '@/lib/probadmin-data';

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const caseRecord = probateCases.find((item) => item.id === decodeURIComponent(params.id)) ?? probateCases[0];

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/dashboard/cases" className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Probate Register
        </Link>

        <div className="mb-6 flex items-start justify-between gap-6">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">{caseRecord.id}</h1>
              <Badge className="bg-blue-50 text-blue-700">{caseRecord.status}</Badge>
            </div>
            <p className="text-slate-600">
              {caseRecord.deceased} • {caseRecord.requestType} • {caseRecord.intakeChannel}
            </p>
          </div>
          <Button>Issue Feedback</Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-2 flex-1 rounded-full bg-slate-200">
            <div className="h-2 rounded-full bg-blue-600" style={{ width: `${caseRecord.progress}%` }} />
          </div>
          <span className="text-sm font-medium text-slate-600">{caseRecord.progress}% progressed</span>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Document Pack</TabsTrigger>
              <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <div className="p-6">
                  <h2 className="mb-6 text-lg font-semibold text-slate-900">Probadmin Summary</h2>
                  <div className="mb-8 grid grid-cols-2 gap-8">
                    <Info label="Deceased Shareholder" value={caseRecord.deceased} />
                    <Info label="Lead Client" value={caseRecord.clientLead} />
                    <Info label="NIN" value={caseRecord.nin} />
                    <Info label="Date of Death" value={caseRecord.dateOfDeath} />
                    <Info label="Court Reference" value={caseDetail.courtReference} />
                    <Info label="Date Created" value={caseRecord.dateCreated} />
                  </div>

                  <Section title="Engagement Context">
                    <div className="grid grid-cols-2 gap-8">
                      <Info label="Gateway" value={caseRecord.gateway} />
                      <Info label="Approved Proxy" value={`${caseRecord.proxyType} • ${caseRecord.proxyName}`} />
                      <Info label="Meeting Requirement" value={caseRecord.requiredMeeting} />
                      <Info label="Payment Status" value={caseRecord.paymentStatus} />
                    </div>
                  </Section>

                  <Section title="Codification and Workflow State">
                    <div className="grid grid-cols-2 gap-8">
                      <Info label="Codification Status" value={caseDetail.codificationStatus} />
                      <Info label="Current Stage" value={caseRecord.stage} />
                      <Info label="Bank Status" value={caseRecord.bankStatus} />
                      <Info label="Court Status" value={caseRecord.courtStatus} />
                      <Info label="KYC Status" value={caseRecord.kycStatus} />
                      <Info label="Compliance Status" value={caseRecord.complianceStatus} />
                    </div>
                  </Section>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Bound Document Pack</h2>
                    <Button className="gap-2" size="sm">
                      <Plus className="h-4 w-4" />
                      Upload to File
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {caseDetail.documents.map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-slate-900">{doc.name}</p>
                            <p className="text-sm text-slate-500">{doc.uploadDate}</p>
                          </div>
                        </div>
                        <Badge className="bg-slate-100 text-slate-700">{doc.status}</Badge>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="mb-3 font-semibold text-slate-900">Mandatory Checklist</h3>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {requiredDocumentPack.map((item) => (
                        <p key={item} className="text-sm text-slate-600">• {item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="stakeholders">
              <Card>
                <div className="p-6">
                  <h2 className="mb-6 text-lg font-semibold text-slate-900">Sequential Stakeholder Actions</h2>
                  <div className="space-y-6">
                    {caseDetail.stakeholders.map((item, idx) => (
                      <div key={item.stage} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            item.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-600'
                              : item.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-slate-100 text-slate-500'
                          }`}>
                            {idx === 0 && <Users className="h-5 w-5" />}
                            {idx === 1 && <Landmark className="h-5 w-5" />}
                            {idx === 2 && <Scale className="h-5 w-5" />}
                            {idx > 2 && <ShieldCheck className="h-5 w-5" />}
                          </div>
                          {idx < caseDetail.stakeholders.length - 1 && <div className="my-2 h-16 w-1 bg-slate-200" />}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-900">{item.stage}</h3>
                            <Badge className="bg-slate-100 text-slate-700">{item.status}</Badge>
                          </div>
                          <p className="text-sm text-slate-600">
                            {item.owner}
                            {item.date ? ` • ${item.date}` : ' • awaiting trigger'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <div className="p-6">
                  <h2 className="mb-6 text-lg font-semibold text-slate-900">Audit and Feedback Timeline</h2>
                  <div className="space-y-4">
                    {caseDetail.timeline.map((event, idx) => (
                      <div key={`${event.action}-${idx}`} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="mt-2 h-3 w-3 rounded-full bg-blue-600" />
                          {idx < caseDetail.timeline.length - 1 && <div className="my-2 h-12 w-1 bg-slate-200" />}
                        </div>
                        <div className="pb-4">
                          <p className="font-medium text-slate-900">{event.action}</p>
                          <p className="text-sm text-slate-600">{event.date} • {event.actor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="mb-4 font-semibold text-slate-900">Operational Snapshot</h3>
              <div className="space-y-3">
                <QuickStat label="Estimated Value" value={caseRecord.estateValue} />
                <QuickStat label="Alleged Deceased Linked" value={caseRecord.allegedDeceasedLinked ? 'Yes' : 'No'} />
                <QuickStat label="Current Owner" value={caseRecord.stage} />
                <QuickStat label="Next Action" value={caseRecord.nextAction} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="mb-4 font-semibold text-slate-900">Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><FileText className="mr-2 h-4 w-4" />Upload confirmation page</Button>
                <Button variant="outline" className="w-full justify-start"><Clock className="mr-2 h-4 w-4" />Schedule meeting</Button>
                <Button variant="outline" className="w-full justify-start"><Users className="mr-2 h-4 w-4" />Notify approved proxy</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-slate-200 pt-8">
      <h3 className="mb-4 font-semibold text-slate-900">{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-sm text-slate-600">{label}</p>
      <p className="font-medium text-slate-900">{value}</p>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-right text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}
