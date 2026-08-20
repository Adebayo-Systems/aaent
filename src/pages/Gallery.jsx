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
      <section className="gallery-grid-container" style={{ paddingBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredItems.map((item) => {
            const imgSrc = item.image || item.src;
            return (
              <div
                key={item.id}
                className="gallery-photo"
                onClick={() => setLightboxImg({ ...item, src: imgSrc })}
                style={{ cursor: 'pointer', height: '260px', overflow: 'hidden', borderRadius: '4px', position: 'relative' }}
              >
                <img
                  src={imgSrc}
                  alt={item.title}
                  decoding="async"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '16px',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  {item.title}
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
