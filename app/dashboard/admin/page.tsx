'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const adminStats = [
  { label: 'Total Cases', value: '156', change: '+12%', icon: FileText, color: 'bg-blue-50 text-blue-600' },
  { label: 'Active Users', value: '24', change: '+5%', icon: Users, color: 'bg-green-50 text-green-600' },
  { label: 'Revenue', value: '₦2.4M', change: '+18%', icon: DollarSign, color: 'bg-purple-50 text-purple-600' },
  { label: 'Pending Review', value: '12', change: '-8%', icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
];

const caseDistribution = [
  { name: 'Completed', value: 45 },
  { name: 'In Progress', value: 67 },
  { name: 'Pending', value: 28 },
  { name: 'On Hold', value: 16 },
];

const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const monthlyData = [
  { month: 'Jan', cases: 10, completed: 4, revenue: 420000 },
  { month: 'Feb', cases: 18, completed: 10, revenue: 680000 },
  { month: 'Mar', cases: 24, completed: 15, revenue: 890000 },
];

const systemLogs = [
  { id: 1, action: 'Case Created', caseId: 'PRB-2024-025', user: 'Jane Doe', timestamp: '2024-03-15 10:30 AM' },
  { id: 2, action: 'Document Approved', caseId: 'PRB-2024-024', user: 'John Smith', timestamp: '2024-03-15 9:45 AM' },
  { id: 3, action: 'Payment Processed', caseId: 'PRB-2024-023', user: 'System', timestamp: '2024-03-15 8:20 AM' },
  { id: 4, action: 'Compliance Check', caseId: 'PRB-2024-022', user: 'Compliance Officer', timestamp: '2024-03-15 7:15 AM' },
];

export default function AdminPanel() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-600">System overview, analytics, and administration controls</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {adminStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-2">{stat.change} from last month</p>
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

      {/* Charts and Tables */}
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Case Distribution */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Case Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={caseDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {caseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Monthly Trend */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Monthly Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cases" fill="#3b82f6" />
                    <Bar dataKey="completed" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Revenue Trend */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <div className="p-6 mb-6 flex gap-3">
              <Button>Add New User</Button>
              <Button variant="outline">Import Users</Button>
              <Button variant="outline">Export</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Name</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Email</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Role</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Last Login</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'John Smith', email: 'john@frisl.com', role: 'Officer', status: 'Active', lastLogin: '2024-03-15' },
                    { name: 'Mary Johnson', email: 'mary@frisl.com', role: 'Officer', status: 'Active', lastLogin: '2024-03-15' },
                    { name: 'Admin User', email: 'admin@frisl.com', role: 'Admin', status: 'Active', lastLogin: '2024-03-15' },
                  ].map((user, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-6 text-sm font-medium text-slate-900">{user.name}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{user.email}</td>
                      <td className="py-4 px-6 text-sm">
                        <Badge className="bg-blue-50 text-blue-700">{user.role}</Badge>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <Badge className="bg-green-50 text-green-700">{user.status}</Badge>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">{user.lastLogin}</td>
                      <td className="py-4 px-6 text-sm">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">System Activity Log</h3>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>

              <div className="space-y-3">
                {systemLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-slate-900">{log.action}</h4>
                        <Badge className="bg-slate-100 text-slate-700">{log.caseId}</Badge>
                      </div>
                      <p className="text-sm text-slate-600">
                        by {log.user} • {log.timestamp}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">System Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Maintenance Mode</p>
                      <p className="text-sm text-slate-600">Enable to restrict access</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Email Notifications</p>
                      <p className="text-sm text-slate-600">Send system alerts via email</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Audit Logging</p>
                      <p className="text-sm text-slate-600">Log all system activities</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600">Require 2FA for all users</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <Button>Save Settings</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
