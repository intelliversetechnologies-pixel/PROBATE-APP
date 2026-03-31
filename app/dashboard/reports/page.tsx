'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Filter } from 'lucide-react';

const caseData = [
  { month: 'Jan', total: 10, completed: 4, pending: 6 },
  { month: 'Feb', total: 18, completed: 10, pending: 8 },
  { month: 'Mar', total: 24, completed: 12, pending: 12 },
];

export default function ReportsPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports & Analytics</h1>
          <p className="text-slate-600">View comprehensive reports and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Cases by Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={caseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#10b981" />
                <Bar dataKey="pending" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Case Volume Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={caseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Key Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-600 text-sm mb-2">Total Cases</p>
              <p className="text-3xl font-bold text-slate-900">24</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-2">Completed</p>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-2">In Progress</p>
              <p className="text-3xl font-bold text-blue-600">8</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-2">Avg. Processing Time</p>
              <p className="text-3xl font-bold text-slate-900">28 days</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
