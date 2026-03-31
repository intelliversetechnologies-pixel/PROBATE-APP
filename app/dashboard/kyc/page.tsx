'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Clock, ExternalLink, Globe, Search, ShieldCheck, Smartphone, UserRoundSearch } from 'lucide-react';
import { kycCases } from '@/lib/probadmin-data';
import { diditProviderMeta, dojahProviderMeta } from '@/lib/kyc-integrations';

const statusConfig = {
  Passed: { icon: CheckCircle, color: 'bg-green-50 text-green-700' },
  Queued: { icon: Clock, color: 'bg-yellow-50 text-yellow-700' },
  Blocked: { icon: AlertCircle, color: 'bg-red-50 text-red-700' },
};

export default function KYCPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [diditForm, setDiditForm] = useState({
    caseId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    identificationNumber: '',
  });
  const [diditResult, setDiditResult] = useState<Record<string, unknown> | null>(null);
  const [diditError, setDiditError] = useState<string | null>(null);
  const [diditLoading, setDiditLoading] = useState(false);
  const [dojahType, setDojahType] = useState<'nin' | 'bvn' | 'phone'>('nin');
  const [dojahForm, setDojahForm] = useState({
    value: '',
    firstName: '',
    lastName: '',
    dob: '',
    customerReference: '',
  });
  const [dojahResult, setDojahResult] = useState<Record<string, unknown> | null>(null);
  const [dojahError, setDojahError] = useState<string | null>(null);
  const [dojahLoading, setDojahLoading] = useState(false);
  const filteredCases = useMemo(
    () =>
      kycCases.filter(
        (item) =>
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.deceased.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.nin.includes(searchTerm),
      ),
    [searchTerm],
  );
  const [selectedId, setSelectedId] = useState(filteredCases[0]?.id ?? kycCases[0].id);
  const selectedCase = filteredCases.find((item) => item.id === selectedId) ?? filteredCases[0] ?? kycCases[0];

  const handleDiditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDiditForm((current) => ({ ...current, [name]: value }));
  };

  const handleDojahChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDojahForm((current) => ({ ...current, [name]: value }));
  };

  const launchDiditSession = async () => {
    setDiditLoading(true);
    setDiditError(null);
    setDiditResult(null);

    try {
      const response = await fetch('/api/kyc/didit/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...diditForm,
          vendorData: diditForm.caseId || selectedCase.id,
          caseId: diditForm.caseId || selectedCase.id,
          userType: 'probate-claimant',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not create Didit session.');
      }

      setDiditResult(data);
    } catch (error) {
      setDiditError(error instanceof Error ? error.message : 'Didit session creation failed.');
    } finally {
      setDiditLoading(false);
    }
  };

  const runDojahLookup = async () => {
    setDojahLoading(true);
    setDojahError(null);
    setDojahResult(null);

    try {
      const response = await fetch('/api/kyc/dojah/lookup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type: dojahType,
          ...dojahForm,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not complete Dojah lookup.');
      }

      setDojahResult(data);
    } catch (error) {
      setDojahError(error instanceof Error ? error.message : 'Dojah lookup failed.');
    } finally {
      setDojahLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">KYC Desk</h1>
        <p className="text-slate-600">
          Run identity, address, and person verification for administrators, executors, and approved proxies, with both Nigeria-specific and global provider flows.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Summary label="Queued" value={String(kycCases.filter((item) => item.status === 'Queued').length)} />
        <Summary label="Passed" value={String(kycCases.filter((item) => item.status === 'Passed').length)} />
        <Summary label="Blocked" value={String(kycCases.filter((item) => item.status === 'Blocked').length)} />
        <Summary label="KYC providers" value="Didit + Dojah" />
      </div>

      <Tabs defaultValue="operations" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="operations">Operations Desk</TabsTrigger>
          <TabsTrigger value="integrations">Provider Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="operations">
          <Card className="mb-8">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by control code, deceased, claimant, or NIN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <div className="p-6">
                <h3 className="mb-4 font-semibold text-slate-900">Verification Queue</h3>
                <div className="space-y-2">
                  {filteredCases.map((item) => {
                    const config = statusConfig[item.status as keyof typeof statusConfig];
                    const Icon = config.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`w-full rounded-lg border p-3 text-left transition ${
                          selectedCase.id === item.id ? 'border-blue-200 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="mb-1 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{item.deceased}</p>
                            <p className="text-xs text-slate-500">{item.id}</p>
                          </div>
                          <Icon className="h-4 w-4 text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-600">{item.claimant}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-2">
              <div className="p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{selectedCase.deceased}</h3>
                    <p className="text-sm text-slate-500">{selectedCase.id}</p>
                  </div>
                  <Badge className={statusConfig[selectedCase.status as keyof typeof statusConfig].color}>
                    {selectedCase.status}
                  </Badge>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-8">
                  <Field label="Claimant / Executor" value={selectedCase.claimant} />
                  <Field label="NIN" value={selectedCase.nin} />
                  <Field label="Handled By" value={selectedCase.verifiedBy} />
                  <Field label="Last Touchpoint" value={selectedCase.verificationDate} />
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h4 className="mb-4 font-semibold text-slate-900">Verification Matrix</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <CheckTile label="Identity Verification" value={selectedCase.identity} />
                    <CheckTile label="Address Verification" value={selectedCase.address} />
                    <CheckTile label="Personality Verification" value={selectedCase.personality} />
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h4 className="mb-3 font-semibold text-slate-900">Operational Note</h4>
                  <p className="text-sm leading-6 text-slate-600">{selectedCase.note}</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <QueueMessage title="Queued" text="Queued files are awaiting identity, address, or person-verification action." />
            <QueueMessage title="Passed" text="Passed files are ready for compliance validation and final transmission checks." />
            <QueueMessage title="Blocked" text="Blocked files require feedback, clarification, or a scheduled stakeholder meeting." />
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ProviderCard
              icon={Globe}
              title={diditProviderMeta.name}
              subtitle="Global KYC lane"
              description={diditProviderMeta.description}
              bullets={[
                'Hosted verification sessions for user-facing flows',
                'ID verification, passive liveness, face match, and IP/fraud signals',
                'Good default for React onboarding journeys across regions',
              ]}
              docsUrl={diditProviderMeta.docsUrl}
            />
            <ProviderCard
              icon={ShieldCheck}
              title={dojahProviderMeta.name}
              subtitle="Nigeria data lane"
              description={dojahProviderMeta.description}
              bullets={[
                'NIN, BVN, and phone-number verification options',
                'Fits probate onboarding tied to Nigerian identity sources',
                'Useful alongside Didit when you need local KYC depth',
              ]}
              docsUrl={dojahProviderMeta.docsUrl}
            />
          </div>

          <Alert className="mb-8 border-blue-200 bg-blue-50 text-blue-950">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Implementation note</AlertTitle>
            <AlertDescription>
              The UI and secure server routes are now in the app. To make live requests, add `DIDIT_API_KEY`, `DIDIT_WORKFLOW_ID`, `DOJAH_APP_ID`, and `DOJAH_SECRET_KEY` to your environment.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <Card>
              <div className="border-b border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Didit Session Launch</h3>
                    <p className="text-sm text-slate-500">Create a hosted verification session for ID, face match, liveness, and fraud checks.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldInput label="Case ID" name="caseId" value={diditForm.caseId} onChange={handleDiditChange} placeholder={selectedCase.id} />
                  <FieldInput label="Identification Number" name="identificationNumber" value={diditForm.identificationNumber} onChange={handleDiditChange} placeholder={selectedCase.nin} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldInput label="First Name" name="firstName" value={diditForm.firstName} onChange={handleDiditChange} placeholder="Bola" />
                  <FieldInput label="Last Name" name="lastName" value={diditForm.lastName} onChange={handleDiditChange} placeholder="Adeyemi" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FieldInput label="Email" name="email" value={diditForm.email} onChange={handleDiditChange} placeholder="client@example.com" />
                  <FieldInput label="Phone" name="phone" value={diditForm.phone} onChange={handleDiditChange} placeholder="+234..." />
                </div>
                <Button onClick={launchDiditSession} disabled={diditLoading} className="w-full">
                  {diditLoading ? 'Creating session...' : 'Create Didit Verification Session'}
                </Button>

                {diditError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Didit error</AlertTitle>
                    <AlertDescription>{diditError}</AlertDescription>
                  </Alert>
                ) : null}

                {diditResult ? (
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                    <p className="text-sm font-semibold text-green-900">Session created</p>
                    <p className="mt-2 text-sm text-green-800">Status: {String(diditResult.status ?? 'Not Started')}</p>
                    <p className="mt-1 text-sm text-green-800">Session ID: {String(diditResult.session_id ?? '')}</p>
                    {typeof diditResult.url === 'string' ? (
                      <a
                        href={diditResult.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-green-900 underline"
                      >
                        Open hosted verification
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </Card>

            <Card>
              <div className="border-b border-slate-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                    <UserRoundSearch className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Dojah Lookup Console</h3>
                    <p className="text-sm text-slate-500">Run Nigerian identity and phone checks from the KYC desk.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant={dojahType === 'nin' ? 'default' : 'outline'} onClick={() => setDojahType('nin')}>
                    NIN
                  </Button>
                  <Button type="button" variant={dojahType === 'bvn' ? 'default' : 'outline'} onClick={() => setDojahType('bvn')}>
                    BVN
                  </Button>
                  <Button type="button" variant={dojahType === 'phone' ? 'default' : 'outline'} onClick={() => setDojahType('phone')}>
                    Phone
                  </Button>
                </div>

                <FieldInput
                  label={dojahType === 'nin' ? 'NIN' : dojahType === 'bvn' ? 'BVN' : 'Phone Number'}
                  name="value"
                  value={dojahForm.value}
                  onChange={handleDojahChange}
                  placeholder={dojahType === 'nin' ? '22345678901' : dojahType === 'bvn' ? '22222222222' : '09011111111'}
                />

                {dojahType === 'bvn' ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    <FieldInput label="First Name" name="firstName" value={dojahForm.firstName} onChange={handleDojahChange} placeholder="John" />
                    <FieldInput label="Last Name" name="lastName" value={dojahForm.lastName} onChange={handleDojahChange} placeholder="Doe" />
                    <FieldInput label="Date of Birth" name="dob" value={dojahForm.dob} onChange={handleDojahChange} placeholder="1990-01-31" />
                  </div>
                ) : null}

                <FieldInput
                  label="Customer Reference"
                  name="customerReference"
                  value={dojahForm.customerReference}
                  onChange={handleDojahChange}
                  placeholder={selectedCase.id}
                />

                <Button onClick={runDojahLookup} disabled={dojahLoading} className="w-full">
                  {dojahLoading ? 'Running lookup...' : `Run ${dojahType.toUpperCase()} Check`}
                </Button>

                {dojahError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Dojah error</AlertTitle>
                    <AlertDescription>{dojahError}</AlertDescription>
                  </Alert>
                ) : null}

                {dojahResult ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                      Dojah response
                    </div>
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-700">
                      {JSON.stringify(dojahResult, null, 2)}
                    </pre>
                  </div>
                ) : null}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <div className="p-6">
        <p className="text-sm text-slate-600">{label}</p>
        <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      </div>
    </Card>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-sm text-slate-600">{label}</p>
      <p className="font-medium text-slate-900">{value}</p>
    </div>
  );
}

function CheckTile({ label, value }: { label: string; value: string }) {
  const tone =
    value === 'Passed'
      ? 'border-green-200 bg-green-50 text-green-800'
      : value === 'Failed'
        ? 'border-red-200 bg-red-50 text-red-800'
        : 'border-slate-200 bg-slate-50 text-slate-700';

  return (
    <div className={`rounded-xl border p-4 ${tone}`}>
      <p className="text-xs uppercase tracking-[0.2em]">{label}</p>
      <p className="mt-3 text-lg font-semibold">{value}</p>
    </div>
  );
}

function QueueMessage({ title, text }: { title: string; text: string }) {
  return (
    <Card>
      <div className="p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</p>
        <p className="mt-3 text-slate-600">{text}</p>
      </div>
    </Card>
  );
}

function ProviderCard({
  icon: Icon,
  title,
  subtitle,
  description,
  bullets,
  docsUrl,
}: {
  icon: typeof Globe;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  docsUrl: string;
}) {
  return (
    <Card>
      <div className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-4 space-y-2">
          {bullets.map((item) => (
            <div key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
        <a
          href={docsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
        >
          View official docs
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </Card>
  );
}

function FieldInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-slate-600">{label}</p>
      <Input name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
