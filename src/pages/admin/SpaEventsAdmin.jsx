import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Sparkles, Calendar, Plus, Edit2, Trash2, X } from 'lucide-react';

export default function SpaEventsAdmin() {
  const { spaServices, addSpaService, updateSpaService, deleteSpaService, venues, addVenue, updateVenue, deleteVenue } = useData();

  const [activeTab, setActiveTab] = useState('spa');
  const [spaModalOpen, setSpaModalOpen] = useState(false);
  const [editingSpa, setEditingSpa] = useState(null);
  const [spaForm, setSpaForm] = useState({ name: '', category: 'Massage Therapy', duration: '60 Mins', price: '', description: '', image: '/images/d0517789-dd9e-4e4b-b0b3-96b6dc245f78.webp' });

  const [venueModalOpen, setVenueModalOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);
  const [venueForm, setVenueForm] = useState({ name: '', capacity: '100 Guests', price: '', description: '', image: '/images/3ae76921-a48d-4cc8-a9f2-8514e32ddc51.webp' });

  // Spa Handlers
  const handleOpenAddSpa = () => {
    setEditingSpa(null);
    setSpaForm({ name: '', category: 'Massage Therapy', duration: '60 Mins', price: '₦50,000', description: '', image: '/images/d0517789-dd9e-4e4b-b0b3-96b6dc245f78.webp' });
    setSpaModalOpen(true);
  };
  const handleOpenEditSpa = (s) => {
    setEditingSpa(s);
    setSpaForm({ name: s.name, category: s.category, duration: s.duration, price: s.price, description: s.description, image: s.image });
    setSpaModalOpen(true);
  };
  const handleSpaSubmit = (e) => {
    e.preventDefault();
    if (editingSpa) updateSpaService(editingSpa.id, spaForm);
    else addSpaService(spaForm);
    setSpaModalOpen(false);
  };

  // Venue Handlers
  const handleOpenAddVenue = () => {
    setEditingVenue(null);
    setVenueForm({ name: '', capacity: 'Up to 200 Guests', price: '₦1,500,000 / Day', description: '', image: '/images/3ae76921-a48d-4cc8-a9f2-8514e32ddc51.webp' });
    setVenueModalOpen(true);
  };
  const handleOpenEditVenue = (v) => {
    setEditingVenue(v);
    setVenueForm({ name: v.name, capacity: v.capacity, price: v.price, description: v.description, image: v.image });
    setVenueModalOpen(true);
  };
  const handleVenueSubmit = (e) => {
    e.preventDefault();
    if (editingVenue) updateVenue(editingVenue.id, venueForm);
    else addVenue(venueForm);
    setVenueModalOpen(false);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', margin: 0 }}>
            Spa Rituals &amp; Event Venues
          </h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
            Manage wellness packages and conference / ballroom hall specifications.
          </p>
        </div>

        {activeTab === 'spa' ? (
          <button onClick={handleOpenAddSpa} className="btn-primary">
            <Plus size={16} /> Add Spa Treatment
          </button>
        ) : (
          <button onClick={handleOpenAddVenue} className="btn-primary">
            <Plus size={16} /> Add Event Venue
          </button>
        )}
      </div>

      <div className="admin-card">
        <div className="filter-tabs">
          <button onClick={() => setActiveTab('spa')} className={`tab-btn ${activeTab === 'spa' ? 'active' : ''}`}>
            💆 Spa &amp; Wellness ({spaServices.length})
          </button>
          <button onClick={() => setActiveTab('venues')} className={`tab-btn ${activeTab === 'venues' ? 'active' : ''}`}>
            🏛️ Event Venues &amp; Halls ({venues.length})
          </button>
        </div>

        {activeTab === 'spa' ? (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Treatment Name</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {spaServices.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <img src={s.image} alt={s.name} className="image-thumb" />
                    </td>
                    <td>
                      <strong>{s.name}</strong>
                      <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)', maxWidth: '300px' }}>{s.description}</div>
                    </td>
                    <td>{s.category}</td>
                    <td>{s.duration}</td>
                    <td style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>{s.price}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleOpenEditSpa(s)} className="btn-outline btn-sm">
                          <Edit2 size={14} /> Edit
                        </button>
                        <button onClick={() => deleteSpaService(s.id)} className="btn-outline btn-sm" style={{ color: 'var(--brand-red)' }}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Venue Name</th>
                  <th>Capacity</th>
                  <th>Price Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {venues.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <img src={v.image} alt={v.name} className="image-thumb" />
                    </td>
                    <td>
                      <strong>{v.name}</strong>
                      <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)', maxWidth: '320px' }}>{v.description}</div>
                    </td>
                    <td>{v.capacity}</td>
                    <td style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>{v.price}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleOpenEditVenue(v)} className="btn-outline btn-sm">
                          <Edit2 size={14} /> Edit
                        </button>
                        <button onClick={() => deleteVenue(v.id)} className="btn-outline btn-sm" style={{ color: 'var(--brand-red)' }}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Spa Modal */}
      {spaModalOpen && (
        <div className="modal-overlay" onClick={() => setSpaModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingSpa ? 'Edit Spa Ritual' : 'Add Spa Ritual'}</h3>
              <button className="modal-close-btn" onClick={() => setSpaModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSpaSubmit}>
              <div className="form-group">
                <label>Treatment Name</label>
                <input type="text" className="form-control" required value={spaForm.name} onChange={(e) => setSpaForm({ ...spaForm, name: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" className="form-control" required value={spaForm.category} onChange={(e) => setSpaForm({ ...spaForm, category: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input type="text" className="form-control" placeholder="e.g. 60 Mins" required value={spaForm.duration} onChange={(e) => setSpaForm({ ...spaForm, duration: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="text" className="form-control" required value={spaForm.price} onChange={(e) => setSpaForm({ ...spaForm, price: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows={3} value={spaForm.description} onChange={(e) => setSpaForm({ ...spaForm, description: e.target.value })} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setSpaModalOpen(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Save Spa Ritual</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Venue Modal */}
      {venueModalOpen && (
        <div className="modal-overlay" onClick={() => setVenueModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingVenue ? 'Edit Event Venue' : 'Add Event Venue'}</h3>
              <button className="modal-close-btn" onClick={() => setVenueModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleVenueSubmit}>
              <div className="form-group">
                <label>Venue Name</label>
                <input type="text" className="form-control" required value={venueForm.name} onChange={(e) => setVenueForm({ ...venueForm, name: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="text" className="form-control" placeholder="e.g. Up to 300 Guests" required value={venueForm.capacity} onChange={(e) => setVenueForm({ ...venueForm, capacity: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Price Rate</label>
                  <input type="text" className="form-control" placeholder="e.g. ₦2,500,000 / Day" required value={venueForm.price} onChange={(e) => setVenueForm({ ...venueForm, price: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows={3} value={venueForm.description} onChange={(e) => setVenueForm({ ...venueForm, description: e.target.value })} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setVenueModalOpen(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Save Venue</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
