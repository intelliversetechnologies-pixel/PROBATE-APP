import { useEffect, useMemo, useState } from 'react';
import { User, AlertTriangle } from 'lucide-react';

export default function OfficerDashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const apiBase = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5000', []);

    useEffect(() => {
        const controller = new AbortController();

        async function loadRequests() {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`${apiBase}/api/officer/requests`, { signal: controller.signal });
                if (!response.ok) throw new Error('Failed to load requests.');
                const payload = await response.json();
                const items = (payload.requests || []).map((row) => ({
                    id: row.id,
                    type: row.request_type,
                    client: row.client_name || 'Client',
                    status: normalizeStatus(row.status),
                    priority: 'Medium',
                    ref: row.reference_id
                }));
                setTasks(items);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError('Unable to load requests.');
                }
            } finally {
                setLoading(false);
            }
        }

        loadRequests();
        return () => controller.abort();
    }, [apiBase]);

    return (
        <div className="container" style={{ maxWidth: '100%' }}>
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-xl">Officer Desk Overview</h2>
                <div className="flex gap-2">
                    <span className="text-sm text-muted flex items-center gap-2">
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--c-success)' }}></span>
                        System Online
                    </span>
                    <button className="btn btn-secondary">Refresh Queue</button>
                </div>
            </div>

            <div className="grid-cols-3 grid-responsive">
                {/* Columns */}
                <div className="kanban-col">
                    <h3 className="text-sm font-bold text-muted mb-4 uppercase flex justify-between">
                        New Requests <span className="badge badge-neutral">{tasks.filter(t => t.status === 'New').length}</span>
                    </h3>
                    {loading && <div className="text-sm text-muted">Loading...</div>}
                    {!loading && error && <div className="text-sm" style={{ color: 'var(--c-danger)' }}>{error}</div>}
                    {tasks.filter(t => t.status === 'New').map(task => <TaskCard key={task.id} task={task} />)}
                </div>

                <div className="kanban-col">
                    <h3 className="text-sm font-bold text-muted mb-4 uppercase flex justify-between">
                        In Review <span className="badge badge-neutral">{tasks.filter(t => t.status === 'In Review').length}</span>
                    </h3>
                    {tasks.filter(t => t.status === 'In Review').map(task => <TaskCard key={task.id} task={task} />)}
                </div>

                <div className="kanban-col">
                    <h3 className="text-sm font-bold text-muted mb-4 uppercase flex justify-between">
                        Pending Approval <span className="badge badge-neutral">{tasks.filter(t => t.status === 'Pending').length}</span>
                    </h3>
                    {tasks.filter(t => t.status === 'Pending').map(task => <TaskCard key={task.id} task={task} />)}
                    <div className="empty-state">Waiting for Compliance</div>
                </div>
            </div>

            <style>{`
        .kanban-col {
            background: #F1F5F9;
            padding: 1rem;
            border-radius: var(--radius-md);
            min-height: 600px;
        }
        .task-card {
            background: white;
            padding: 1rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-sm);
            margin-bottom: 0.75rem;
            border: 1px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
        }
        .task-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
            border-color: var(--c-secondary);
        }
        .empty-state {
            text-align: center;
            padding: 1rem;
            color: var(--c-text-muted);
            font-size: 0.75rem;
            border: 1px dashed var(--c-border);
            border-radius: var(--radius-md);
            margin-top: 1rem;
        }
      `}</style>
        </div>
    )
}

function normalizeStatus(status = '') {
    if (status === 'Sent to Probate Officer') return 'New';
    if (status === 'In Review' || status === 'Pending' || status === 'New') return status;
    return 'New';
}

function TaskCard({ task }) {
    return (
        <div className="task-card">
            <div className="flex justify-between items-start mb-2">
                <span className="badge badge-neutral" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>{task.ref}</span>
                {task.priority === 'High' && <span style={{ color: 'var(--c-danger)' }}><AlertTriangle size={14} /></span>}
            </div>

            <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--c-primary)' }}>{task.type}</h4>
            <div className="text-muted text-sm flex items-center gap-1 mb-3">
                <User size={12} /> {task.client}
            </div>

            <div className="pt-3 border-t flex justify-between items-center bg-gray-50 -mx-4 -mb-4 px-4 py-2 mt-2 rounded-b-md">
                <span className="text-xs text-muted">2 mins ago</span>
                <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', height: 'auto' }}>Open</button>
            </div>
        </div>
    )
}
