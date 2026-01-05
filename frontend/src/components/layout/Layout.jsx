import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    FileText,
    UserCheck,
    Shield,
    LogOut,
    FilePlus,
    Scale,
    Bell,
    Search
} from 'lucide-react';

import logo from '../../assets/logo.png';

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) {
        return <Outlet />; // Render Login/Landing if not auth
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--c-bg)' }}>
            {/* Sidebar */}
            <aside style={{
                width: 'var(--sidebar-width)',
                backgroundColor: 'var(--c-primary)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100%',
                zIndex: 50
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--c-primary-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <img src={logo} alt="First Registrars" style={{ height: '40px', objectFit: 'contain', alignSelf: 'flex-start', background: 'white', padding: '4px', borderRadius: '4px' }} />
                    <div>
                        <h2 style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '-0.025em' }}>Probate Ease</h2>
                        <span style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Probate Administration</span>
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                    {user.role === 'CLIENT' && (
                        <>
                            <Link to="/client" className={`nav-item ${isActive('/client')}`}>
                                <LayoutDashboard size={20} /> Dashboard
                            </Link>
                            <Link to="/client/new" className={`nav-item ${isActive('/client/new')}`}>
                                <FilePlus size={20} /> New Request
                            </Link>
                            <Link to="/client/documents" className={`nav-item ${isActive('/client/documents')}`}>
                                <FileText size={20} /> My Documents
                            </Link>
                        </>
                    )}

                    {user.role === 'OFFICER' && (
                        <>
                            <Link to="/officer" className={`nav-item ${isActive('/officer')}`}>
                                <LayoutDashboard size={20} /> Desk Overview
                            </Link>
                            <Link to="/officer/tasks" className={`nav-item ${isActive('/officer/tasks')}`}>
                                <FileText size={20} /> Processing Queue
                            </Link>
                            <Link to="/officer/compliance" className={`nav-item ${isActive('/officer/compliance')}`}>
                                <Shield size={20} /> Compliance Checks
                            </Link>
                        </>
                    )}

                    {user.role === 'LEGAL' && (
                        <>
                            <Link to="/legal" className={`nav-item ${isActive('/legal')}`}>
                                <LayoutDashboard size={20} /> Legal Desk
                            </Link>
                            <Link to="/legal/reviews" className={`nav-item ${isActive('/legal/reviews')}`}>
                                <Scale size={20} /> Case Reviews
                            </Link>
                        </>
                    )}

                </nav>

                <div style={{ padding: '1rem', borderTop: '1px solid var(--c-primary-light)', backgroundColor: 'var(--c-primary-light)' }}>
                    <div className="flex items-center gap-4">
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--c-secondary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                        }}>
                            {user.name[0]}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{user.name}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{user.role}</div>
                        </div>
                        <button onClick={handleLogout} style={{ color: 'white', opacity: 0.7, cursor: 'pointer' }}>
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: 'var(--sidebar-width)', flex: 1, display: 'flex', flexDirection: 'column', width: 'calc(100% - var(--sidebar-width))' }}>
                <header style={{
                    height: 'var(--header-height)',
                    backgroundColor: 'white',
                    borderBottom: '1px solid var(--c-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 40
                }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                        {location.pathname.includes('new') ? 'New Application' : 'Dashboard Overview'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div style={{ position: 'relative' }}>
                            <Bell size={20} color="var(--c-text-muted)" />
                            <span style={{
                                position: 'absolute', top: -2, right: -2, width: 8, height: 8,
                                backgroundColor: 'var(--c-danger)', borderRadius: '50%'
                            }}></span>
                        </div>
                    </div>
                </header>

                <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                    <Outlet />
                </div>
            </main>

            <style>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: rgba(255,255,255,0.7);
          border-radius: var(--radius-md);
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-item:hover {
          background-color: rgba(255,255,255,0.1);
          color: white;
        }
        .nav-item.active {
          background-color: var(--c-secondary);
          color: white;
        }
      `}</style>
        </div>
    );
}
