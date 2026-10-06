import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lock, Sun, Moon, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const { loginAdmin, adminTheme, toggleTheme } = useData();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(pin);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="admin-platform" data-theme={adminTheme}>
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title="Toggle Light/Dark Theme"
            >
              {adminTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              <span>{adminTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <img
              src="/images/brand-logo-transparent.webp"
              alt="AA Entertainment"
              className="admin-login-logo"
            />
          </div>

          <div className="admin-eyebrow">
            <span className="admin-eyebrow-line"></span>
            <span>Management Portal</span>
            <span className="admin-eyebrow-line"></span>
          </div>

          <h1 className="login-title">AA Entertainment</h1>
          <p className="login-subtitle">Hospitality Administration &amp; Content Management</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label htmlFor="admin-passcode-input" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={13} /> Security Passcode
              </label>
              <input
                id="admin-passcode-input"
                type="password"
                className={`pin-input-field ${error ? 'has-error' : ''}`}
                placeholder="••••"
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(false);
                }}
                autoFocus
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="admin-login-error">
                Invalid Security Passcode.
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            >
              <span>Unlock Management Portal</span>
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
