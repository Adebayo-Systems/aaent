import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BedDouble, Plus, Edit2, Trash2, CheckCircle, XCircle, X } from 'lucide-react';

export default function RoomsAdmin() {
  const { rooms, addRoom, updateRoom, deleteRoom, toggleRoomAvailability } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'standard',
    price: '',
    image: '/images/7a0c92f4-46a4-40fa-87fb-391c3608dd8b.webp',
    description: '',
    available: true,
  });

  const handleOpenAddModal = () => {
    setEditingRoom(null);
    setFormData({
      name: '',
      category: 'standard',
      price: '₦150,000 / Night',
      image: '/images/7a0c92f4-46a4-40fa-87fb-391c3608dd8b.webp',
      description: '',
      available: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      category: room.category,
      price: room.price,
      image: room.image,
      description: room.description,
      available: room.available !== undefined ? room.available : true,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRoom) {
      updateRoom(editingRoom.id, formData);
    } else {
      addRoom(formData);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', margin: 0 }}>
            Suites &amp; Room Management
          </h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
            Add, update pricing, descriptions, and toggle room availability on the live website.
          </p>
        </div>

        <button onClick={handleOpenAddModal} className="btn-primary">
          <Plus size={16} /> Add New Room Suite
        </button>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Suite Name</th>
                <th>Category</th>
                <th>Price per Night</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    <img src={room.image} alt={room.name} className="image-thumb" />
                  </td>

                  <td>
                    <strong>{room.name}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)', maxWidth: '300px' }}>
                      {room.description}
                    </div>
                  </td>

                  <td>
                    <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: 'var(--brand-blue)' }}>
                      {room.category}
                    </span>
                  </td>

                  <td style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>{room.price}</td>

                  <td>
                    <button
                      onClick={() => toggleRoomAvailability(room.id)}
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {room.available ? (
                        <span className="status-badge confirmed">
                          <CheckCircle size={12} /> Available
                        </span>
                      ) : (
                        <span className="status-badge cancelled">
                          <XCircle size={12} /> Booked / Unavailable
                        </span>
                      )}
                    </button>
                  </td>

                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleOpenEditModal(room)} className="btn-outline btn-sm">
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="btn-outline btn-sm"
                        style={{ color: 'var(--brand-red)', borderColor: 'rgba(236, 50, 55, 0.3)' }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Room Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingRoom ? 'Edit Room Suite' : 'Add New Suite'}</h3>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Suite Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="executive">Executive</option>
                    <option value="presidential">Presidential</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price Display String</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ₦150,000 / Night"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="available-check"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                />
                <label htmlFor="available-check" style={{ margin: 0, cursor: 'pointer' }}>
                  Set Room as Currently Available on Web
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingRoom ? 'Save Changes' : 'Create Room Suite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
