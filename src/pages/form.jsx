import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaPhoneAlt, FaLock } from "react-icons/fa";
import Header from "../components/header";
import Footer from "../components/footer";
import "./form.css";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    const pwd = formData.password || '';
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const map = [
      { label: 'Too short', class: 'weak' },
      { label: 'Weak', class: 'weak' },
      { label: 'Fair', class: 'fair' },
      { label: 'Good', class: 'good' },
      { label: 'Strong', class: 'strong' }
    ];
    return { score, ...map[score] };
  }, [formData.password]);

  const completion = useMemo(() => {
    const required = ['firstName', 'lastName', 'phone', 'password', 'confirmPassword'];
    const filled = required.filter((k) => String(formData[k] || '').trim().length > 0).length;
    const pct = Math.round((filled / required.length) * 100);
    return Math.min(100, pct);
  }, [formData]);

    const handleChange = (e) => {       
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

    try {
      setLoading(true);
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          phone: formData.phone,
          password: formData.password,
        })
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed: ${res.status}`);
      }

      setSubmitted(true);
      setFormData({ firstName:"", middleName:"", lastName:"", phone:"", password:"", confirmPassword:"" });
    } catch (err) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="form-page">
        <div className="form-card">
          <div className="form-top">
            <Link to="/apply" className="back-link">← Back to Apply</Link>
            <div className="progress" aria-label={`Form completion ${completion}%`}>
              <div className="progress-bar" style={{ width: `${completion}%` }} />
              <span className="progress-label">{completion}% complete</span>
            </div>
          </div>
          <div className="form-header">
            <h2>Create An Account</h2>
            <p>Join us to get started with your probate application</p>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {error && <div className="alert error">{error}</div>}
            {submitted && <div className="alert success">Sign up successful!</div>}
          </div>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="field">
              <label className="required">First Name</label>
              <div className="input-wrap">
                <span className="input-icon"><FaUser size={14} /></span>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label>Middle Name</label>
              <div className="input-wrap">
                <span className="input-icon"><FaUser size={14} /></span>
                <input
                  type="text"
                  name="middleName"
                  placeholder="Enter Middle Name (optional)"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="required">Last Name</label>
              <div className="input-wrap">
                <span className="input-icon"><FaUser size={14} /></span>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="required">Phone Number</label>
              <div className="input-wrap">
                <span className="input-icon"><FaPhoneAlt size={14} /></span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="hint">Use a valid mobile number (e.g. +2348012345678)</div>
            </div>
            <div className="field">
              <label className="required">Password</label>
              <div className="input-wrap">
                <span className="input-icon"><FaLock size={14} /></span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={`strength strength-${passwordStrength.class}`}>
                <div className="bars">
                  {[0,1,2,3].map(i => (
                    <span key={i} className={`bar ${i < passwordStrength.score ? 'on' : ''}`} />
                  ))}
                </div>
                <span className={`label ${passwordStrength.class}`}>{passwordStrength.label}</span>
              </div>
              <div className="hint">Use 8+ chars with uppercase, number, and symbol.</div>
            </div>
            <div className="field">
              <label className="required">Confirm Password</label>
              <div className="input-wrap">
                <span className="input-icon"><FaLock size={14} /></span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="actions span-2">
              <button type="submit" disabled={loading} aria-busy={loading}>
                {loading ? 'Creating account…' : 'Create an Account'}
              </button>
            </div>
            <div className="below-action span-2">
              Already have an account? <Link to="/login" className="login-link">Login</Link>
            </div>
            <div className="tos span-2">By creating an account, you agree to our Terms and Privacy Policy.</div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignUpForm;
