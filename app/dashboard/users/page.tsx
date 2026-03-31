'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@frisl.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@frisl.com',
    role: 'Officer',
    status: 'Active',
    joinDate: '2024-02-01',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@frisl.com',
    role: 'Compliance Officer',
    status: 'Active',
    joinDate: '2024-02-15',
  },
];

export default function UsersPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">User Management</h1>
          <p className="text-slate-600">Manage system users and their roles</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Role</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Join Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{user.name}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{user.email}</td>
                  <td className="py-4 px-6 text-sm">
                    <Badge className="bg-blue-50 text-blue-700">{user.role}</Badge>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <Badge className="bg-green-50 text-green-700">{user.status}</Badge>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{user.joinDate}</td>
                  <td className="py-4 px-6 text-sm">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
