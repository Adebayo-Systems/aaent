import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Image as ImageIcon, Plus, Trash2, X } from 'lucide-react';

export default function GalleryAdmin() {
  const { galleryItems, addGalleryItem, deleteGalleryItem } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'rooms',
    image: '/images/35e11206-ee59-4d2c-8e13-b5810c0b4588.webp',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGalleryItem(form);
    setModalOpen(false);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', margin: 0 }}>
            Media &amp; Photo Gallery
          </h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
            Manage high-resolution property photography displayed on the public gallery page.
          </p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus size={16} /> Add Photo
        </button>
      </div>

      <div className="admin-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {galleryItems.map((g) => (
            <div
              key={g.id}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--admin-card-border)',
                backgroundColor: 'var(--admin-bg-secondary)',
                position: 'relative',
              }}
            >
              <img src={g.image} alt={g.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '12px' }}>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{g.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      color: 'var(--brand-blue)',
                      fontWeight: '700',
                    }}
                  >
                    {g.category}
                  </span>

                  <button
                    onClick={() => deleteGalleryItem(g.id)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--brand-red)',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Gallery Photo</h3>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Photo Title / Caption</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Executive Lounge Terrace"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Category Tag</label>
                <select
                  className="form-control"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="rooms">Suites &amp; Rooms</option>
                  <option value="dining">Tasting Room &amp; Cafe</option>
                  <option value="events">Event Halls &amp; Ballrooms</option>
                  <option value="spa">Spa &amp; Wellness</option>
                </select>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
