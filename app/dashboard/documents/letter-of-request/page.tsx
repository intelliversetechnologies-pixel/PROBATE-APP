'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, FileSignature, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { letterOfRequestDeclaration } from '@/lib/probadmin-data';

type ContactEntry = {
  name: string;
  address: string;
  phone: string;
  signature: string;
};

function emptyEntry(): ContactEntry {
  return { name: '', address: '', phone: '', signature: '' };
}

export default function LetterOfRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    controlCode: '',
    deceasedFullName: '',
    deceasedLateOf: '',
    requestDate: '',
    requestDay: '',
    requestYear: '',
    companyName: 'First Registrars & Investor Services Ltd',
    officeAddressLine1: 'No. 2 Abebe Village Road, Iganmu',
    officeAddressLine2: 'P.M.B. 12692, Marina, Lagos',
    securityDescription: '',
    requestNarrative:
      'I/We, the undersigned, being the personal representative(s) of the above-named deceased, hereby request you to register me/us in the books of the Company or Corporation as the holder(s) of the above-mentioned security now registered in the name of the said deceased.',
    additionalNotes: '',
  });
  const [administrators, setAdministrators] = useState<ContactEntry[]>([
    emptyEntry(),
    emptyEntry(),
    emptyEntry(),
    emptyEntry(),
  ]);
  const [witnesses, setWitnesses] = useState<ContactEntry[]>([emptyEntry(), emptyEntry()]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const updateEntry = (
    type: 'administrators' | 'witnesses',
    index: number,
    field: keyof ContactEntry,
    value: string,
  ) => {
    const setter = type === 'administrators' ? setAdministrators : setWitnesses;
    setter((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry,
      ),
    );
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
      <div className="mb-8">
        <Link href="/dashboard/documents" className="mb-4 flex items-center gap-2 text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Probate Document Pack
        </Link>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
            <FileSignature className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Letter Of Request</h1>
            <p className="mt-2 text-slate-600">
              Fillable request letter for registration of administrators or executors, including signature and witness schedules.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
        <Card>
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Request packet</CardTitle>
            <CardDescription>
              This digitizes the paper letter of request and the reverse-page administrator and witness signature sheet.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Letter Of Request</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">To be placed on the register as holders in their own right</h2>
                  </div>
                  <Image
                    src="/first-registrars-logo.png"
                    alt="First Registrars"
                    width={120}
                    height={48}
                    className="h-12 w-auto"
                  />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="companyName">Addressee</Label>
                    <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleFieldChange} />
                  </div>
                  <div>
                    <Label htmlFor="controlCode">R. No / control code</Label>
                    <Input
                      id="controlCode"
                      name="controlCode"
                      placeholder="PHC/B20026/FRISLPB/100007"
                      value={formData.controlCode}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="officeAddressLine1">Office address line 1</Label>
                    <Input
                      id="officeAddressLine1"
                      name="officeAddressLine1"
                      value={formData.officeAddressLine1}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="officeAddressLine2">Office address line 2</Label>
                    <Input
                      id="officeAddressLine2"
                      name="officeAddressLine2"
                      value={formData.officeAddressLine2}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
                  <div>
                    <Label htmlFor="deceasedFullName">Full name of deceased</Label>
                    <Input
                      id="deceasedFullName"
                      name="deceasedFullName"
                      placeholder="Late Chief Emmanuel Adeyemi"
                      value={formData.deceasedFullName}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deceasedLateOf">Deceased, late of</Label>
                    <Input
                      id="deceasedLateOf"
                      name="deceasedLateOf"
                      placeholder="Lagos"
                      value={formData.deceasedLateOf}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="requestDate">Dated this</Label>
                    <Input
                      id="requestDate"
                      name="requestDate"
                      placeholder="30"
                      value={formData.requestDate}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="requestDay">Day of</Label>
                    <Input
                      id="requestDay"
                      name="requestDay"
                      placeholder="March"
                      value={formData.requestDay}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="requestYear">Year</Label>
                    <Input
                      id="requestYear"
                      name="requestYear"
                      placeholder="2026"
                      value={formData.requestYear}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="securityDescription">Security / holding description</Label>
                  <Input
                    id="securityDescription"
                    name="securityDescription"
                    placeholder="Ordinary shares in the name of the deceased holder"
                    value={formData.securityDescription}
                    onChange={handleFieldChange}
                  />
                </div>

                <div className="mt-6">
                  <Label htmlFor="requestNarrative">Request narrative</Label>
                  <Textarea
                    id="requestNarrative"
                    name="requestNarrative"
                    rows={5}
                    className="mt-2"
                    value={formData.requestNarrative}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-lg font-semibold text-slate-900">Declaration by the administrator(s) / executor(s)</h2>
                <div className="mt-4 space-y-3">
                  {letterOfRequestDeclaration.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900">Administrator / executor signature schedule</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This portion is to be filled by the administrator or executor.
                </p>
                <div className="mt-5 space-y-5">
                  {administrators.map((entry, index) => (
                    <div key={`admin-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="mb-4 text-sm font-semibold text-slate-900">{index + 1}. Administrator / Executor</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor={`admin-name-${index}`}>Name</Label>
                          <Input
                            id={`admin-name-${index}`}
                            value={entry.name}
                            onChange={(event) => updateEntry('administrators', index, 'name', event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`admin-phone-${index}`}>Phone number</Label>
                          <Input
                            id={`admin-phone-${index}`}
                            value={entry.phone}
                            onChange={(event) => updateEntry('administrators', index, 'phone', event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor={`admin-address-${index}`}>Address</Label>
                        <Textarea
                          id={`admin-address-${index}`}
                          rows={3}
                          value={entry.address}
                          onChange={(event) => updateEntry('administrators', index, 'address', event.target.value)}
                        />
                      </div>
                      <div className="mt-4">
                        <Label htmlFor={`admin-signature-${index}`}>Signature</Label>
                        <Input
                          id={`admin-signature-${index}`}
                          placeholder="Type full name as e-signature"
                          value={entry.signature}
                          onChange={(event) => updateEntry('administrators', index, 'signature', event.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900">Witness section</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This portion is to be filled by witnesses.
                </p>
                <div className="mt-5 space-y-5">
                  {witnesses.map((entry, index) => (
                    <div key={`witness-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="mb-4 text-sm font-semibold text-slate-900">Witness {index + 1}</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor={`witness-name-${index}`}>Name</Label>
                          <Input
                            id={`witness-name-${index}`}
                            value={entry.name}
                            onChange={(event) => updateEntry('witnesses', index, 'name', event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`witness-phone-${index}`}>Phone number</Label>
                          <Input
                            id={`witness-phone-${index}`}
                            value={entry.phone}
                            onChange={(event) => updateEntry('witnesses', index, 'phone', event.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor={`witness-address-${index}`}>Address</Label>
                        <Textarea
                          id={`witness-address-${index}`}
                          rows={3}
                          value={entry.address}
                          onChange={(event) => updateEntry('witnesses', index, 'address', event.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="additionalNotes">Additional notes</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={4}
                  className="mt-2"
                  placeholder="Record internal comments, identity verification notes, or follow-up remarks..."
                  value={formData.additionalNotes}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Saving Letter...' : 'Save Letter Of Request'}
                </Button>
                <Link href="/dashboard/documents">
                  <Button type="button" variant="outline">Return to Documents</Button>
                </Link>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  The letter of request and signature schedule have been captured digitally.
                </div>
              ) : null}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-base text-slate-900">Summary</CardTitle>
              <CardDescription>Quick view of the current request packet.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Deceased holder</p>
                <p className="mt-2 text-sm text-slate-900">{formData.deceasedFullName || 'Not entered yet'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">R. No / control code</p>
                <p className="mt-2 text-sm text-slate-900">{formData.controlCode || 'Not entered yet'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Executors captured</p>
                <p className="mt-2 text-sm text-slate-900">
                  {administrators.filter((entry) => entry.name || entry.signature).length} of 4
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Witnesses captured</p>
                <p className="mt-2 text-sm text-slate-900">
                  {witnesses.filter((entry) => entry.name).length} of 2
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-slate-200">
              <CardTitle className="text-base text-slate-900">Workflow note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-6 text-sm leading-6 text-slate-600">
              <p>This digital form preserves the two-page office layout, but makes each line item and signer entry fillable.</p>
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-900">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-700" />
                  <p className="text-sm leading-6">
                    Next step: if you want, I can add print styling so this renders as a proper exportable office form.
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
