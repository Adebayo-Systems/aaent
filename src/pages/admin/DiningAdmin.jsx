import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { UtensilsCrossed, Plus, Edit2, Trash2, X } from 'lucide-react';

export default function DiningAdmin() {
  const { dishes, addDish, updateDish, deleteDish } = useData();

  const [activeTab, setActiveTab] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'restaurant',
    category: 'Mains',
    price: '',
    description: '',
    image: '/images/5498a0f4-d8ee-4951-9a4e-a17d7b1a837b.webp',
    tag: "Chef's Special",
  });

  const filteredDishes = dishes.filter((dish) => {
    if (activeTab === 'all') return true;
    return dish.type === activeTab;
  });

  const handleOpenAdd = () => {
    setEditingDish(null);
    setFormData({
      name: '',
      type: 'restaurant',
      category: 'Mains',
      price: '₦24,000',
      description: '',
      image: '/images/5498a0f4-d8ee-4951-9a4e-a17d7b1a837b.webp',
      tag: "Chef's Signature",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      type: dish.type,
      category: dish.category,
      price: dish.price,
      description: dish.description,
      image: dish.image,
      tag: dish.tag || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDish) {
      updateDish(editingDish.id, formData);
    } else {
      addDish(formData);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <div className="admin-card-header">
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', margin: 0 }}>
            Dining &amp; Cafe Menu Manager
          </h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>
            Manage fine dining dishes for The Tasting Room and artisanal pastries/coffees for the Cafe.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-primary">
          <Plus size={16} /> Add Menu Item
        </button>
      </div>

      <div className="admin-card">
        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          >
            All Outlets ({dishes.length})
          </button>
          <button
            onClick={() => setActiveTab('restaurant')}
            className={`tab-btn ${activeTab === 'restaurant' ? 'active' : ''}`}
          >
            🍽️ Restaurant Menu
          </button>
          <button
            onClick={() => setActiveTab('cafe')}
            className={`tab-btn ${activeTab === 'cafe' ? 'active' : ''}`}
          >
            ☕ Artisanal Cafe Menu
          </button>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Outlet</th>
                <th>Category</th>
                <th>Price</th>
                <th>Badge / Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDishes.map((dish) => (
                <tr key={dish.id}>
                  <td>
                    <img src={dish.image} alt={dish.name} className="image-thumb" />
                  </td>

                  <td>
                    <strong>{dish.name}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)', maxWidth: '320px' }}>
                      {dish.description}
                    </div>
                  </td>

                  <td>
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: dish.type === 'restaurant' ? 'var(--brand-blue)' : 'var(--brand-gold)',
                      }}
                    >
                      {dish.type}
                    </span>
                  </td>

                  <td>{dish.category}</td>

                  <td style={{ fontWeight: '700', color: 'var(--brand-gold)' }}>{dish.price}</td>

                  <td>
                    {dish.tag && (
                      <span
                        style={{
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(236, 50, 55, 0.15)',
                          color: 'var(--brand-red)',
                          fontWeight: '700',
                        }}
                      >
                        {dish.tag}
                      </span>
                    )}
                  </td>

                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleOpenEdit(dish)} className="btn-outline btn-sm">
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => deleteDish(dish.id)}
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

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingDish ? 'Edit Culinary Item' : 'Add Menu Item'}</h3>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Dish / Item Name</label>
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
                  <label>Outlet Type</label>
                  <select
                    className="form-control"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="restaurant">Restaurant (Tasting Room)</option>
                    <option value="cafe">Artisanal Cafe</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Mains, Starters, Artisanal Coffee"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. ₦28,000"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Badge / Tag (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Chef's Signature"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
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
                <label>Ingredients &amp; Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingDish ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
