'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Shield,
  Upload,
  MessageSquare,
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'document_upload' | 'status_change' | 'approval' | 'comment' | 'kyc' | 'flag';
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface ActivityLogProps {
  activities?: Activity[];
  caseId: string;
}

const activityTypeConfig = {
  document_upload: {
    icon: Upload,
    color: 'bg-green-50 text-green-700',
    badge: 'bg-green-100 text-green-800',
  },
  status_change: {
    icon: CheckCircle,
    color: 'bg-blue-50 text-blue-700',
    badge: 'bg-blue-100 text-blue-800',
  },
  approval: {
    icon: Shield,
    color: 'bg-purple-50 text-purple-700',
    badge: 'bg-purple-100 text-purple-800',
  },
  comment: {
    icon: MessageSquare,
    color: 'bg-yellow-50 text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  kyc: {
    icon: User,
    color: 'bg-indigo-50 text-indigo-700',
    badge: 'bg-indigo-100 text-indigo-800',
  },
  flag: {
    icon: AlertCircle,
    color: 'bg-red-50 text-red-700',
    badge: 'bg-red-100 text-red-800',
  },
};

const defaultActivities: Activity[] = [
  {
    id: '1',
    type: 'document_upload',
    title: 'Document Uploaded',
    description: 'Will document uploaded',
    actor: 'Jane Doe',
    timestamp: '2024-03-15 10:30 AM',
  },
  {
    id: '2',
    type: 'status_change',
    title: 'Status Updated',
    description: 'Case moved to Document Review',
    actor: 'System',
    timestamp: '2024-03-15 11:00 AM',
  },
  {
    id: '3',
    type: 'kyc',
    title: 'KYC Started',
    description: 'KYC verification process initiated',
    actor: 'Officer - John Smith',
    timestamp: '2024-03-15 2:00 PM',
  },
  {
    id: '4',
    type: 'approval',
    title: 'Approval Request',
    description: 'Sent to Mary Johnson for review',
    actor: 'System',
    timestamp: '2024-03-15 2:15 PM',
  },
  {
    id: '5',
    type: 'comment',
    title: 'Comment Added',
    description: 'Needs additional documentation from beneficiaries',
    actor: 'Mary Johnson',
    timestamp: '2024-03-15 3:30 PM',
  },
];

export default function ActivityLog({
  activities = defaultActivities,
  caseId,
}: ActivityLogProps) {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Activity Log</h3>

        <div className="space-y-6">
          {activities.map((activity, index) => {
            const config = activityTypeConfig[activity.type];
            const Icon = config.icon;

            return (
              <div key={activity.id} className="relative">
                <div className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {index < activities.length - 1 && (
                      <div className="w-1 h-16 bg-slate-200 mt-3 mb-3" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">
                        {activity.title}
                      </h4>
                      <Badge className={config.badge} variant="secondary">
                        {activity.type.replace('_', ' ')}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-600 mb-2">
                      {activity.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{activity.actor}</span>
                      <span>{activity.timestamp}</span>
                    </div>

                    {activity.metadata && (
                      <div className="mt-3 p-2 bg-slate-50 rounded text-xs">
                        {Object.entries(activity.metadata).map(([key, value]) => (
                          <div key={key} className="text-slate-600">
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-8">
            <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-600">No activities yet</p>
          </div>
        )}
      </div>
    </Card>
  );
}
