import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const PRODUCTS = [
  {
    id: 1,
    category: 'Resortwear',
    name: 'Adire Silk Wrap Dress',
    price: '₦65,000',
    description: 'Hand-dyed Abeokuta indigo silk with fluid draped silhouette.',
    image: '/images/boutique-hero.jpg',
    objectPosition: '78% 30%', // Zooms to Adire wrap dress on mannequin
    tag: 'Best Seller',
  },
  {
    id: 2,
    category: 'Resortwear',
    name: 'Linen Resort Tunic & Shirt',
    price: '₦48,000',
    description: 'Breathable pure linen tunic with subtle hand-stitched detailing.',
    image: '/images/boutique-hero.jpg',
    objectPosition: '32% 35%', // Zooms to linen shirts & tunics rack
    tag: 'New Season',
  },
  {
    id: 3,
    category: 'Accessories',
    name: 'Artisan Leather Handbag',
    price: '₦58,000',
    description: 'Full-grain leather tote with hand-dyed Adire accent panels.',
    image: '/images/boutique-hero.jpg',
    objectPosition: '26% 56%', // Zooms to leather handbag display
    tag: 'Exclusive',
  },
  {
    id: 4,
    category: 'Footwear',
    name: 'Handwoven Leather Sandals',
    price: '₦54,000',
    description: 'Full-grain calfskin leather woven by hand for resort leisure.',
    image: '/images/boutique-hero.jpg',
    objectPosition: '33% 90%', // Zooms to leather sandals display table
    tag: 'Crafted',
  },
  {
    id: 5,
    category: 'Resortwear',
    name: 'Adire Indigo Kimono',
    price: '₦62,000',
    description: 'Flowing open-front kimono dyed in historical Abeokuta indigo vats.',
    image: '/images/boutique-hero.jpg',
    objectPosition: '8% 30%', // Zooms to indigo kimonos on left rack
    tag: 'Signature',
  },
  {
    id: 6,
    category: 'Local Designers',
    name: 'Tailored Gold-Trim Kaftan',
    price: '₦78,000',
    description: 'Royal structured kaftan with intricate Yoruba embroidery accents.',
    image: '/images/boutique-hero.jpg',
    objectPosition: '14% 35%', // Zooms to tailored kaftans
    tag: 'Heritage',
  },
  {
    id: 7,
    category: 'Accessories',
    name: 'Ankara Silk Scarf',
    price: '₦27,000',
    description: '100% Mulberry silk scarf featuring vibrant contemporary geometric motifs.',
    image: '/images/boutique-hero.jpg',
    objectPosition: '55% 45%', // Zooms to silk drapes & scarves
    tag: 'Limited Edition',
  },
  {
    id: 8,
    category: 'Footwear',
    name: 'Woven Leather Resort Slides',
    price: '₦42,000',
    description: 'Lightweight cushioned leather slides for poolside and evening lounge.',
    image: '/images/boutique-hero.jpg',
    objectPosition: '36% 88%', // Zooms to leather slides
    tag: 'Resort Must',
  },
];

export default function Boutique() {
  const { boutiqueItems } = useData();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = activeTab === 'All'
    ? boutiqueItems
    : boutiqueItems.filter((p) => p.category === activeTab);

  return (
    <main>
      {/* BOUTIQUE HERO BANNER */}
      <section
        className="hero hero-sm"
        style={{ backgroundImage: "url('/images/boutique-hero.jpg')" }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line"></span>
            <span>The Curated Atelier</span>
          </div>
          <h1 className="hero-title hero-title-sm">Wearable Abeokuta Art &amp; Luxury</h1>
          <p className="hero-body">
            A private edit of bespoke Adire silk resortwear, handcrafted artisan jewelry, and local designer collections. Located on the ground floor, open daily for guests &amp; visitors.
          </p>
        </div>
      </section>

      {/* FEATURED SPOTLIGHT BENTO STRIP */}
      <section className="bento-strip" style={{ padding: '80px var(--container-px)', gap: '48px', alignItems: 'center' }}>
        <div className="bento-image" style={{ flex: 1, minWidth: '320px', borderRadius: '8px', overflow: 'hidden', height: '420px' }}>
          <img
            src="/images/boutique-hero.jpg"
            alt="The Adire Heritage Collection"
            decoding="async"
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '78% 30%' }}
          />
        </div>
        <div className="bento-text" style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Signature Atelier</span>
          </div>
          <h2 className="section-title-sm" style={{ margin: 0 }}>The Adire Silk &amp; Heritage Collection</h2>
          <p className="body-text">
            Each garment in our flagship collection is dyed in historical Abeokuta indigo vats by master craftswomen, combining centuries of Yoruba textile legacy with modern fluid resort cuts.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
            <div style={{ background: 'var(--color-bg-alt)', padding: '16px 20px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, display: 'block' }}>Boutique Hours</span>
              <strong style={{ fontSize: '14px', color: 'var(--color-dark)' }}>Daily: 9:00 AM &ndash; 9:00 PM</strong>
            </div>
            <div style={{ background: 'var(--color-bg-alt)', padding: '16px 20px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, display: 'block' }}>Bespoke Fitting</span>
              <strong style={{ fontSize: '14px', color: 'var(--color-dark)' }}>In-Suite Trunk Shows Available</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS FILTER */}
      <div className="gallery-tabs" style={{ justifyContent: 'center', marginBottom: '40px' }}>
        {['All', 'Resortwear', 'Accessories', 'Footwear', 'Local Designers'].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`gallery-tab ${activeTab === cat ? 'active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat === 'All' ? 'All Collections' : cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <section className="product-grid-container" style={{ padding: '0 var(--container-px) 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
          {filteredProducts.map((prod) => (
            <article
              key={prod.id}
              className="room-card"
              style={{
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'pointer',
              }}
            >
              <div className="room-image" style={{ height: '340px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={prod.image}
                  alt={prod.name}
                  decoding="async"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: prod.objectPosition || 'center',
                    transform: 'scale(1.05)',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'var(--color-gold)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                  }}
                >
                  {prod.tag}
                </span>
              </div>
              <div className="room-content" style={{ padding: '20px' }}>
                <p style={{ fontSize: '11px', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', marginBottom: '6px' }}>
                  {prod.category}
                </p>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', margin: '4px 0 8px', color: 'var(--color-dark)' }}>
                  {prod.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {prod.description}
                </p>
              </div>
              <div className="room-footer" style={{ padding: '0 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark)' }}>
                  {prod.price}
                </span>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => setSelectedProduct(prod)}
                >
                  Inquire Item
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PRIVATE FITTING & TAILORING CTA */}
      <section style={{ background: 'var(--color-bg-alt)', padding: '80px var(--container-px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'grid', gap: '20px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-line"></span>
            <span>Personal Stylist &amp; Bespoke Orders</span>
          </div>
          <h2 className="section-title-sm" style={{ margin: 0 }}>Custom Alterations &amp; Private Viewing</h2>
          <p className="body-text">
            Looking for a customized size or a private in-suite styling session? Our resident fashion concierge will bring curated selections directly to your suite.
          </p>
          <div>
            <Link to="/contact" className="btn btn-dark" style={{ display: 'inline-block' }}>
              Book Personal Styling Session
            </Link>
          </div>
        </div>
      </section>

      {/* ITEM INQUIRY MODAL */}
      {selectedProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              maxWidth: '480px',
              width: '100%',
              padding: '32px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: 'var(--color-dark)',
              }}
            >
              ✕
            </button>
            <span style={{ fontSize: '11px', color: 'var(--color-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
              {selectedProduct.category} &bull; {selectedProduct.tag}
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', margin: '8px 0', color: 'var(--color-dark)' }}>
              {selectedProduct.name}
            </h3>
            <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-gold)', marginBottom: '16px' }}>
              {selectedProduct.price}
            </p>
            <p className="body-text" style={{ marginBottom: '20px' }}>
              {selectedProduct.description}
            </p>
            <div style={{ background: 'var(--color-bg-alt)', padding: '16px', borderRadius: '4px', marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', color: 'var(--color-dark)', margin: 0 }}>
                📍 Available at the Ground Floor Boutique desk or via in-suite delivery.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                to="/contact"
                className="btn btn-dark btn-full"
                onClick={() => setSelectedProduct(null)}
              >
                Inquire Desk
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
