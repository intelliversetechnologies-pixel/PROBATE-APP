import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaUsers, FaIdCard, FaGavel, FaBalanceScale, FaUniversity, FaChartLine, FaCogs, FaLandmark } from 'react-icons/fa';
import './roles.css';

const roles = [
  { name: 'Clients / Executors / Administrators', icon: FaUsers, desc: 'Individuals applying for probate services.' },
  { name: 'FRIS Officers / UBA', icon: FaIdCard, desc: 'Verification and liaison for FRIS/UBA.' },
  { name: 'Lawyers / Law Firms', icon: FaGavel, desc: 'Legal practitioners managing probate cases.' },
  { name: 'Court Officials', icon: FaBalanceScale, desc: 'Court clerks and judicial officers.' },
  { name: 'Banks', icon: FaUniversity, desc: 'Financial institutions processing estate assets.' },
  { name: 'Stockbrokers / CSCS', icon: FaChartLine, desc: 'Capital market participants for estate shares.' },
  { name: 'System Admins / IT', icon: FaCogs, desc: 'Technical access and system operations.' },
  { name: 'Government / Oversight Agencies / Compliance', icon: FaLandmark, desc: 'Regulators and compliance authorities.' },
];

const RoleSelection = () => {
  return (
    <>
      <Header />
      <main className="role-selection">
        <div className="intro">
          <h1>Choose How You’d Like To Continue</h1>
          <p>Select your role to sign up or log in</p>
        </div>
        <div className="roles-grid">
          {roles.map(({ name, icon: Icon, desc }) => (
            <div className="role-card" key={name}>
              <div className="role-head">
                <div className="icon-wrap"><Icon size={22} /></div>
                <h3>{name}</h3>
              </div>
              <p className="role-desc">{desc}</p>
              <div className="actions">
                <Link className="btn primary" to="/form">Sign Up</Link>
                <Link className="btn ghost" to="/login">Login</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RoleSelection;
