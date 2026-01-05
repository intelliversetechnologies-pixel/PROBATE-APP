import { useMemo, useState } from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ClientDocuments() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [previewFile, setPreviewFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [caseCode, setCaseCode] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');
    const { user } = useAuth();

    const apiBase = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5000', []);
    const resolveUrl = (value) => {
        if (!value) return '';
        return value.startsWith('http') ? value : `${apiBase}${value}`;
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files || []);
        setSelectedFiles(files);
        setError('');
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setError('Select at least one file to upload.');
            return;
        }

        setUploading(true);
        setError('');
        try {
            const formData = new FormData();
            selectedFiles.forEach(file => formData.append('documents', file));
            const response = await fetch(`${apiBase}/api/client/uploads`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Upload failed.');
            const payload = await response.json();
            setUploadedFiles(payload.files || []);
            setSelectedFiles([]);
        } catch (err) {
            setError('Unable to upload documents. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setError('');
        try {
            const requestType = localStorage.getItem('probate_request_type') || 'Probate Transmission';
            const response = await fetch(`${apiBase}/api/client/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestType,
                    clientName: user?.name || 'Client'
                })
            });
            if (!response.ok) throw new Error('Submit failed.');
            const payload = await response.json();
            setCaseCode(payload.caseCode || '');
            setSubmitStatus(payload.status || 'Sent to Probate Officer');
        } catch (err) {
            setError('Unable to submit request. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (previewFile) {
        const isImage = previewFile.mimeType?.startsWith('image/');
        return (
            <div className="container" style={{ maxWidth: '900px' }}>
                <div className="card">
                    <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
                        <div>
                            <div className="text-xl font-bold">Preview</div>
                            <div className="text-sm text-muted">{previewFile.originalName}</div>
                        </div>
                        <button className="btn btn-secondary" onClick={() => setPreviewFile(null)}>
                            Back
                        </button>
                    </div>
                    {isImage ? (
                        <img
                            src={resolveUrl(previewFile.url)}
                            alt={previewFile.originalName}
                            style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '12px' }}
                        />
                    ) : (
                        <div className="text-sm text-muted">
                            This file type cannot be previewed here. Use the download link below.
                        </div>
                    )}
                    <div style={{ marginTop: '1rem' }}>
                        <a className="btn btn-primary" href={resolveUrl(previewFile.url)} target="_blank" rel="noreferrer">
                            Open in New Tab
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
                    <div>
                        <div className="text-xl font-bold">Document Uploads</div>
                        <div className="text-sm text-muted">Upload required files for your probate request.</div>
                    </div>
                    <Link to="/client" className="btn btn-secondary">Back to Dashboard</Link>
                </div>

                <div className="bg-surface border p-4 rounded-md" style={{ marginBottom: '1rem' }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                        <UploadCloud size={18} />
                        <div className="text-sm text-muted">Accepted: PDF, JPG, PNG. Max 10 files.</div>
                    </div>
                    <input type="file" multiple onChange={handleFileChange} />
                </div>

                {selectedFiles.length > 0 && (
                    <div className="card" style={{ marginBottom: '1rem', padding: '0.75rem' }}>
                        <div className="text-sm text-muted" style={{ marginBottom: '0.5rem' }}>Selected Files</div>
                        <ul className="text-sm" style={{ margin: 0, paddingLeft: '1.1rem' }}>
                            {selectedFiles.map(file => (
                                <li key={`${file.name}-${file.size}`}>{file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {error && <div className="text-sm" style={{ color: 'var(--c-danger)' }}>{error}</div>}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload Documents'}
                    </button>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="text-lg font-bold" style={{ marginBottom: '0.35rem' }}>Submit Request</div>
                <div className="text-sm text-muted">When all documents are uploaded, submit to generate your case code.</div>
                {caseCode && (
                    <div className="card" style={{ marginTop: '1rem', padding: '0.75rem' }}>
                        <div className="text-sm text-muted">System Generated Case Code</div>
                        <div className="text-xl font-bold" style={{ fontFamily: 'monospace' }}>{caseCode}</div>
                        {submitStatus && <div className="text-sm" style={{ color: 'var(--c-secondary)', marginTop: '0.5rem' }}>{submitStatus}</div>}
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="text-lg font-bold" style={{ marginBottom: '1rem' }}>Uploaded Documents</div>
                {uploadedFiles.length === 0 ? (
                    <div className="text-sm text-muted">No uploads yet.</div>
                ) : (
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {uploadedFiles.map(file => (
                            <div key={file.storedName} className="flex items-center justify-between border p-3 rounded-md" style={{ gap: '1rem' }}>
                                <div className="flex items-center gap-2" style={{ minWidth: 0 }}>
                                    {file.mimeType?.startsWith('image/') ? (
                                        <img
                                            src={resolveUrl(file.url)}
                                            alt={file.originalName}
                                            style={{ width: '96px', height: '96px', objectFit: 'cover', borderRadius: '10px' }}
                                        />
                                    ) : (
                                        <FileText size={16} />
                                    )}
                                    <div style={{ minWidth: 0 }}>
                                        <div className="text-sm font-bold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {file.originalName}
                                        </div>
                                        <div className="text-xs text-muted">{Math.round(file.size / 1024)} KB</div>
                                    </div>
                                </div>
                                <button className="btn btn-secondary" onClick={() => setPreviewFile(file)}>
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
