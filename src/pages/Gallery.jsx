import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export default function Gallery() {
  const { galleryItems } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <main>
      {/* GALLERY HEADER */}
      <section className="listing-header">
        <div className="eyebrow">
          <span className="eyebrow-line"></span>
          <span>Visual Journey</span>
        </div>
        <h1 className="section-title listing-title">Explore AA Entertainment</h1>
        <p className="body-text listing-subtitle">
          Step through our lens and immerse yourself in the exquisite details, rich textures, and magnificent spaces we have curated for your supreme relaxation.
        </p>
      </section>

      {/* GALLERY TABS */}
      <div className="gallery-tabs">
        {['all', 'exterior', 'reception', 'rooms', 'restaurant', 'dining', 'events', 'spa', 'facilities'].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`gallery-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            style={{ textTransform: 'capitalize' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GALLERY GRID */}
      <section className="gallery-grid-container">
        <div className="gallery-photos-grid">
          {filteredItems.map((item) => {
            const imgSrc = item.image || item.src;
            return (
              <div
                key={item.id}
                className="gallery-photo-card"
                onClick={() => setLightboxImg({ ...item, src: imgSrc })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLightboxImg({ ...item, src: imgSrc })}
              >
                <img
                  src={imgSrc}
                  alt={item.title}
                  decoding="async"
                  loading="lazy"
                />
                <div className="gallery-photo-overlay">
                  <span>{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.title}
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '4px' }}
            />
            <p style={{ color: '#fff', textAlign: 'center', marginTop: '12px', fontSize: '18px', fontFamily: 'var(--font-serif)' }}>
              {lightboxImg.title}
            </p>
            <button
              onClick={() => setLightboxImg(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                color: '#fff',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
