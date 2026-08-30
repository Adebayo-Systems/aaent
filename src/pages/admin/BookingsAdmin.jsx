import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  CalendarCheck,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  Eye,
  Mail,
  Phone,
  User,
  Trash2,
  DollarSign,
  AlertCircle,
  X,
  FileText,
} from 'lucide-react';

export default function BookingsAdmin() {
  const { bookings, updateBookingStatus, deleteBooking } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeDrawerBooking, setActiveDrawerBooking] = useState(null);

  // Filter logic
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.itemTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || booking.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || booking.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate Metrics
  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  
  const estimatedRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (b.numericAmount || 0), 0);

  // Status badge styling helper
  const renderStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return (
          <span className="status-badge pending">
            <Clock size={12} /> Pending Action
          </span>
        );
      case 'confirmed':
        return (
          <span className="status-badge confirmed">
            <CheckCircle2 size={12} /> Confirmed
          </span>
        );
      case 'completed':
        return (
          <span className="status-badge completed">
            <Sparkles size={12} /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="status-badge cancelled">
            <XCircle size={12} /> Cancelled
          </span>
        );
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const renderPaymentBadge = (paymentStatus, ref) => {
    if (paymentStatus === 'Paid') {
      return (
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#065f46',
            backgroundColor: '#d1fae5',
            padding: '2px 8px',
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ✓ Paid (Paystack)
        </span>
      );
    }
    if (paymentStatus === 'Partial Deposit Paid') {
      return (
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#1e40af',
            backgroundColor: '#dbeafe',
            padding: '2px 8px',
            borderRadius: '4px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ⚡ 50% Deposit
        </span>
      );
    }
    return (
      <span
        style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#92400e',
          backgroundColor: '#fef3c7',
          padding: '2px 8px',
          borderRadius: '4px',
        }}
      >
        Unpaid / Inquiry
      </span>
    );
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = [
      'Booking ID,Guest Name,Email,Phone,Type,Item Reserved,Date,Guests,Status,Payment Status,Payment Ref,Amount,Created At',
    ];
    const rows = filteredBookings.map(
      (b) =>
        `"${b.id}","${b.guestName}","${b.email}","${b.phone}","${b.type}","${b.itemTitle}","${b.date}","${b.guests}","${b.status}","${b.paymentStatus || 'Unpaid'}","${b.transactionRef || 'N/A'}","${b.totalAmount}","${b.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AA_Bookings_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="admin-card-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', margin: 0 }}>
            Reservations &amp; Concierge Inquiries
          </h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
            Live management stream for room bookings, table reservations, and private event assemblies.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn-secondary">
          <Download size={15} /> Export Report (CSV)
        </button>
      </div>

      {/* Metric Cards Banner */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Requests</span>
            <div className="stat-card-icon">
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="stat-card-value">{totalBookingsCount}</div>
          <div className="stat-card-trend">Across all luxury outlets</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Pending Confirmation</span>
            <div className="stat-card-icon" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: pendingCount > 0 ? '#f59e0b' : 'inherit' }}>
            {pendingCount}
          </div>
          <div className="stat-card-trend" style={{ color: pendingCount > 0 ? '#f59e0b' : 'inherit' }}>
            Requires Concierge Review
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Confirmed Bookings</span>
            <div className="stat-card-icon" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.15)' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: '#10b981' }}>
            {confirmedCount}
          </div>
          <div className="stat-card-trend">Ready for guest arrival</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Est. Revenue Value</span>
            <div className="stat-card-icon" style={{ color: 'var(--brand-red)', background: 'rgba(236, 50, 55, 0.15)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div className="stat-card-value">₦{estimatedRevenue.toLocaleString()}</div>
          <div className="stat-card-trend">Active pipeline value</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="admin-card">
        <div className="admin-card-header">
          {/* Type Filter Tabs */}
          <div className="filter-tabs" style={{ borderBottom: 'none', marginBottom: 0 }}>
            <button
              onClick={() => setSelectedType('all')}
              className={`tab-btn ${selectedType === 'all' ? 'active' : ''}`}
            >
              All Outlets
            </button>
            <button
              onClick={() => setSelectedType('room')}
              className={`tab-btn ${selectedType === 'room' ? 'active' : ''}`}
            >
              🛏️ Rooms &amp; Suites
            </button>
            <button
              onClick={() => setSelectedType('table')}
              className={`tab-btn ${selectedType === 'table' ? 'active' : ''}`}
            >
              🍽️ Dining Tables
            </button>
            <button
              onClick={() => setSelectedType('event')}
              className={`tab-btn ${selectedType === 'event' ? 'active' : ''}`}
            >
              🏛️ Events &amp; Halls
            </button>
            <button
              onClick={() => setSelectedType('spa')}
              className={`tab-btn ${selectedType === 'spa' ? 'active' : ''}`}
            >
              💆 Spa Rituals
            </button>
          </div>

          {/* Search Box */}
          <div className="search-input-wrap">
            <Search className="search-icon" size={15} />
            <input
              type="text"
              placeholder="Search guest name, email, ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Secondary Status Filter pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--admin-text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>
            <Filter size={12} style={{ display: 'inline', marginRight: '4px' }} /> Status:
          </span>
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              style={{
                fontSize: '12px',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid var(--admin-input-border)',
                background: selectedStatus === st ? 'var(--brand-blue)' : 'var(--admin-input-bg)',
                color: selectedStatus === st ? '#ffffff' : 'var(--admin-text-main)',
                cursor: 'pointer',
                fontWeight: '600',
                textTransform: 'capitalize',
              }}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Bookings Table */}
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ref ID</th>
                <th>Guest Name &amp; Contact</th>
                <th>Outlet / Reserved Item</th>
                <th>Requested Date</th>
                <th>Guests</th>
                <th>Total Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-muted)' }}>
                    No bookings found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <strong style={{ color: 'var(--brand-blue)', fontFamily: 'monospace' }}>{b.id}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--admin-text-dim)' }}>{b.createdAt}</div>
                    </td>

                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--admin-text-main)' }}>{b.guestName}</div>
                      <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)' }}>{b.email}</div>
                    </td>

                    <td>
                      <div style={{ fontWeight: '500' }}>{b.itemTitle}</div>
                      <span
                        style={{
                          fontSize: '10px',
                          textTransform: 'uppercase',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(75, 107, 130, 0.15)',
                          color: 'var(--brand-blue)',
                          fontWeight: '700',
                        }}
                      >
                        {b.type}
                      </span>
                    </td>

                    <td style={{ fontSize: '13px' }}>{b.date}</td>
                    <td style={{ fontSize: '13px' }}>{b.guests}</td>
                    <td>
                      <div style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>{b.totalAmount}</div>
                      <div style={{ marginTop: '3px' }}>{renderPaymentBadge(b.paymentStatus, b.transactionRef)}</div>
                    </td>

                    <td>{renderStatusBadge(b.status)}</td>

                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setActiveDrawerBooking(b)}
                          className="btn-outline btn-sm"
                          title="View Full Booking Dossier"
                        >
                          <Eye size={14} /> Review
                        </button>

                        {b.status === 'Pending' && (
                          <button
                            onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                            className="btn-primary btn-sm"
                            title="Confirm Reservation"
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Booking Details Drawer */}
      {activeDrawerBooking && (
        <div className="drawer-overlay" onClick={() => setActiveDrawerBooking(null)}>
          <div className="drawer-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={{ fontSize: '12px', color: 'var(--brand-blue)', fontWeight: '700' }}>
                  RESERVATION DOSSIER — {activeDrawerBooking.id}
                </div>
                <h3 className="modal-title" style={{ margin: '4px 0 0 0' }}>
                  {activeDrawerBooking.guestName}
                </h3>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveDrawerBooking(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Status Update Banner */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--admin-input-bg)',
                  border: '1px solid var(--admin-input-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', color: 'var(--admin-text-muted)', display: 'block' }}>
                    Current Workflow Status
                  </span>
                  <div style={{ marginTop: '4px' }}>{renderStatusBadge(activeDrawerBooking.status)}</div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => updateBookingStatus(activeDrawerBooking.id, 'Confirmed')}
                    className="btn-primary btn-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateBookingStatus(activeDrawerBooking.id, 'Completed')}
                    className="btn-secondary btn-sm"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => updateBookingStatus(activeDrawerBooking.id, 'Cancelled')}
                    className="btn-outline btn-sm"
                    style={{ color: 'var(--brand-red)' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Guest Profile Box */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--admin-card-border)',
                  backgroundColor: 'var(--admin-bg-secondary)',
                }}
              >
                <h4 style={{ fontSize: '14px', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Guest Intelligence
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User size={16} color="var(--brand-blue)" />
                    <span>{activeDrawerBooking.guestName}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={16} color="var(--brand-blue)" />
                    <a href={`mailto:${activeDrawerBooking.email}`} style={{ color: 'var(--brand-blue)', textDecoration: 'underline' }}>
                      {activeDrawerBooking.email}
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Phone size={16} color="var(--brand-blue)" />
                    <a href={`tel:${activeDrawerBooking.phone}`} style={{ color: 'var(--admin-text-main)' }}>
                      {activeDrawerBooking.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Reservation Details */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--admin-card-border)',
                  backgroundColor: 'var(--admin-bg-secondary)',
                }}
              >
                <h4 style={{ fontSize: '14px', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Reservation Overview
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                  <div>
                    <span style={{ color: 'var(--admin-text-muted)', display: 'block' }}>Reserved Item:</span>
                    <strong>{activeDrawerBooking.itemTitle}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--admin-text-muted)', display: 'block' }}>Category:</span>
                    <span style={{ textTransform: 'uppercase', fontWeight: '700', color: 'var(--brand-blue)' }}>
                      {activeDrawerBooking.type}
                    </span>
                  </div>

                  <div>
                    <span style={{ color: 'var(--admin-text-muted)', display: 'block' }}>Requested Date:</span>
                    <strong>{activeDrawerBooking.date}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--admin-text-muted)', display: 'block' }}>Party / Guests:</span>
                    <strong>{activeDrawerBooking.guests}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--admin-text-muted)', display: 'block' }}>Total Price:</span>
                    <strong style={{ color: 'var(--brand-gold)', fontSize: '16px' }}>{activeDrawerBooking.totalAmount}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--admin-text-muted)', display: 'block' }}>Payment Status:</span>
                    <div>{renderPaymentBadge(activeDrawerBooking.paymentStatus, activeDrawerBooking.transactionRef)}</div>
                  </div>

                  {activeDrawerBooking.transactionRef && (
                    <div style={{ gridColumn: 'span 2' }}>
                      <span style={{ color: 'var(--admin-text-muted)', display: 'block' }}>Payment Reference:</span>
                      <code style={{ fontSize: '12px', background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                        {activeDrawerBooking.transactionRef}
                      </code>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Requests */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--admin-card-border)',
                  backgroundColor: 'var(--admin-bg-secondary)',
                }}
              >
                <h4 style={{ fontSize: '14px', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Special Concierge Notes
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {activeDrawerBooking.specialRequests || 'No special requests provided.'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--admin-card-border)', display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  deleteBooking(activeDrawerBooking.id);
                  setActiveDrawerBooking(null);
                }}
                className="btn-outline"
                style={{ color: 'var(--brand-red)', borderColor: 'rgba(236, 50, 55, 0.3)' }}
              >
                <Trash2 size={15} /> Delete Inquiry
              </button>

              <button
                onClick={() => setActiveDrawerBooking(null)}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Save &amp; Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
