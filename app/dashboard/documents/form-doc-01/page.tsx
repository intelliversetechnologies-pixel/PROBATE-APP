'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { registrarFormSections } from '@/lib/probadmin-data';

type ChecklistState = Record<string, boolean>;

function buildInitialChecklist() {
  return registrarFormSections.reduce<ChecklistState>((acc, section) => {
    section.items.forEach((_, index) => {
      acc[`${section.id}-${index}`] = false;
    });
    return acc;
  }, {});
}

export default function RegistrarFormDocPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    addressee: 'Dear Sir/Madam',
    company: '',
    subject: '',
    referencedLetterDate: '',
    caseReference: '',
    applicantName: '',
    applicantPhone: '',
    applicantEmail: '',
    notes: '',
  });
  const [sectionEnabled, setSectionEnabled] = useState<Record<string, boolean>>({
    'letters-of-administration': true,
    'change-of-name-marriage': false,
    'company-change-of-name': false,
  });
  const [checklist, setChecklist] = useState<ChecklistState>(buildInitialChecklist);

  const selectedCount = useMemo(
    () => Object.values(checklist).filter(Boolean).length,
    [checklist],
  );

  const activeSections = useMemo(
    () => registrarFormSections.filter((section) => sectionEnabled[section.id]),
    [sectionEnabled],
  );

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const toggleSection = (sectionId: string, checked: boolean) => {
    setSectionEnabled((current) => ({ ...current, [sectionId]: checked }));
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
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Form DOC. 01</h1>
              <p className="mt-2 text-slate-600">
                Digital registrar request form for probate, change-of-name, and company update submissions.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Form status</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{selectedCount}</p>
          <p className="text-sm text-slate-500">Checklist items selected across active sections</p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
        <Card>
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Registrar request letter</CardTitle>
            <CardDescription>
              Structured after the physical First Registrars checklist form you shared, with digital capture fields and section toggles.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" value={formData.date} onChange={handleFieldChange} />
                </div>
                <div>
                  <Label htmlFor="caseReference">Control code / account reference</Label>
                  <Input
                    id="caseReference"
                    name="caseReference"
                    placeholder="PHC/B20026/FRISLPB/100007"
                    value={formData.caseReference}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="addressee">Addressee</Label>
                  <Input id="addressee" name="addressee" value={formData.addressee} onChange={handleFieldChange} />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="First Registrars & Investor Services Limited"
                    value={formData.company}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Registration of Letters of Administration"
                    value={formData.subject}
                    onChange={handleFieldChange}
                  />
                </div>
                <div>
                  <Label htmlFor="referencedLetterDate">Letter referred to, dated</Label>
                  <Input
                    id="referencedLetterDate"
                    name="referencedLetterDate"
                    placeholder="30/03/2026"
                    value={formData.referencedLetterDate}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="applicantName">Applicant / proxy name</Label>
                  <Input
                    id="applicantName"
                    name="applicantName"
                    placeholder="Mrs. Bola Adeyemi"
                    value={formData.applicantName}
                    onChange={handleFieldChange}
                  />
                </div>
                <div>
                  <Label htmlFor="applicantPhone">Phone</Label>
                  <Input
                    id="applicantPhone"
                    name="applicantPhone"
                    placeholder="+234..."
                    value={formData.applicantPhone}
                    onChange={handleFieldChange}
                  />
                </div>
                <div>
                  <Label htmlFor="applicantEmail">Email</Label>
                  <Input
                    id="applicantEmail"
                    name="applicantEmail"
                    placeholder="client@example.com"
                    value={formData.applicantEmail}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Opening statement</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  We refer to your letter dated <span className="font-medium text-slate-900">{formData.referencedLetterDate || '____________'}</span> and advise that you provide us with the following document(s) to enable us attend to your request.
                </p>
              </div>

              <div className="space-y-6">
                {registrarFormSections.map((section) => (
                  <div key={section.id} className="rounded-3xl border border-slate-200 bg-white p-6">
                    <div className="mb-5 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                          ({section.code})
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-slate-900">{section.title}</h2>
                      </div>

                      <label className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                        <Checkbox
                          checked={sectionEnabled[section.id]}
                          onCheckedChange={(checked) => toggleSection(section.id, checked === true)}
                        />
                        Apply this section
                      </label>
                    </div>

                    <div className="space-y-3">
                      {section.items.map((item, index) => {
                        const key = `${section.id}-${index}`;
                        const disabled = !sectionEnabled[section.id];

                        return (
                          <label
                            key={key}
                            className={`flex items-start gap-3 rounded-2xl border p-4 transition ${
                              disabled
                                ? 'border-slate-100 bg-slate-50 text-slate-400'
                                : 'border-slate-200 bg-slate-50/60 hover:border-blue-200 hover:bg-blue-50/40'
                            }`}
                          >
                            <Checkbox
                              checked={checklist[key]}
                              disabled={disabled}
                              onCheckedChange={(checked) => toggleChecklistItem(key, checked === true)}
                              className="mt-0.5"
                            />
                            <span className="text-sm leading-6">{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Label htmlFor="notes">Additional notes / exceptions</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  rows={5}
                  placeholder="Record exceptions, missing documents, sighting remarks, or internal routing notes..."
                  value={formData.notes}
                  onChange={handleFieldChange}
                  className="mt-2"
                />
              </div>

              <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Saving Form...' : 'Save Digital Form'}
                </Button>
                <Link href="/dashboard/documents">
                  <Button type="button" variant="outline">Return to Documents</Button>
                </Link>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  Form DOC. 01 has been captured digitally and is ready to attach to the probate document pack.
                </div>
              ) : null}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-base text-slate-900">Digital summary</CardTitle>
              <CardDescription>Quick view of what will be issued with this form.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Applicant</p>
                <p className="mt-2 text-sm text-slate-900">{formData.applicantName || 'Not entered yet'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Subject</p>
                <p className="mt-2 text-sm text-slate-900">{formData.subject || 'Not entered yet'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Active sections</p>
                <div className="mt-2 space-y-2">
                  {activeSections.length > 0 ? (
                    activeSections.map((section) => (
                      <div key={section.id} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        ({section.code}) {section.title}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No section selected yet.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-base text-slate-900">Form notes</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm leading-6 text-slate-600">
                <p>Banker’s confirmation details are preserved in the checklist so officers can capture all verification requirements digitally.</p>
                <p>The original paper footer text and checklist structure have been converted into reusable workflow fields instead of a static scan.</p>
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-900">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                    <p className="text-sm leading-6">
                      Next step: connect this form to persistence so submitted records can be attached to a case or document register entry.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
