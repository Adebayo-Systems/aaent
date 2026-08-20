import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main>
      {/* ABOUT HERO */}
      <section className="hero hero-sm" style={{ backgroundImage: "url('/images/7c1417c6-64ef-4bce-a5f1-747ffcffe75d.webp')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line"></span>
            <span>Our Story</span>
          </div>
          <h1 className="hero-title hero-title-sm">About AA Entertainment</h1>
          <p className="hero-body">Forging a new global legacy of luxury grounded in authentic African soul.</p>
        </div>
      </section>

      {/* PROFILE / HERITAGE */}
      <section className="welcome-section">
        <div className="welcome-image">
          <img src="/images/12fba470-e55f-4c2a-ab16-82e2004d105c.webp" alt="AA Entertainment property exterior" decoding="async" loading="eager" />
        </div>
        <div className="welcome-text">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Heritage &amp; Horizon</span>
          </div>
          <h2 className="section-title">Understated Elegance. Uncompromising Quality.</h2>
          <p className="body-text">
            Founded with the ambition of bridging the finest world-class standards of premium hoteliers with the rich, organic materials and soulful energy of Nigeria, AA Entertainment is more than a hotel. It is a premier lifestyle sanctuary curated for global visionaries, artists, and leaders.
          </p>
          <p className="body-text">
            From the hand-carved mahogany panels lining our suites to the advanced security details quietly working in the background, every touchpoint has been deliberated upon with extreme focus on security, comfort, and sensory delight.
          </p>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="vision-mission">
        <div className="vm-card">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Our Vision</span>
          </div>
          <h3 className="vm-title">Redefining the standards of African luxury</h3>
          <p className="body-text">
            To stand as the premier symbol of genuine hospitality across West Africa, recognized globally for blending modern boutique design with pristine Nigerian warmth.
          </p>
        </div>
        <div className="vm-card">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Our Mission</span>
          </div>
          <h3 className="vm-title">A relentless pursuit of flawless service</h3>
          <p className="body-text">
            To provide our distinguished guests with an oasis of calm, safety, and epicurean excellence. We celebrate local artisans, nourish our communities, and empower our exceptional people.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose-us">
        <div className="section-header-center">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>The AA Distinction</span>
          </div>
          <h2 className="section-title center">Why Our Guests Return</h2>
        </div>
        <div className="diff-grid">
          <div className="diff-card">
            <div className="diff-num">01</div>
            <div>
              <h4>Premium Comfort</h4>
              <p>Plush, double-insulated acoustic windows, hand-woven linens, and customizable pillow menus for deeper sleep.</p>
            </div>
          </div>
          <div className="diff-card">
            <div className="diff-num">02</div>
            <div>
              <h4>Prime Location</h4>
              <p>Quietly nested in Kuto's tranquil, secure residential quarter, moments from the historic Olumo Rock and the heart of Abeokuta's commercial district.</p>
            </div>
          </div>
          <div className="diff-card">
            <div className="diff-num">03</div>
            <div>
              <h4>Exceptional Dining</h4>
              <p>Award-winning gastronomic menus crafted from organic field-to-fork ingredients paired with old-world vintage selections.</p>
            </div>
          </div>
          <div className="diff-card">
            <div className="diff-num">04</div>
            <div>
              <h4>Professional Events</h4>
              <p>Advanced smart technology, high-speed fiber lines, and meticulous banquet planning for effortless executive events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="reservation-cta">
        <div className="reservation-panel">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Experience It Yourself</span>
          </div>
          <h2 className="section-title center">Plan your visit to AA Entertainment</h2>
          <p className="body-text center narrow">
            Discover why global executives, leisure connoisseurs, and cultural leaders make AA Entertainment their home in Abeokuta.
          </p>
          <Link to="/reservation" className="btn btn-gold">Reserve Your Sanctuary</Link>
        </div>
      </section>
    </main>
  );
}
