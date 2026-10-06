import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Settings, Save, Shield, RefreshCw, CheckCircle2, Lock } from 'lucide-react';

export default function SettingsAdmin() {
  const { settings, updateSettings, resetAllData, lockSite } = useData();

  const [form, setForm] = useState({
    hotelName: settings.hotelName || '',
    tagline: settings.tagline || '',
    phone: settings.phone || '',
    email: settings.email || '',
    address: settings.address || '',
    openingHours: settings.openingHours || '',
    promoBanner: settings.promoBanner || '',
    adminPin: settings.adminPin || '1234',
    sitePasswordEnabled: settings.sitePasswordEnabled !== false,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all website content and bookings to factory defaults?')) {
      resetAllData();
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', margin: 0 }}>
            Site Settings &amp; Security Passcode
          </h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
            Update hotel contact information, hero announcement banner, and administration security PIN.
          </p>
        </div>

        {savedSuccess && (
          <span
            style={{
              color: '#10b981',
              fontWeight: '700',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle2 size={16} /> Settings Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: '16px' }}>
            General Contact Information
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label>Property Name</label>
              <input
                type="text"
                className="form-control"
                required
                value={form.hotelName}
                onChange={(e) => setForm({ ...form, hotelName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Brand Tagline</label>
              <input
                type="text"
                className="form-control"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Concierge Phone</label>
              <input
                type="text"
                className="form-control"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Concierge Email</label>
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Physical Address</label>
            <input
              type="text"
              className="form-control"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Hero Announcement Banner Message</label>
            <textarea
              className="form-control"
              rows={2}
              value={form.promoBanner}
              onChange={(e) => setForm({ ...form, promoBanner: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: '16px' }}>
            <Lock size={18} style={{ display: 'inline', marginRight: '6px' }} /> Website Access Gate
          </h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '13px', marginBottom: '16px' }}>
            When enabled, visitors must enter the access password to view the website.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.sitePasswordEnabled}
                onChange={(e) => setForm({ ...form, sitePasswordEnabled: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: 'var(--color-brand-red)' }}
              />
              <span style={{ fontWeight: 600 }}>Enable Access Gate</span>
            </label>

            <button
              type="button"
              onClick={() => {
                lockSite();
                alert('Current browser session locked. The lock screen will now appear on the website.');
              }}
              className="btn-outline"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              <Lock size={14} style={{ marginRight: '6px' }} /> Lock Browser Session
            </button>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: '16px' }}>
            <Shield size={18} style={{ display: 'inline', marginRight: '6px' }} /> Admin Security PIN
          </h3>

          <div className="form-group" style={{ maxWidth: '300px' }}>
            <label>Security Passcode (Default: 1234)</label>
            <input
              type="password"
              className="form-control"
              required
              maxLength={8}
              value={form.adminPin}
              onChange={(e) => setForm({ ...form, adminPin: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <button
            type="button"
            onClick={handleReset}
            className="btn-outline"
            style={{ color: 'var(--brand-red)', borderColor: 'rgba(236, 50, 55, 0.3)' }}
          >
            <RefreshCw size={15} /> Reset All Content to Factory Defaults
          </button>

          <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
            <Save size={16} /> Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
