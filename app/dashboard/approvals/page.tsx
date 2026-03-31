'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { approvalRequests } from '@/lib/probadmin-data';

const statusConfig: Record<string, { icon: any; color: string }> = {
  'Pending': { icon: Clock, color: 'bg-yellow-50 text-yellow-700' },
  'In Progress': { icon: Clock, color: 'bg-blue-50 text-blue-700' },
  'Queued': { icon: CheckCircle, color: 'bg-slate-100 text-slate-700' },
  'Rejected': { icon: XCircle, color: 'bg-red-50 text-red-700' },
};

export default function ApprovalsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Workflow Desk</h1>
        <p className="text-slate-600">Manage lawyer, bank, higher-officer, and final transmission approvals in sequence.</p>
      </div>

      <div className="space-y-4">
        {approvalRequests.map((request) => {
          const config = statusConfig[request.status];
          const Icon = config.icon;

          return (
            <Card key={request.id}>
              <div className="p-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{request.type}</h3>
                    <Badge className={config.color}>
                      <Icon className="w-4 h-4 mr-1" />
                      {request.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-slate-600">Control Code</p>
                      <p className="font-medium text-slate-900">{request.caseId}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Current Owner</p>
                      <p className="font-medium text-slate-900">{request.owner}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Submitted</p>
                      <p className="font-medium text-slate-900">{request.submittedDate}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{request.trigger}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Review</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
