import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, User, Briefcase, Scale, ArrowRight, Lock, Mail, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function LoginPage() {
    const { role } = useParams(); // 'client', 'officer', 'legal'
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState('');

    const officerCredentials = {
        email: 'officer@probate.local',
        password: 'Probate#2025'
    };

    const roleConfig = {
        client: {
            title: 'Beneficiary Portal',
            icon: <User size={40} />,
            color: 'var(--c-secondary)',
            description: 'Securely manage estate transmission and vital documents.',
            bgGradient: 'linear-gradient(135deg, #0284C7 0%, #075985 100%)' // Sky Blue
        },
        officer: {
            title: 'Probate Officer',
            icon: <Briefcase size={40} />,
            color: 'var(--c-primary)',
            description: 'Authorized personnel access for workflow administration.',
            bgGradient: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)' // Slate
        },
        legal: {
            title: 'Legal Interface',
            icon: <Scale size={40} />,
            color: '#8B5CF6',
            description: 'Digital verification desk for court agents and lawyers.',
            bgGradient: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)' // Violet
        }
    };

    const config = roleConfig[role] || roleConfig.client;

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const formData = new FormData(e.target);
            const email = String(formData.get('email') || '').trim();
            const password = String(formData.get('password') || '');

            if (role === 'officer') {
                const valid = email.toLowerCase() === officerCredentials.email && password === officerCredentials.password;
                if (!valid) {
                    setLoading(false);
                    setAuthError('Invalid officer credentials.');
                    return;
                }
            }

            const userRole = role.toUpperCase();
            login(userRole);

            if (role === 'client') navigate('/client');
            else if (role === 'officer') navigate('/officer');
            else if (role === 'legal') navigate('/legal');
        }, 1000);
    };

    const handleMicrosoftLogin = () => {
        setLoading(true);
        setTimeout(() => {
            login('OFFICER');
            navigate('/officer');
        }, 800);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'white' }}>

            {/* Left Panel - Visuals */}
            <div style={{
                flex: 1,
                background: config.bgGradient,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '4rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Abstract Shapes */}
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>

                <div style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ background: 'white', padding: '0.75rem', borderRadius: '12px', display: 'inline-block', marginBottom: '2rem' }}>
                        <img src={logo} alt="First Registrars" style={{ height: '32px' }} />
                    </div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>Probate <br />Ease.</h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '400px', lineHeight: 1.6 }}>The unified digital platform for seamless and transparent estate administration.</p>
                </div>

                <div style={{ position: 'relative', zIndex: 10, fontSize: '0.875rem', opacity: 0.6 }}>
                    &copy; 2025 First Registrars & Investor Services.
                </div>
            </div>

            {/* Right Panel - Form */}
            <div style={{
                flex: '0 0 600px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '4rem',
                backgroundColor: 'white',
                position: 'relative'
            }}>
                <Link to="/" style={{
                    position: 'absolute', top: '2rem', right: '2rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    textDecoration: 'none', color: 'var(--c-text-muted)',
                    fontSize: '0.875rem', fontWeight: '500',
                    padding: '0.5rem 1rem', borderRadius: '2rem',
                    border: '1px solid var(--c-border)', transition: 'all 0.2s'
                }}>
                    <ChevronLeft size={16} /> Back to Home
                </Link>

                <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={{
                            display: 'inline-flex', padding: '1rem',
                            background: role === 'client' ? '#F0F9FF' : (role === 'legal' ? '#F5F3FF' : '#F1F5F9'),
                            color: config.color.includes('var') ? (role === 'client' ? '#0EA5E9' : '#0F172A') : config.color,
                            borderRadius: '16px', marginBottom: '1.5rem'
                        }}>
                            {config.icon}
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--c-text-main)', marginBottom: '0.5rem' }}>
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p style={{ color: 'var(--c-text-muted)', fontSize: '1.1rem' }}>
                            {isSignUp ? 'Enter your details to get started.' : config.description}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        {isSignUp && (
                            <div>
                                <label className="input-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="James Anderson"
                                        required
                                        style={{ width: '100%', paddingLeft: '3rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', fontSize: '1rem' }}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="input-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                <input
                                    type="email"
                                    name="email"
                                    className="input-field"
                                    placeholder="name@company.com"
                                    required
                                    style={{ width: '100%', paddingLeft: '3rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', fontSize: '1rem' }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="input-label">Password</label>
                                {!isSignUp && role === 'client' && <a href="#" style={{ fontSize: '0.875rem', color: 'var(--c-secondary)', fontWeight: '500' }}>Forgot?</a>}
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input-field"
                                    placeholder="••••••••••••"
                                    required
                                    style={{ width: '100%', paddingLeft: '3rem', paddingRight: '3rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', fontSize: '1rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#94A3B8',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {authError && (
                            <div className="text-sm" style={{ color: 'var(--c-danger)' }}>{authError}</div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                marginTop: '1rem', padding: '1rem', fontSize: '1rem',
                                justifyContent: 'center', backgroundColor: role === 'legal' ? '#7C3AED' : (role === 'officer' ? '#0F172A' : 'var(--c-secondary)')
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : (isSignUp ? 'Create Account' : 'Sign In')}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    {role === 'officer' && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <div className="text-sm text-muted" style={{ marginBottom: '0.75rem' }}>Or sign in with</div>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
                                onClick={handleMicrosoftLogin}
                                disabled={loading}
                            >
                                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <svg width="20" height="20" viewBox="0 0 23 23" aria-hidden="true">
                                        <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                                        <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                                        <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                                        <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                                    </svg>
                                </span>
                                Sign in with Microsoft
                            </button>
                        </div>
                    )}

                    {role === 'client' && (
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--c-text-muted)' }}>
                                {isSignUp ? 'Already have an account?' : 'New to Probate Ease?'}
                                <button
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    style={{
                                        marginLeft: '0.5rem', color: 'var(--c-text-main)', fontWeight: '600',
                                        textDecoration: 'underline', textUnderlineOffset: '4px'
                                    }}
                                >
                                    {isSignUp ? 'Sign In' : 'Create Account'}
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
