import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NewApplication() {
    const [showDocs, setShowDocs] = useState(false);
    const [serviceType, setServiceType] = useState('Probate Transmission (Letters of Admin)');
    const [fullName, setFullName] = useState('');
    const [dateOfDemise, setDateOfDemise] = useState('');
    const [placeOfDeath, setPlaceOfDeath] = useState('');
    const [attempted, setAttempted] = useState(false);
    const navigate = useNavigate();

    const missingRequired = !fullName.trim() || !dateOfDemise || !placeOfDeath.trim();

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="card">
                <h2 className="text-xl mb-6">Start New Application</h2>

                <div className="input-group">
                    <label className="input-label">Select Service Type</label>
                    <select
                        className="input-field"
                        value={serviceType}
                        onChange={(event) => setServiceType(event.target.value)}
                    >
                        <option>Probate Transmission (Letters of Admin)</option>
                        <option>Bank Certificate Request</option>
                        <option>Change of Name</option>
                        <option>Survivorship Request</option>
                    </select>
                </div>

                <div className="input-group">
                    <label className="input-label">Deceased Details (Required)</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Full Name of Deceased"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                    />
                    {attempted && !fullName.trim() && (
                        <div className="text-sm" style={{ color: 'var(--c-danger)' }}>Full name is required.</div>
                    )}
                </div>

                <div className="grid-cols-2 grid-responsive">
                    <div className="input-group">
                        <label className="input-label">Date of Demise</label>
                        <input
                            type="date"
                            className="input-field"
                            value={dateOfDemise}
                            onChange={(event) => setDateOfDemise(event.target.value)}
                            required
                        />
                        {attempted && !dateOfDemise && (
                            <div className="text-sm" style={{ color: 'var(--c-danger)' }}>Date of demise is required.</div>
                        )}
                    </div>
                    <div className="input-group">
                        <label className="input-label">Place of Death</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="City / Country"
                            value={placeOfDeath}
                            onChange={(event) => setPlaceOfDeath(event.target.value)}
                            required
                        />
                        {attempted && !placeOfDeath.trim() && (
                            <div className="text-sm" style={{ color: 'var(--c-danger)' }}>Place of death is required.</div>
                        )}
                    </div>
                </div>

                <div className="bg-surface border p-4 rounded-md mb-4">
                    <label className="flex items-start gap-3">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-sm text-muted">
                            I confirm that I have the required documents ready for upload.
                        </span>
                    </label>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowDocs((prev) => !prev)}
                        style={{ marginTop: '0.75rem' }}
                    >
                        {showDocs ? 'Hide Required Documents' : 'View Required Documents List'}
                    </button>
                    {showDocs && (
                        <div className="card" style={{ marginTop: '0.75rem', padding: '0.75rem' }}>
                            <div className="text-sm text-muted" style={{ marginBottom: '0.5rem' }}>Required Documents</div>
                            <ul className="text-sm" style={{ margin: 0, paddingLeft: '1.1rem' }}>
                                <li>Death Certificate</li>
                                <li>Will or Letters of Administration (L.A.)</li>
                                <li>Valid Identification (NIN, National ID, or Passport)</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setAttempted(true);
                            if (missingRequired) return;
                            localStorage.setItem('probate_request_type', serviceType);
                            navigate('/client/documents');
                        }}
                    >
                        Proceed to Uploads <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
