import { CheckCircle, XCircle, FileText, Download } from 'lucide-react';

export default function LegalDashboard() {
    return (
        <div className="container" style={{ maxWidth: '100%' }}>
            <h2 className="text-xl mb-6">Legal Review Desk</h2>

            <div className="card">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <div>
                        <h3 className="font-bold text-lg">Probate Transmission - Estate of J. Doe</h3>
                        <span className="text-muted text-sm">Ref: PHC/B20026/FRISLPB</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="btn btn-secondary text-sm">
                            <Download size={16} /> Download Bundle
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    {/* Left: Doc Preview */}
                    <div style={{ backgroundColor: '#F1F5F9', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', border: '2px dashed #CBD5E1', color: '#64748B', flexDirection: 'column', gap: '1rem' }}>
                        <FileText size={48} opacity={0.5} />
                        <p>Document Preview (PDF Viewer Integration)</p>
                        <button className="btn btn-secondary text-sm bg-white">Open in New Tab</button>
                    </div>

                    {/* Right: Actions */}
                    <div>
                        <h4 className="font-bold mb-4">Validation Checklist</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <CheckItem label="Death Certificate Verified against Registry" />
                            <CheckItem label="Will / Letter of Admin Validated" />
                            <CheckItem label="Court Seal Authenticated" />
                            <CheckItem label="Beneficiary Identity confirmed (NIN)" />
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <label className="input-label">Legal Opinion / Remarks</label>
                            <textarea className="input-field" style={{ width: '100%' }} rows="4" placeholder="Enter findings or rejection reasons here..."></textarea>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                            <button className="btn btn-primary" style={{ backgroundColor: 'var(--c-success)', justifyContent: 'center' }}>
                                <CheckCircle size={18} /> Approve
                            </button>
                            <button className="btn btn-primary" style={{ backgroundColor: 'var(--c-danger)', justifyContent: 'center' }}>
                                <XCircle size={18} /> Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CheckItem({ label }) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: '1.25rem', height: '1.25rem' }} />
            <span className="text-sm">{label}</span>
        </label>
    )
}
