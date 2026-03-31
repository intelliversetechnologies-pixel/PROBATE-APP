'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { complianceChecks, workflowGuardrails } from '@/lib/probadmin-data';

const statusConfig: Record<string, { icon: any; color: string }> = {
  'Passed': { icon: CheckCircle, color: 'bg-green-50 text-green-700' },
  'Pending': { icon: Clock, color: 'bg-yellow-50 text-yellow-700' },
  'In Review': { icon: Clock, color: 'bg-blue-50 text-blue-700' },
  'Attention Required': { icon: AlertCircle, color: 'bg-red-50 text-red-700' },
};

export default function CompliancePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Compliance & Verification</h1>
        <p className="text-slate-600">Validate governance rules, proxy eligibility, Estock / EDAS checks, and transmission readiness.</p>
      </div>

      <Card className="mb-8">
        <div className="p-6">
          <h3 className="mb-4 font-semibold text-slate-900">Governance Rules Active</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {workflowGuardrails.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {complianceChecks.map((check) => {
          const config = statusConfig[check.status];
          const Icon = config.icon;

          return (
            <Card key={check.id}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">{check.checkType}</h3>
                      <Badge className={config.color}>
                        <Icon className="w-4 h-4 mr-1" />
                        {check.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-slate-600">Case ID</p>
                        <p className="font-medium text-slate-900">{check.caseId}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Last Checked</p>
                        <p className="font-medium text-slate-900">{check.lastChecked}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Owner</p>
                        <p className="font-medium text-slate-900">{check.owner}</p>
                      </div>
                      <div className="text-right">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-600">{check.note}</p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
