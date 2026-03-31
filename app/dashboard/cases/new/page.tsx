'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { requiredDocumentPack, workflowGuardrails } from '@/lib/probadmin-data';

export default function NewCasePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    deceasedName: '',
    nin: '',
    dateOfDeath: '',
    clientLead: '',
    clientPhone: '',
    clientEmail: '',
    intakeChannel: 'onsite',
    requestType: 'alleged-deceased',
    gateway: 'frisops-dcp',
    proxyType: 'self',
    proxyName: '',
    courtCode: '',
    bankRef: '',
    estateValue: '',
    meetingMode: 'physical',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      router.push('/dashboard/cases');
    }, 1000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/dashboard/cases" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Probate Register
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Create New Probadmin Request</h1>
        <p className="text-slate-600 mt-2">
          Capture intake channel, approved proxy details, codification references, and the mandatory
          probate document pack before routing work into FRISOPS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Request Type and Gateway</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requestType">Request Type</Label>
                    <Select value={formData.requestType} onValueChange={(value) => handleSelectChange('requestType', value)}>
                      <SelectTrigger id="requestType"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alleged-deceased">Alleged Deceased</SelectItem>
                        <SelectItem value="letters-of-administration">Letters of Administration</SelectItem>
                        <SelectItem value="will-processing">Will Processing</SelectItem>
                        <SelectItem value="survivorship">Survivorship / ownership change</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="intakeChannel">Intake Channel</Label>
                    <Select value={formData.intakeChannel} onValueChange={(value) => handleSelectChange('intakeChannel', value)}>
                      <SelectTrigger id="intakeChannel"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onsite">Onsite Visit</SelectItem>
                        <SelectItem value="stockbroker-onsite">Through Stockbroker Onsite</SelectItem>
                        <SelectItem value="legal-firm">Through Legal Firm</SelectItem>
                        <SelectItem value="portal">Online Portal</SelectItem>
                        <SelectItem value="fris-info">Through FRIS Info</SelectItem>
                        <SelectItem value="stockbroker-module">Stockbroker Module</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gateway">Receiving Gateway</Label>
                  <Select value={formData.gateway} onValueChange={(value) => handleSelectChange('gateway', value)}>
                    <SelectTrigger id="gateway"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frisops-dcp">FRISOPS DCP</SelectItem>
                      <SelectItem value="probadmin-portal">Probadmin Portal</SelectItem>
                      <SelectItem value="frisl-website">FRISL Website</SelectItem>
                      <SelectItem value="stockbroker-module">Stockbroker Module</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="meetingMode">Meeting Requirement</Label>
                  <Select value={formData.meetingMode} onValueChange={(value) => handleSelectChange('meetingMode', value)}>
                    <SelectTrigger id="meetingMode"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical">Physical with biometrics</SelectItem>
                      <SelectItem value="virtual">Virtual video session</SelectItem>
                      <SelectItem value="hybrid">Hybrid / scheduled later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Deceased Shareholder</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="deceasedName">Full Name</Label>
                    <Input
                      id="deceasedName"
                      name="deceasedName"
                      placeholder="Late Chief Emmanuel Adeyemi"
                      value={formData.deceasedName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nin">NIN</Label>
                    <Input
                      id="nin"
                      name="nin"
                      placeholder="22345678901"
                      value={formData.nin}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfDeath">Date of Death</Label>
                    <Input
                      id="dateOfDeath"
                      name="dateOfDeath"
                      type="date"
                      value={formData.dateOfDeath}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Client and Approved Proxy</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clientLead">Lead Administrator / Executor</Label>
                    <Input
                      id="clientLead"
                      name="clientLead"
                      placeholder="Mrs. Bola Adeyemi"
                      value={formData.clientLead}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientPhone">Phone Number</Label>
                      <Input
                        id="clientPhone"
                        name="clientPhone"
                        placeholder="+234..."
                        value={formData.clientPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientEmail">Email Address</Label>
                      <Input
                        id="clientEmail"
                        name="clientEmail"
                        type="email"
                        placeholder="client@example.com"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="proxyType">Approved Proxy Type</Label>
                      <Select value={formData.proxyType} onValueChange={(value) => handleSelectChange('proxyType', value)}>
                        <SelectTrigger id="proxyType"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="self">Self / Executors</SelectItem>
                          <SelectItem value="law-firm">Law Firm</SelectItem>
                          <SelectItem value="stockbroker">Stockbroker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="proxyName">Approved Proxy Name</Label>
                      <Input
                        id="proxyName"
                        name="proxyName"
                        placeholder="Adewale & Co. Chambers"
                        value={formData.proxyName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Codification and Controls</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courtCode">Court Code / Reference</Label>
                    <Input
                    id="courtCode"
                    name="courtCode"
                    placeholder="PHC/B20026"
                    value={formData.courtCode}
                    onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankRef">Bank Certificate / BC Reference</Label>
                    <Input
                      id="bankRef"
                      name="bankRef"
                      placeholder="BC-2026-0045"
                      value={formData.bankRef}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estateValue">Estimated Share Value</Label>
                  <Input
                    id="estateValue"
                    name="estateValue"
                    placeholder="NGN 18,400,000"
                    value={formData.estateValue}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Expected Output</Label>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    Generate control code, bind documents, trigger payment and stakeholder workflow.
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Workflow Notes</Label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Capture approved proxy caveats, feedback commitments, digitization notes, or exceptional routing instructions..."
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-6 border-t border-slate-200">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? 'Routing Request...' : 'Create Request'}
                </Button>
                <Link href="/dashboard/cases" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Required Document Pack</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                {requiredDocumentPack.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Routing Rules</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                {workflowGuardrails.slice(0, 3).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Codification Output</h3>
              <p className="text-sm text-slate-600">
                The platform should generate a unique code like <span className="font-medium">PHC/B20026/FRISLPB/100007</span> and reuse it across bank, court, KYC, compliance, payment, and transmission actions.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
