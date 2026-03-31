'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Clock, CheckCircle, AlertCircle, Trash2, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'approval' | 'document' | 'warning' | 'success' | 'info';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

interface NotificationsHubProps {
  notifications?: Notification[];
}

const defaultNotifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Approval Request',
    description: 'Case PRB-2024-001 is awaiting your review',
    timestamp: '5 minutes ago',
    read: false,
    actionUrl: '/dashboard/cases/PRB-2024-001',
    actionLabel: 'Review Now',
  },
  {
    id: '2',
    type: 'document',
    title: 'Document Uploaded',
    description: 'New will document uploaded for case PRB-2024-002',
    timestamp: '1 hour ago',
    read: false,
    actionUrl: '/dashboard/documents',
    actionLabel: 'View Document',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Pending Action Required',
    description: 'KYC verification deadline approaching for case PRB-2024-003',
    timestamp: '2 hours ago',
    read: true,
    actionUrl: '/dashboard/cases/PRB-2024-003',
    actionLabel: 'View Case',
  },
  {
    id: '4',
    type: 'success',
    title: 'Case Approved',
    description: 'Case PRB-2024-004 has been successfully approved',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'System Update',
    description: 'Scheduled maintenance completed successfully',
    timestamp: '2 days ago',
    read: true,
  },
];

const typeConfig = {
  approval: { icon: Clock, color: 'bg-blue-50 text-blue-700', badge: 'bg-blue-100 text-blue-800' },
  document: { icon: AlertCircle, color: 'bg-green-50 text-green-700', badge: 'bg-green-100 text-green-800' },
  warning: { icon: AlertCircle, color: 'bg-yellow-50 text-yellow-700', badge: 'bg-yellow-100 text-yellow-800' },
  success: { icon: CheckCircle, color: 'bg-green-50 text-green-700', badge: 'bg-green-100 text-green-800' },
  info: { icon: Bell, color: 'bg-slate-50 text-slate-700', badge: 'bg-slate-100 text-slate-800' },
};

export default function NotificationsHub({
  notifications = defaultNotifications,
}: NotificationsHubProps) {
  const [notifs, setNotifs] = useState(notifications);
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifs.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifs.map((notification) => {
                const config = typeConfig[notification.type];
                const Icon = config.icon;

                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-slate-50 transition ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`p-2 rounded ${config.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-slate-900 text-sm">
                            {notification.title}
                          </h4>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          {notification.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            {notification.timestamp}
                          </span>
                          {notification.actionUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(notification.id)}
                            >
                              {notification.actionLabel || 'View'}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {notifs.length > 0 && (
          <div className="p-4 border-t border-slate-200">
            <Button variant="ghost" className="w-full">
              View All Notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
