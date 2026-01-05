import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Briefcase, User, Scale } from 'lucide-react';

import logo from '../assets/logo.png';

export default function LandingPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role) => {
        navigate(`/login/${role.toLowerCase()}`);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: 'white' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}>
                    <img src={logo} alt="First Registrars" style={{ height: '64px' }} />
                </div>
                {/* <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                    <Shield size={48} color="#0EA5E9" />
                </div> */}
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Probate Ease</h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, fontWeight: '300' }}>Digital Probate Administration & Workflow System</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1000px', width: '100%', padding: '0 2rem' }}>
                <div className="role-card" onClick={() => handleLogin('CLIENT')}>
                    <div className="icon-wrapper"><User size={28} /></div>
                    <h3>Beneficiary / Client</h3>
                    <p>Initiate probate, track applications, and manage uploaded documents.</p>
                </div>

                <div className="role-card" onClick={() => handleLogin('OFFICER')}>
                    <div className="icon-wrapper"><Briefcase size={28} /></div>
                    <h3>Probate Officer</h3>
                    <p>Process transmissions, verify documents, and manage compliance.</p>
                </div>

                <div className="role-card" onClick={() => handleLogin('LEGAL')}>
                    <div className="icon-wrapper"><Scale size={28} /></div>
                    <h3>Legal / Court Agent</h3>
                    <p>Review legal documents, confirm schedules, and validate orders.</p>
                </div>
            </div>

            <style>{`
        .role-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2.5rem 2rem;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
        }
        .role-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.1);
          border-color: #0EA5E9;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
        }
        .icon-wrapper {
          background: rgba(14, 165, 233, 0.2);
          color: #38BDF8;
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 0.5rem;
        }
        .role-card h3 { font-size: 1.25rem; font-weight: 600; color: white; }
        .role-card p { opacity: 0.6; font-size: 0.9rem; line-height: 1.5; }
      `}</style>
        </div>
    );
}
