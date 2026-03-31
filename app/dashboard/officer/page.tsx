'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle, AlertCircle, User, FileText } from 'lucide-react';
import Link from 'next/link';

const pendingTasks = [
  {
    id: 1,
    caseId: 'PRB-2024-001',
    deceased: 'John Doe',
    taskType: 'Document Review',
    priority: 'high',
    daysOld: 3,
    progress: 60,
  },
  {
    id: 2,
    caseId: 'PRB-2024-002',
    deceased: 'Jane Smith',
    taskType: 'KYC Verification',
    priority: 'normal',
    daysOld: 1,
    progress: 30,
  },
  {
    id: 3,
    caseId: 'PRB-2024-005',
    deceased: 'Michael Brown',
    taskType: 'Approval Request',
    priority: 'urgent',
    daysOld: 5,
    progress: 80,
  },
];

const completedTasks = [
  {
    id: 4,
    caseId: 'PRB-2024-003',
    deceased: 'Robert Johnson',
    taskType: 'Document Review',
    completedDate: '2024-03-10',
  },
  {
    id: 5,
    caseId: 'PRB-2024-004',
    deceased: 'Mary Williams',
    taskType: 'KYC Verification',
    completedDate: '2024-03-08',
  },
];

const priorityColors = {
  urgent: 'bg-red-50 text-red-700',
  high: 'bg-orange-50 text-orange-700',
  normal: 'bg-blue-50 text-blue-700',
  low: 'bg-green-50 text-green-700',
};

const stats = [
  { label: 'Tasks in Queue', value: '12', icon: Clock, color: 'bg-blue-50 text-blue-600' },
  { label: 'Completed Today', value: '5', icon: CheckCircle, color: 'bg-green-50 text-green-600' },
  { label: 'Overdue', value: '2', icon: AlertCircle, color: 'bg-red-50 text-red-600' },
  { label: 'Pending Approval', value: '3', icon: FileText, color: 'bg-purple-50 text-purple-600' },
];

export default function OfficerDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Officer Dashboard</h1>
        <p className="text-slate-600">Manage your pending tasks and case reviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="pending">Pending Tasks ({pendingTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
          <TabsTrigger value="queue">Review Queue</TabsTrigger>
        </TabsList>

        {/* Pending Tasks Tab */}
        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <Card key={task.id}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {task.caseId} - {task.deceased}
                        </h3>
                        <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mb-3">{task.taskType}</p>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-600">Progress</span>
                          <span className="text-xs font-medium text-slate-900">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-slate-500">
                        In queue for {task.daysOld} day{task.daysOld > 1 ? 's' : ''}
                      </p>
                    </div>

                    <Link href={`/dashboard/cases/${task.caseId}`}>
                      <Button className="ml-4">Review</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Tasks Tab */}
        <TabsContent value="completed">
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                      Case ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                      Deceased Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                      Task Type
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                      Completed Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {completedTasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-6 text-sm font-medium text-blue-600">
                        <Link href={`/dashboard/cases/${task.caseId}`}>{task.caseId}</Link>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-900">{task.deceased}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{task.taskType}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{task.completedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Queue Tab */}
        <TabsContent value="queue">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Review Queue</h3>

              <div className="space-y-4">
                {pendingTasks.map((task, idx) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-slate-600">#{idx + 1}</span>
                        <h4 className="font-medium text-slate-900 truncate">
                          {task.caseId} - {task.deceased}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-600">{task.taskType}</p>
                    </div>

                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900">{task.daysOld}d</p>
                        <p className="text-xs text-slate-600">in queue</p>
                      </div>
                      <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </Badge>
                      <Link href={`/dashboard/cases/${task.caseId}`}>
                        <Button size="sm">Open</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
