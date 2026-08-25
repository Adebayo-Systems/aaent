import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Restaurant() {
  const [reserved, setReserved] = useState(false);
  const [formData, setFormData] = useState({ name: '', guests: '2', date: '', time: '19:00' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setReserved(true);
  };

  return (
    <main>
      {/* DINING HERO */}
      <section className="hero hero-lg" style={{ backgroundImage: "url('/images/5498a0f4-d8ee-4951-9a4e-a17d7b1a837b.webp')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line"></span>
            <span>The Tasting Room</span>
          </div>
          <h1 className="hero-title">Elevated Epicurean Journey</h1>
          <p className="hero-body">
            Where indigenous West African flavors are masterfully reimagined with contemporary global techniques.
          </p>
        </div>
      </section>

      {/* HOURS SPLIT */}
      <section className="hours-split">
        <div className="welcome-text">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Sensory Delights</span>
          </div>
          <h2 className="section-title">West African Fusion At Its Finest</h2>
          <p className="body-text">
            Our master culinary crew sources wild spices from the local markets and premium imported prime cuts to forge a highly original gastronomy. Flanked by textured clay walls and moody dim lighting, the Tasting Room invites a deep appreciation of time, taste, and connection.
          </p>
          <a href="#table-reservation" className="link-row">Reserve a Table Below &rarr;</a>
        </div>
        <div className="hours-card">
          <h3>Opening Hours</h3>
          <div className="hours-rows">
            <div className="slot-row"><span>Breakfast Buffet</span><span>7:00 AM &mdash; 10:30 AM</span></div>
            <div className="slot-row"><span>Lunch Service</span><span>12:00 PM &mdash; 3:30 PM</span></div>
            <div className="slot-row"><span>Dinner Tasting</span><span>6:00 PM &mdash; 10:30 PM</span></div>
            <div className="slot-row"><span>Bar &amp; Lounge</span><span>5:00 PM &mdash; Midnight</span></div>
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="featured-dishes">
        <div className="section-header-center">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Signature Culinary Art</span>
          </div>
          <h2 className="section-title center">Our Chef&rsquo;s Masterpieces</h2>
        </div>
        <div className="dishes-grid">
          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/65abb5d1-5927-4f41-836c-6075850bfe38.webp" alt="Suya-Glazed Tenderloin" decoding="async" loading="eager" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Suya-Glazed Tenderloin</h4>
                <span className="dish-price">&#8358;18,500</span>
              </div>
              <p className="dish-category">Mains</p>
              <p className="dish-desc">Aged premium beef, dry-rubbed in house suya spice blend, smoked mahogany finish, sweet plantain mash.</p>
            </div>
          </article>

          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/ce3cd6b4-2af1-4d27-beb6-050cff8e580a.webp" alt="Seafood Okra Royale" decoding="async" loading="lazy" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Seafood Okra Royale</h4>
                <span className="dish-price">&#8358;24,000</span>
              </div>
              <p className="dish-category">Traditional</p>
              <p className="dish-desc">Jumbo prawns, fresh local crab claws, and soft sea bass slow-cooked in a rich local herbal broth.</p>
            </div>
          </article>

          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/81b7bd52-e085-4877-8db4-ca3d693eb108.webp" alt="Gold-Leaf Jollof Arancini" decoding="async" loading="lazy" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Gold-Leaf Jollof Arancini</h4>
                <span className="dish-price">&#8358;11,000</span>
              </div>
              <p className="dish-category">Starters</p>
              <p className="dish-desc">Crispy fried party-style Jollof risotto balls filled with aged goat cheese, garnished with edible gold.</p>
            </div>
          </article>

          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/65abb5d1-5927-4f41-836c-6075850bfe38.webp" alt="Hibiscus Saffron Tart" decoding="async" loading="lazy" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Hibiscus Saffron Tart</h4>
                <span className="dish-price">&#8358;9,500</span>
              </div>
              <p className="dish-category">Desserts</p>
              <p className="dish-desc">Silky zobo-infused dark chocolate pastry shell, wild berries, premium Iranian saffron cream.</p>
            </div>
          </article>
        </div>
      </section>

      {/* BAR & LOUNGE */}
      <section className="bento-strip">
        <div className="bento-text bento-text-dark">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>The Gold Reserve</span>
          </div>
          <h2 className="section-title-sm light">Private Wine &amp; Spirits Cellar</h2>
          <p className="body-text light">
            Immerse yourself in our curated collection of vintage single-malt whiskies, rare cognac reserves, and international sommelier-selected vintages.
          </p>
        </div>
        <div className="bento-image">
          <img src="/images/1d40ef05-9b2e-49d4-bd4a-fec70557f8a4.webp" alt="Wine cellar bar" decoding="async" loading="lazy" />
        </div>
      </section>

      {/* TABLE RESERVATION FORM */}
      <section id="table-reservation" className="reservation-cta" style={{ background: 'var(--color-bg-alt)', padding: '60px var(--container-px)' }}>
        <div className="reservation-panel" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Table Reservations</span>
          </div>
          <h2 className="section-title center">Book A Dining Experience</h2>
          
          {reserved ? (
            <div style={{ background: '#d4edda', color: '#155724', padding: '20px', borderRadius: '4px', marginTop: '20px' }}>
              <h3>Table Reserved!</h3>
              <p>Thank you, {formData.name || 'Guest'}. Your table for {formData.guests} has been requested. Our maitre d' will confirm shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Your Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-sans)' }}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6+ Guests (Private Dining)</option>
                </select>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-sans)' }}
                />
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-sans)' }}
                />
              </div>
              <button type="submit" className="btn btn-gold" style={{ marginTop: '12px' }}>
                Confirm Table Reservation
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
