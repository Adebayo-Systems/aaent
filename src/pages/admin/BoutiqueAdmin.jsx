import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ShoppingBag, Plus, Edit2, Trash2, X } from 'lucide-react';

export default function BoutiqueAdmin() {
  const { boutiqueItems, addBoutiqueItem, updateBoutiqueItem, deleteBoutiqueItem } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    name: '',
    category: 'Resortwear',
    price: '',
    description: '',
    image: '/images/boutique-hero.jpg',
    tag: 'Exclusive',
    stockStatus: 'In Stock',
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setForm({
      name: '',
      category: 'Resortwear',
      price: '₦60,000',
      description: '',
      image: '/images/boutique-hero.jpg',
      tag: 'New Season',
      stockStatus: 'In Stock',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      image: item.image,
      tag: item.tag || '',
      stockStatus: item.stockStatus || 'In Stock',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateBoutiqueItem(editingItem.id, form);
    } else {
      addBoutiqueItem(form);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', margin: 0 }}>
            Boutique Shop Inventory
          </h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
            Manage resortwear, indigenous accessories, Adire silks, and luxury artisan goods.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary">
          <Plus size={16} /> Add Boutique Product
        </button>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Tag</th>
                <th>Stock Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {boutiqueItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} className="image-thumb" />
                  </td>

                  <td>
                    <strong>{item.name}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)', maxWidth: '300px' }}>
                      {item.description}
                    </div>
                  </td>

                  <td>{item.category}</td>

                  <td style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>{item.price}</td>

                  <td>
                    {item.tag && (
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(75, 107, 130, 0.15)',
                          color: 'var(--brand-blue)',
                          fontWeight: '700',
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        item.stockStatus === 'In Stock' ? 'confirmed' : 'pending'
                      }`}
                    >
                      {item.stockStatus || 'In Stock'}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleOpenEdit(item)} className="btn-outline btn-sm">
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => deleteBoutiqueItem(item.id)}
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

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingItem ? 'Edit Product' : 'Add Boutique Product'}</h3>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Resortwear, Accessories, Footwear"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="₦65,000"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tag / Badge</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Best Seller, Exclusive"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Stock Status</label>
                  <select
                    className="form-control"
                    value={form.stockStatus}
                    onChange={(e) => setForm({ ...form, stockStatus: e.target.value })}
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
