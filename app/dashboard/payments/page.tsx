'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { invoices, paymentChannels, payments } from '@/lib/probadmin-data';

const statusConfig = {
  Paid: { color: 'bg-green-50 text-green-700', icon: CheckCircle },
  'Estimate Shared': { color: 'bg-yellow-50 text-yellow-700', icon: AlertCircle },
  'Posted To Finance': { color: 'bg-blue-50 text-blue-700', icon: AlertCircle },
};

const stats = [
  { label: 'Statutory and Management Fees', value: 'NGN 130,000', change: 'linked to control codes' },
  { label: 'Receipts Uploaded', value: '2', change: 'visible to finance and probate desks' },
  { label: 'Estimate Shared', value: '1', change: 'recalculation clause attached' },
  { label: 'KYC Internal Charges', value: '1', change: 'continues without live payment' },
];

export default function PaymentsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Payments & Invoices</h1>
        <p className="text-slate-600">
          Trigger Paystack or Remita links, handle finance-counter receipts, and post KYC invoices back into the probate file.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="p-6">
              <p className="text-sm text-slate-600">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.change}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Payment Channels</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {paymentChannels.map((channel) => (
              <div key={channel.label} className="rounded-xl border border-slate-200 p-4">
                <p className="font-medium text-slate-900">{channel.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{channel.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="guidance">Guidance</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Invoice</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Control Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => {
                    const statusInfo = statusConfig[invoice.status as keyof typeof statusConfig];
                    const StatusIcon = statusInfo.icon;

                    return (
                      <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">{invoice.id}</p>
                          <p className="text-xs text-slate-500">{invoice.issuedDate}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{invoice.caseId}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{invoice.title}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{invoice.amount}</td>
                        <td className="px-6 py-4 text-sm">
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                            </Button>
                            {invoice.status === 'Estimate Shared' && (
                              <Button size="sm" variant="outline">Send Link</Button>
                            )}
                          </div>
                          <p className="mt-2 text-xs text-slate-500">{invoice.note}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Transaction ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Invoice</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Method</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Reference</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{payment.id}</td>
                      <td className="px-6 py-4 text-sm text-blue-600">{payment.invoiceId}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{payment.amount}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{payment.method}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{payment.reference}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{payment.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge className="bg-slate-100 text-slate-700">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {payment.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="guidance">
          <Card>
            <div className="p-6">
              <h3 className="mb-6 text-lg font-semibold text-slate-900">Operational Guidance</h3>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="rounded-lg border border-slate-200 p-4">
                  When collection is acknowledged, the client and approved proxy should receive payment instructions, calculation notes, and meeting requirements.
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  For physical finance payments, the receipt should be uploaded by DCP and bound to the same probate file so finance and probate communities stay aligned.
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  KYC charges may be posted to finance while verification continues; live payment is not always required before KYC action starts.
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
