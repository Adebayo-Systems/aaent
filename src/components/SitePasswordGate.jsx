import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import './SitePasswordGate.css';

export default function SitePasswordGate({ children }) {
  const { settings, isSiteUnlocked, unlockSite } = useData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // If password protection is disabled or already unlocked, show content
  if (settings?.sitePasswordEnabled === false || isSiteUnlocked) {
    return <>{children}</>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim() || loading) return;

    setLoading(true);
    setError(false);

    try {
      const success = await unlockSite(password);
      if (!success) {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-gate-page">
      <div className="site-gate-box">
        <img
          src="/images/brand-logo-transparent.webp"
          alt="AA Entertainment"
          className="site-gate-logo"
        />

        <div className="site-gate-eyebrow">
          <span className="site-gate-eyebrow-line"></span>
          <span>Private Access</span>
          <span className="site-gate-eyebrow-line"></span>
        </div>

        <h1 className="site-gate-heading">AA Entertainment</h1>
        <p className="site-gate-subtext">Enter password to access</p>

        <form onSubmit={handleSubmit} className="site-gate-form">
          <div className="site-gate-input-wrapper">
            <input
              type="password"
              className={`site-gate-input ${error ? 'has-error' : ''}`}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              autoFocus
              disabled={loading}
            />
          </div>

          {error && <p className="site-gate-error-text">Incorrect password</p>}

          <button type="submit" className="site-gate-submit-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}
