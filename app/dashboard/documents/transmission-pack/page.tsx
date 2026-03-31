'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BadgePercent, CheckCircle2, FileText, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  premiumAdditionalSupport,
  premiumFinancingConditions,
  premiumServiceFeeTerms,
  premiumTransmissionSupport,
  transmissionFeeItems,
  transmissionRequirementSections,
} from '@/lib/probadmin-data';

type ChecklistState = Record<string, boolean>;

function buildInitialChecklist() {
  return transmissionRequirementSections.reduce<ChecklistState>((acc, section) => {
    section.items.forEach((_, index) => {
      acc[`${section.id}-${index}`] = false;
    });
    return acc;
  }, {});
}

export default function TransmissionPackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [premiumSelected, setPremiumSelected] = useState<boolean | null>(null);
  const [financingSelected, setFinancingSelected] = useState<boolean | null>(null);
  const [checklist, setChecklist] = useState<ChecklistState>(buildInitialChecklist);
  const [formData, setFormData] = useState({
    controlCode: '',
    shareholderName: '',
    estateValue: '',
    applicantName: '',
    declarationName: '',
    declarationSignature: '',
    declarationDate: '',
    declarationPhone: '',
    consentStatement: '',
    financingUndertaking: '',
    financingApprovalNote: '',
    notes: '',
  });

  const completedCount = useMemo(
    () => Object.values(checklist).filter(Boolean).length,
    [checklist],
  );

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const toggleChecklistItem = (key: string, checked: boolean) => {
    setChecklist((current) => ({ ...current, [key]: checked }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link href="/dashboard/documents" className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            Back to Probate Document Pack
          </Link>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Transmission Request Pack</h1>
              <p className="mt-2 text-slate-600">
                Digital version of the transmission requirements sheet and premium service consent form.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Progress</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{completedCount}</p>
          <p className="text-sm text-slate-500">Requirement items checked off</p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
        <Card>
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Requirements for transmission of shares</CardTitle>
            <CardDescription>
              Use this digital pack to capture the documents, charges, and client consent needed to process transmission for a deceased shareholder.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="controlCode">Control code</Label>
                  <Input
                    id="controlCode"
                    name="controlCode"
                    placeholder="PHC/B20026/FRISLPB/100007"
                    value={formData.controlCode}
                    onChange={handleFieldChange}
                  />
                </div>
                <div>
                  <Label htmlFor="shareholderName">Deceased shareholder</Label>
                  <Input
                    id="shareholderName"
                    name="shareholderName"
                    placeholder="Late Chief Emmanuel Adeyemi"
                    value={formData.shareholderName}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="applicantName">Administrator / executor</Label>
                  <Input
                    id="applicantName"
                    name="applicantName"
                    placeholder="Mrs. Bola Adeyemi"
                    value={formData.applicantName}
                    onChange={handleFieldChange}
                  />
                </div>
                <div>
                  <Label htmlFor="estateValue">Estimated holding value</Label>
                  <Input
                    id="estateValue"
                    name="estateValue"
                    placeholder="NGN 18,400,000"
                    value={formData.estateValue}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {transmissionRequirementSections.map((section) => (
                  <div key={section.id} className="rounded-3xl border border-slate-200 bg-white p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">({section.code})</p>
                    <h2 className="mt-1 text-lg font-semibold text-slate-900">{section.title}</h2>
                    <div className="mt-5 space-y-3">
                      {section.items.map((item, index) => {
                        const key = `${section.id}-${index}`;

                        return (
                          <label
                            key={key}
                            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
                          >
                            <Checkbox
                              checked={checklist[key]}
                              onCheckedChange={(checked) => toggleChecklistItem(key, checked === true)}
                              className="mt-0.5"
                            />
                            <span className="text-sm leading-6 text-slate-700">{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3">
                  <BadgePercent className="h-5 w-5 text-slate-700" />
                  <h2 className="text-lg font-semibold text-slate-900">Fees & statutory charges</h2>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {transmissionFeeItems.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-amber-700" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Client election</h2>
                    <p className="text-sm leading-6 text-slate-600">
                      Would you like to opt for the Premium Transmission Service?
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <Button
                    type="button"
                    variant={premiumSelected === true ? 'default' : 'outline'}
                    onClick={() => setPremiumSelected(true)}
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={premiumSelected === false ? 'default' : 'outline'}
                    onClick={() => setPremiumSelected(false)}
                  >
                    No
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900">Premium transmission service (optional)</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  In addition to the standard transmission process, the client may opt for premium support where closer handling and periodic updates are required.
                </p>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">Scope of support</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                      {premiumTransmissionSupport.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">Additional support where applicable</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                      {premiumAdditionalSupport.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900">Financing option (for premium clients only)</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Financing support may be considered for clients under the premium service, subject to management approval and a written undertaking.
                </p>

                <div className="mt-5 flex gap-3">
                  <Button
                    type="button"
                    variant={financingSelected === true ? 'default' : 'outline'}
                    onClick={() => setFinancingSelected(true)}
                  >
                    Financing requested
                  </Button>
                  <Button
                    type="button"
                    variant={financingSelected === false ? 'default' : 'outline'}
                    onClick={() => setFinancingSelected(false)}
                  >
                    No financing
                  </Button>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Conditions</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                    {premiumFinancingConditions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="financingUndertaking">Written undertaking reference</Label>
                    <Input
                      id="financingUndertaking"
                      name="financingUndertaking"
                      placeholder="UND-2026-001"
                      value={formData.financingUndertaking}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="financingApprovalNote">Management approval note</Label>
                    <Input
                      id="financingApprovalNote"
                      name="financingApprovalNote"
                      placeholder="Approved by HOD / pending review"
                      value={formData.financingApprovalNote}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center gap-3">
                  <BadgePercent className="h-5 w-5 text-slate-700" />
                  <h2 className="text-lg font-semibold text-slate-900">Premium service fee</h2>
                </div>
                <div className="mt-4 grid gap-3">
                  {premiumServiceFeeTerms.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900">Premium service consent form</h2>
                <div className="mt-5 grid gap-4">
                  <div>
                    <Label htmlFor="consentStatement">Consent statement</Label>
                    <Input
                      id="consentStatement"
                      name="consentStatement"
                      placeholder="I/We hereby elect to opt for the Premium Transmission Service"
                      value={formData.consentStatement}
                      onChange={handleFieldChange}
                    />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">I/We understand that:</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                      <li>The service is optional and does not replace the standard transmission process.</li>
                      <li>The applicable fee is 5% of total holding and remains negotiable.</li>
                      <li>VAT applies where applicable.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">Declaration</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      I/We authorise First Registrars & Investor Services to proceed based on the selected service option.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="declarationName">Name</Label>
                      <Input
                        id="declarationName"
                        name="declarationName"
                        placeholder="Full name"
                        value={formData.declarationName}
                        onChange={handleFieldChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="declarationSignature">Signature</Label>
                      <Input
                        id="declarationSignature"
                        name="declarationSignature"
                        placeholder="Type full name as e-signature"
                        value={formData.declarationSignature}
                        onChange={handleFieldChange}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="declarationDate">Date</Label>
                      <Input
                        id="declarationDate"
                        name="declarationDate"
                        type="date"
                        value={formData.declarationDate}
                        onChange={handleFieldChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="declarationPhone">Phone number</Label>
                      <Input
                        id="declarationPhone"
                        name="declarationPhone"
                        placeholder="+234..."
                        value={formData.declarationPhone}
                        onChange={handleFieldChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Internal notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="mt-2"
                  placeholder="Capture fee negotiation notes, premium service remarks, or missing document issues..."
                  value={formData.notes}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Saving Pack...' : 'Save Transmission Pack'}
                </Button>
                <Link href="/dashboard/documents">
                  <Button type="button" variant="outline">Return to Documents</Button>
                </Link>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  The transmission requirements and premium consent pack have been captured digitally.
                </div>
              ) : null}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-base text-slate-900">Summary</CardTitle>
              <CardDescription>Snapshot of the current transmission submission.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Control code</p>
                <p className="mt-2 text-sm text-slate-900">{formData.controlCode || 'Not entered yet'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Premium service</p>
                <p className="mt-2 text-sm text-slate-900">
                  {premiumSelected === null ? 'Not selected yet' : premiumSelected ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Financing option</p>
                <p className="mt-2 text-sm text-slate-900">
                  {financingSelected === null ? 'Not selected yet' : financingSelected ? 'Requested' : 'Not requested'}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Applicant</p>
                <p className="mt-2 text-sm text-slate-900">{formData.applicantName || 'Not entered yet'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-base text-slate-900">Workflow notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-6 text-sm leading-6 text-slate-600">
              <p>This digital pack combines the requirements sheet and the premium service consent page into one workflow-friendly entry point.</p>
              <p>Fee lines remain editable later when you connect this screen to payment logic or a live case record.</p>
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-900">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                  <p className="text-sm leading-6">
                    Next step: link the submitted pack to `payments.ts` if you want fees and premium-service choices to generate charges automatically.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
