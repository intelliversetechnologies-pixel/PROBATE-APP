'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface OTPVerificationProps {
  approverName: string;
  approverEmail: string;
  caseId: string;
  approvalType: string;
  onVerify: (otp: string, comments: string) => Promise<void>;
  onCancel: () => void;
  resendOTP?: () => Promise<void>;
}

export default function OTPVerification({
  approverName,
  approverEmail,
  caseId,
  approvalType,
  onVerify,
  onCancel,
  resendOTP,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onVerify(otp, comments);
      setSuccess(true);
      setTimeout(() => {
        onCancel();
      }, 2000);
    } catch (err) {
      setError('OTP verification failed. Please try again.');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendOTP) {
      setLoading(true);
      try {
        await resendOTP();
        setTimeLeft(600);
        setCanResend(false);
        setOtp('');
        setError('');
      } catch (err) {
        setError('Failed to resend OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Verification Successful
          </h3>
          <p className="text-slate-600">
            Your approval for case {caseId} has been confirmed.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Verify Approval with OTP
        </h3>

        {/* Case and Approval Info */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-600 mb-1">Case ID</p>
          <p className="font-medium text-slate-900 mb-4">{caseId}</p>

          <p className="text-sm text-slate-600 mb-1">Approval Type</p>
          <p className="font-medium text-slate-900 mb-4">{approvalType}</p>

          <p className="text-sm text-slate-600 mb-1">Approver</p>
          <p className="font-medium text-slate-900">{approverName}</p>
        </div>

        {/* OTP Message */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            An OTP has been sent to {approverEmail}. Enter it below to confirm.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* OTP Input */}
        <div className="mb-4">
          <Label htmlFor="otp" className="mb-2">
            Enter OTP
          </Label>
          <Input
            id="otp"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
              setOtp(value);
            }}
            className="text-center text-2xl tracking-widest font-mono"
            maxLength={6}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-slate-600">
              OTP expires in {formatTime(timeLeft)}
            </span>
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-xs text-slate-500">
                Resend in {Math.ceil(timeLeft / 60)} minutes
              </span>
            )}
          </div>
        </div>

        {/* Comments */}
        <div className="mb-6">
          <Label htmlFor="comments" className="mb-2">
            Comments (Optional)
          </Label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Add any comments regarding this approval..."
            rows={3}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
            className="flex-1"
          >
            {loading ? 'Verifying...' : 'Verify & Approve'}
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            disabled={loading}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
}
