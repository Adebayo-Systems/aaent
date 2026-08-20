import React from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import AdminLogin from './AdminLogin';

import AdminDashboard from './AdminDashboard';
import BookingsAdmin from './BookingsAdmin';
import RoomsAdmin from './RoomsAdmin';
import DiningAdmin from './DiningAdmin';
import SpaEventsAdmin from './SpaEventsAdmin';
import BoutiqueAdmin from './BoutiqueAdmin';
import GalleryAdmin from './GalleryAdmin';
import SettingsAdmin from './SettingsAdmin';

import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  UtensilsCrossed,
  Sparkles,
  ShoppingBag,
  Image as ImageIcon,
  Settings,
  Sun,
  Moon,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import './admin.css';

export default function AdminLayout() {
  const { isAdminAuthenticated, logoutAdmin, adminTheme, toggleTheme, bookings } = useData();
  const navigate = useNavigate();

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;

  return (
    <div className="admin-platform" data-theme={adminTheme}>
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <img
              src="/images/brand-logo-transparent.webp"
              alt="AA Logo"
              className="admin-brand-logo"
            />
            <div>
              <div className="admin-sidebar-title">AA Entertainment</div>
              <div className="admin-sidebar-subtitle">Content Manager</div>
            </div>
          </div>

          <nav className="admin-nav">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/bookings"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <CalendarCheck size={18} />
              <span>Bookings &amp; Requests</span>
              {pendingCount > 0 && <span className="admin-nav-badge">{pendingCount}</span>}
            </NavLink>

            <NavLink
              to="/admin/rooms"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <BedDouble size={18} />
              <span>Rooms &amp; Suites</span>
            </NavLink>

            <NavLink
              to="/admin/dining"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <UtensilsCrossed size={18} />
              <span>Dining &amp; Cafe</span>
            </NavLink>

            <NavLink
              to="/admin/spa-events"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <Sparkles size={18} />
              <span>Spa &amp; Events</span>
            </NavLink>

            <NavLink
              to="/admin/boutique"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <ShoppingBag size={18} />
              <span>Boutique Shop</span>
            </NavLink>

            <NavLink
              to="/admin/gallery"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <ImageIcon size={18} />
              <span>Gallery Media</span>
            </NavLink>

            <NavLink
              to="/admin/settings"
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <Settings size={18} />
              <span>Site Settings</span>
            </NavLink>
          </nav>

          <div className="admin-sidebar-footer">
            <button onClick={toggleTheme} className="theme-toggle-btn" style={{ width: '100%', justifyContent: 'center' }}>
              {adminTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              {adminTheme === 'dark' ? 'Light Theme' : 'Dark Theme'}
            </button>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="admin-main">
          <header className="admin-topbar">
            <div className="admin-topbar-title-group">
              <h1>AA Concierge Console</h1>
              <p className="admin-topbar-tagline">Executive Management Platform</p>
            </div>

            <div className="admin-topbar-actions">
              <button
                onClick={() => window.open('/', '_blank')}
                className="btn-public-site"
                title="Open Public Website"
              >
                <span>Live Site</span>
                <ExternalLink size={14} />
              </button>

              <button onClick={logoutAdmin} className="btn-logout" title="Lock Console">
                <LogOut size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Lock
              </button>
            </div>
          </header>

          <div className="admin-page-content">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/bookings" element={<BookingsAdmin />} />
              <Route path="/rooms" element={<RoomsAdmin />} />
              <Route path="/dining" element={<DiningAdmin />} />
              <Route path="/spa-events" element={<SpaEventsAdmin />} />
              <Route path="/boutique" element={<BoutiqueAdmin />} />
              <Route path="/gallery" element={<GalleryAdmin />} />
              <Route path="/settings" element={<SettingsAdmin />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
