'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account and system preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="john@frisl.com" disabled />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input placeholder="+234 (0) 123 456 7890" />
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-6 flex gap-3">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Case Status Updates</p>
                    <p className="text-sm text-slate-600">Receive notifications when case status changes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <div>
                    <p className="font-medium text-slate-900">Document Uploads</p>
                    <p className="text-sm text-slate-600">Receive notifications when documents are uploaded</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <div>
                    <p className="font-medium text-slate-900">Approval Requests</p>
                    <p className="text-sm text-slate-600">Receive notifications for approval requests</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              </div>
              <div className="border-t border-slate-200 pt-6">
                <Button>Save Preferences</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input type="password" />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input type="password" />
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-6 flex gap-3">
                <Button>Change Password</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <Card>
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">System Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">Application Version</p>
                  <p className="font-medium text-slate-900">1.0.0</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Last Updated</p>
                  <p className="font-medium text-slate-900">2024-03-15</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Database Status</p>
                  <p className="font-medium text-green-600">Connected</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
