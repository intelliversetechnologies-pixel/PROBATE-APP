import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ClientDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({
        total_requests: 0,
        in_progress: 0,
        completed: 0,
        action_needed: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const apiBase = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5000', []);

    useEffect(() => {
        const controller = new AbortController();

        async function loadDashboard() {
            setLoading(true);
            setError('');
            try {
                const params = new URLSearchParams();
                if (user?.id) params.set('clientId', user.id);
                const url = `${apiBase}/api/client/dashboard${params.toString() ? `?${params.toString()}` : ''}`;
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) throw new Error('Failed to load dashboard data.');
                const payload = await response.json();
                setStats(payload.stats || {});
                setApplications(payload.applications || []);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError('Unable to load dashboard data.');
                }
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
        return () => controller.abort();
    }, [apiBase, user?.id]);

    const safeStats = {
        total_requests: stats.total_requests ?? 0,
        in_progress: stats.in_progress ?? 0,
        completed: stats.completed ?? 0,
        action_needed: stats.action_needed ?? 0
    };

    return (
        <div className="container" style={{ maxWidth: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                >
                    Sign Out
                </button>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                    <div className="text-sm text-muted" style={{ marginBottom: '0.35rem' }}>Next Step</div>
                    <div className="text-xl font-bold">Submit Request for Probate</div>
                    <div className="text-sm text-muted">(Death Certificate, Will, NIN, Letters of Admin, etc)</div>
                </div>
                <Link to="/client/new" className="btn btn-primary">
                    <Plus size={18} /> Start Submission
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Requests" value={safeStats.total_requests} icon={<FileText size={20} />} color="blue" />
                <StatCard title="In Progress" value={safeStats.in_progress} icon={<Clock size={20} />} color="orange" />
                <StatCard title="Completed" value={safeStats.completed} icon={<CheckCircle size={20} />} color="green" />
                <StatCard title="Action Needed" value={safeStats.action_needed} icon={<AlertCircle size={20} />} color="red" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="text-xl">Recent Applications</h2>
                {loading && <div className="text-sm text-muted">Loading...</div>}
                {!loading && error && <div className="text-sm" style={{ color: 'var(--c-danger)' }}>{error}</div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Link to="/client/new" className="btn btn-primary">
                        <Plus size={18} /> Initiate New Request
                    </Link>
                </div>
            </div>

            <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--c-border)', backgroundColor: 'var(--c-bg)' }}>
                            <th className="p-4 text-sm text-muted">Reference ID</th>
                            <th className="p-4 text-sm text-muted">Request Type</th>
                            <th className="p-4 text-sm text-muted">Submitted On</th>
                            <th className="p-4 text-sm text-muted">Status</th>
                            <th className="p-4 text-sm text-muted">Progress</th>
                            <th className="p-4 text-sm text-muted">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 && !loading ? (
                            <tr>
                                <td className="p-4 text-muted" colSpan={6}>No applications found.</td>
                            </tr>
                        ) : (
                            applications.map(app => (
                                <tr key={app.id || app.reference_id} style={{ borderBottom: '1px solid var(--c-border)' }}>
                                    <td className="p-4 font-bold" style={{ fontFamily: 'monospace' }}>{app.reference_id}</td>
                                    <td className="p-4">{app.request_type}</td>
                                    <td className="p-4 text-muted">{formatDate(app.submitted_on)}</td>
                                    <td className="p-4">
                                    <StatusBadge status={app.status} />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div style={{ width: '100px', height: '6px', backgroundColor: 'var(--c-border)', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${app.progress ?? 0}%`, height: '100%', backgroundColor: 'var(--c-secondary)' }}></div>
                                            </div>
                                            <span className="text-sm text-muted">{app.progress ?? 0}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>View Details</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color }) {
    const colors = {
        blue: { bg: '#E0F2FE', text: '#0284C7' },
        orange: { bg: '#FFEDD5', text: '#EA580C' },
        green: { bg: '#DCFCE7', text: '#16A34A' },
        red: { bg: '#FEE2E2', text: '#DC2626' }
    };
    const theme = colors[color];
    return (
        <div className="card flex items-center gap-4">
            <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: theme.bg, color: theme.text }}>
                {icon}
            </div>
            <div>
                <div className="text-sm text-muted">{title}</div>
                <div className="text-xl font-bold">{value}</div>
            </div>
        </div>
    )
}

function StatusBadge({ status }) {
    let type = 'neutral';
    if (status.includes('Pending') || status.includes('Process')) type = 'warning'; // Orange
    if (status.includes('Approved') || status.includes('Completed')) type = 'success'; // Green
    if (status.includes('Action') || status.includes('Rejected')) type = 'danger'; // Red

    return <span className={`badge badge-${type}`}>{status}</span>
}

function formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
}
