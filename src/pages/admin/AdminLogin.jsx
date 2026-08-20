import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Shield, Key, Sun, Moon, ArrowRight } from 'lucide-react';

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
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-20px' }}>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title="Toggle Light/Dark Theme"
            >
              {adminTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {adminTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <img
              src="/images/brand-logo-transparent.webp"
              alt="AA Logo"
              className="admin-login-logo"
            />
          </div>
          <h2 className="login-title">AA Entertainment</h2>
          <p className="login-subtitle">Management &amp; Content Administration Platform</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Key size={14} /> Security Passcode (Default: 1234)
              </label>
              <input
                type="password"
                className="pin-input-field"
                placeholder="••••"
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                autoFocus
              />
            </div>

            {error && (
              <p
                style={{
                  color: 'var(--brand-red)',
                  fontSize: '13px',
                  marginBottom: '16px',
                  fontWeight: '600',
                }}
              >
                Invalid Security Passcode. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              Unlock Administration Portal <ArrowRight size={16} />
            </button>
          </form>

          <div
            style={{
              marginTop: '24px',
              fontSize: '12px',
              color: 'var(--admin-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Shield size={13} /> Protected Management Environment
          </div>
        </div>
      </div>
    </div>
  );
}
