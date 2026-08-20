import React from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import {
  BedDouble,
  UtensilsCrossed,
  CalendarCheck,
  ShoppingBag,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function AdminDashboard() {
  const { rooms, dishes, boutiqueItems, bookings } = useData();
  const navigate = useNavigate();

  const pendingBookings = bookings.filter((b) => b.status === 'Pending');
  const availableRoomsCount = rooms.filter((r) => r.available).length;
  const inStockBoutiqueCount = boutiqueItems.filter((i) => i.stockStatus === 'In Stock').length;

  return (
    <div>
      {/* Dashboard Top Banner */}
      <div
        className="admin-card"
        style={{
          background: 'linear-gradient(135deg, rgba(75, 107, 130, 0.2), rgba(236, 50, 55, 0.15))',
          border: '1px solid var(--brand-blue)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '30px', margin: '0 0 6px 0' }}>
              Welcome to AA Entertainment Console
            </h2>
            <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', margin: 0 }}>
              Live real-time operational dashboard for luxury suites, dining menus, boutique, and guest reservations.
            </p>
          </div>

          <button onClick={() => navigate('/admin/bookings')} className="btn-primary">
            Review Pending Requests ({pendingBookings.length}) <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stat-grid">
        <div className="stat-card" onClick={() => navigate('/admin/rooms')} style={{ cursor: 'pointer' }}>
          <div className="stat-card-header">
            <span className="stat-card-title">Suites &amp; Rooms</span>
            <div className="stat-card-icon">
              <BedDouble size={20} />
            </div>
          </div>
          <div className="stat-card-value">{rooms.length}</div>
          <div className="stat-card-trend">
            <CheckCircle2 size={13} /> {availableRoomsCount} Available Live
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/dining')} style={{ cursor: 'pointer' }}>
          <div className="stat-card-header">
            <span className="stat-card-title">Dining &amp; Cafe Menu</span>
            <div className="stat-card-icon">
              <UtensilsCrossed size={20} />
            </div>
          </div>
          <div className="stat-card-value">{dishes.length}</div>
          <div className="stat-card-trend">Curated culinary items</div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/bookings')} style={{ cursor: 'pointer' }}>
          <div className="stat-card-header">
            <span className="stat-card-title">Pending Inquiries</span>
            <div className="stat-card-icon" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: pendingBookings.length > 0 ? '#f59e0b' : 'inherit' }}>
            {pendingBookings.length}
          </div>
          <div className="stat-card-trend" style={{ color: pendingBookings.length > 0 ? '#f59e0b' : 'inherit' }}>
            Action required by team
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate('/admin/boutique')} style={{ cursor: 'pointer' }}>
          <div className="stat-card-header">
            <span className="stat-card-title">Boutique Inventory</span>
            <div className="stat-card-icon">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="stat-card-value">{boutiqueItems.length}</div>
          <div className="stat-card-trend">{inStockBoutiqueCount} items in active stock</div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Quick Content Actions</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <button onClick={() => navigate('/admin/rooms')} className="btn-outline" style={{ justifyContent: 'center', padding: '14px' }}>
            <Plus size={16} /> Manage Rooms &amp; Suites
          </button>
          <button onClick={() => navigate('/admin/dining')} className="btn-outline" style={{ justifyContent: 'center', padding: '14px' }}>
            <Plus size={16} /> Edit Restaurant &amp; Cafe Menu
          </button>
          <button onClick={() => navigate('/admin/boutique')} className="btn-outline" style={{ justifyContent: 'center', padding: '14px' }}>
            <Plus size={16} /> Manage Boutique Shop
          </button>
          <button onClick={() => navigate('/admin/gallery')} className="btn-outline" style={{ justifyContent: 'center', padding: '14px' }}>
            <Plus size={16} /> Update Media Gallery
          </button>
        </div>
      </div>

      {/* Recent Bookings Stream */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Guest Reservations</h3>
          <button onClick={() => navigate('/admin/bookings')} className="btn-outline btn-sm">
            View All ({bookings.length})
          </button>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Reserved Experience</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--brand-blue)', fontWeight: '700' }}>{b.id}</td>
                  <td>
                    <strong>{b.guestName}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)' }}>{b.phone}</div>
                  </td>
                  <td>{b.itemTitle}</td>
                  <td>{b.date}</td>
                  <td>
                    <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                  </td>
                  <td style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>{b.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
