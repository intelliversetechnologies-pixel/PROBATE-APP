'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface ApprovalRequestModalProps {
  caseId: string;
  onSubmit: (data: ApprovalRequestData) => void;
  onCancel: () => void;
}

export interface ApprovalRequestData {
  approvalType: string;
  approver: string;
  priority: string;
  requiredDocuments: string[];
  notes: string;
}

const approvalTypes = [
  { id: 'document_review', label: 'Document Review' },
  { id: 'kyc_verification', label: 'KYC Verification' },
  { id: 'otp_verification', label: 'OTP Verification' },
  { id: 'director_approval', label: 'Director Approval' },
  { id: 'compliance_check', label: 'Compliance Check' },
];

const approvers = [
  { id: 'officer_1', label: 'John Smith (Officer)' },
  { id: 'officer_2', label: 'Mary Johnson (Officer)' },
  { id: 'compliance', label: 'Compliance Team' },
  { id: 'director', label: 'Director' },
];

export default function ApprovalRequestModal({
  caseId,
  onSubmit,
  onCancel,
}: ApprovalRequestModalProps) {
  const [formData, setFormData] = useState<ApprovalRequestData>({
    approvalType: '',
    approver: '',
    priority: 'normal',
    requiredDocuments: [],
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Request Approval</h3>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Case Info */}
            <div>
              <Label className="text-slate-600">Case ID</Label>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-900">{caseId}</p>
              </div>
            </div>

            {/* Approval Type */}
            <div>
              <Label htmlFor="approvalType">Approval Type</Label>
              <Select
                value={formData.approvalType}
                onValueChange={(value) => handleSelectChange('approvalType', value)}
              >
                <SelectTrigger id="approvalType">
                  <SelectValue placeholder="Select approval type" />
                </SelectTrigger>
                <SelectContent>
                  {approvalTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Approver */}
            <div>
              <Label htmlFor="approver">Send To</Label>
              <Select
                value={formData.approver}
                onValueChange={(value) => handleSelectChange('approver', value)}
              >
                <SelectTrigger id="approver">
                  <SelectValue placeholder="Select approver" />
                </SelectTrigger>
                <SelectContent>
                  {approvers.map((approver) => (
                    <SelectItem key={approver.id} value={approver.id}>
                      {approver.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange('priority', value)}
              >
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Add any additional notes for the approver..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Button type="submit" className="flex-1">
                Send Request
              </Button>
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
