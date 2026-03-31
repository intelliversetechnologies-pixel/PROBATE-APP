'use client';

import { CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusStep {
  id: string;
  label: string;
  status: 'completed' | 'in-progress' | 'pending' | 'blocked';
  description?: string;
  date?: string;
}

interface CaseStatusTrackerProps {
  steps: StatusStep[];
  currentProgress: number;
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    lineColor: 'bg-green-300',
  },
  'in-progress': {
    icon: Zap,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    lineColor: 'bg-blue-300',
  },
  pending: {
    icon: Clock,
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-700',
    lineColor: 'bg-slate-200',
  },
  blocked: {
    icon: AlertCircle,
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
    lineColor: 'bg-red-300',
  },
};

export default function CaseStatusTracker({ steps, currentProgress }: CaseStatusTrackerProps) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-slate-900">Case Progress</h3>
          <span className="text-sm font-medium text-slate-600">{currentProgress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>

      {/* Status Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const config = statusConfig[step.status];
          const Icon = config.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative">
              <div className="flex gap-4">
                {/* Timeline Icon */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      config.bgColor
                    )}
                  >
                    <Icon className={cn('w-6 h-6', config.textColor)} />
                  </div>

                  {/* Connector Line */}
                  {!isLast && (
                    <div className={cn('w-1 h-16 mt-2 mb-2', config.lineColor)} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900">{step.label}</h4>
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded',
                        config.bgColor,
                        config.textColor
                      )}
                    >
                      {step.status === 'in-progress'
                        ? 'In Progress'
                        : step.status === 'completed'
                          ? 'Completed'
                          : step.status === 'blocked'
                            ? 'Blocked'
                            : 'Pending'}
                    </span>
                  </div>
                  {step.description && (
                    <p className="text-sm text-slate-600 mb-1">{step.description}</p>
                  )}
                  {step.date && (
                    <p className="text-xs text-slate-500">{step.date}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
