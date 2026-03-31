'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, X, AlertCircle, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const reviewDocuments = [
  {
    id: 1,
    name: 'Death Certificate',
    uploadedBy: 'Jane Doe',
    uploadDate: '2024-03-15',
    fileSize: '2.4 MB',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Will Document',
    uploadedBy: 'Jane Doe',
    uploadDate: '2024-03-14',
    fileSize: '1.8 MB',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Bank Statements',
    uploadedBy: 'Jane Doe',
    uploadDate: '2024-03-13',
    fileSize: '3.1 MB',
    status: 'pending',
  },
];

export default function DocumentReviewPage({ params }: { params: { caseId: string } }) {
  const [documents, setDocuments] = useState(reviewDocuments);
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'rejected' | null>(null);

  const handleApprove = () => {
    setReviewStatus('approved');
    // Update document status
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === selectedDoc.id ? { ...doc, status: 'approved' } : doc
      )
    );
  };

  const handleReject = () => {
    setReviewStatus('rejected');
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === selectedDoc.id ? { ...doc, status: 'rejected' } : doc
      )
    );
  };

  const pendingCount = documents.filter((d) => d.status === 'pending').length;

  return (
    <div className="p-8">
      {/* Header */}
      <Link href="/dashboard/officer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to Officer Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Document Review</h1>
        <p className="text-slate-600">Case {params.caseId} - Review and approve documents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Document List */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Documents ({pendingCount} pending)</h3>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedDoc.id === doc.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {doc.name}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">{doc.fileSize}</p>
                      </div>
                      {doc.status === 'approved' && (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      )}
                      {doc.status === 'rejected' && (
                        <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Review Section */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{selectedDoc.name}</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Uploaded by {selectedDoc.uploadedBy} on {selectedDoc.uploadDate}
                  </p>
                </div>
                <Badge
                  className={
                    selectedDoc.status === 'approved'
                      ? 'bg-green-50 text-green-700'
                      : selectedDoc.status === 'rejected'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-yellow-50 text-yellow-700'
                  }
                >
                  {selectedDoc.status.charAt(0).toUpperCase() + selectedDoc.status.slice(1)}
                </Badge>
              </div>

              {/* Document Preview Placeholder */}
              <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center mb-6">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600">Document preview would appear here</p>
                </div>
              </div>

              {/* Review Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Review Notes
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add your review notes, comments, or reasons for rejection..."
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Document Details */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg mb-6">
                <div>
                  <p className="text-xs text-slate-600 mb-1">File Size</p>
                  <p className="font-medium text-slate-900">{selectedDoc.fileSize}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Uploaded</p>
                  <p className="font-medium text-slate-900">{selectedDoc.uploadDate}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Status</p>
                  <Badge className="w-fit">
                    {selectedDoc.status === 'pending' ? 'Pending Review' : selectedDoc.status}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedDoc.status === 'pending' && (
                <div className="flex gap-3">
                  <Button
                    onClick={handleApprove}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Document
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject Document
                  </Button>
                </div>
              )}

              {reviewStatus && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${
                  reviewStatus === 'approved'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {reviewStatus === 'approved' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-green-700">Document approved successfully</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <p className="text-sm text-red-700">Document rejected</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </Card>

          {/* Checklist */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Review Checklist</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm text-slate-900">Document is authentic and valid</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm text-slate-900">All required information is present</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-slate-900">Document is legible and clear</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-slate-900">No discrepancies detected</span>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
