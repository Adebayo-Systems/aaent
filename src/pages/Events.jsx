import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Events() {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'corporate',
    guests: '50-100',
    date: '',
    details: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* EVENTS HERO */}
      <section className="hero hero-lg" style={{ backgroundImage: "url('/images/8807c8e1-5aa6-475a-8648-c0bc396b72fc.webp')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line"></span>
            <span>Elite Assemblies</span>
          </div>
          <h1 className="hero-title">Events &amp; Conferences</h1>
          <p className="hero-body">
            Host your high-caliber corporate summits, elegant cocktail parties, or multi-day executive workshops in Abeokuta's most secure and technically advanced spaces.
          </p>
        </div>
      </section>

      {/* VENUES */}
      <section className="venues-section" id="event-halls">
        <div className="listing-header">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>The Venues</span>
          </div>
          <h2 className="section-title">Perfect Settings for Discerning Hosts</h2>
        </div>

        <div className="venue-row">
          <div className="venue-image">
            <img src="/images/3ae76921-a48d-4cc8-a9f2-8514e32ddc51.webp" alt="Grand Ballroom" decoding="async" loading="eager" />
          </div>
          <div className="venue-text">
            <div className="venue-title-badge">
              <span className="badge">Up to 300 Guests</span>
              <h3>Grand Ballroom</h3>
            </div>
            <p className="body-text">
              Our flagship hall. Masterfully tailored with vaulted ceilings, crystal droplet installations, customizable acoustics, and a staging area fit for international keynote galas or bespoke luxury weddings.
            </p>
            <div className="facilities">
              <p className="facilities-label">Key Facilities</p>
              <p className="facilities-desc">Modular staging, private pre-function lobby, dedicated green rooms, built-in dual laser projectors.</p>
            </div>
          </div>
        </div>

        <div className="venue-row">
          <div className="venue-image">
            <img src="/images/6cdd124c-8cb3-4231-89c2-7cc1069aa870.webp" alt="Executive Boardroom" decoding="async" loading="lazy" />
          </div>
          <div className="venue-text">
            <div className="venue-title-badge">
              <span className="badge">Up to 20 Guests</span>
              <h3>Executive Boardroom</h3>
            </div>
            <p className="body-text">
              An ultra-secured summit environment engineered for key stakeholders. Features custom mahogany meeting tables, biometric sound shielding, and immediate high-speed digital infrastructure.
            </p>
            <div className="facilities">
              <p className="facilities-label">Key Facilities</p>
              <p className="facilities-desc">8K presentation screens, secure video conferencing array, premium espresso and beverage credenza.</p>
            </div>
          </div>
        </div>

        <div className="venue-row">
          <div className="venue-image">
            <img src="/images/5c3dd353-ebe1-467e-8956-89e6999f78c9.webp" alt="The Garden Terrace" decoding="async" loading="lazy" />
          </div>
          <div className="venue-text">
            <div className="venue-title-badge">
              <span className="badge">Up to 150 Guests</span>
              <h3>The Garden Terrace</h3>
            </div>
            <p className="body-text">
              An exquisite open-air garden venue. Set against lush local botanicals and the gentle flow of the Ogun River nearby, it captures the perfect Abeokuta evening breeze for premium sunset cocktails and private sunset soirées.
            </p>
            <div className="facilities">
              <p className="facilities-label">Key Facilities</p>
              <p className="facilities-desc">Ambient atmospheric lighting system, dedicated outdoor gourmet bar setup, staging area for acoustic live music.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="event-types-strip" id="event-types">
        <div className="section-header-center">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Curated Services</span>
          </div>
          <h2 className="section-title center">Occasions Executed to Flawless Standards</h2>
        </div>
        <div className="types-grid">
          <div className="type-card"><h4>Weddings</h4><p>Curating lifetime memories with immaculate bridal styling, custom menus, and dedicated concierge care.</p></div>
          <div className="type-card"><h4>Corporate Summits</h4><p>High-security environments equipped with fiber infrastructure for effortless executive retreats.</p></div>
          <div className="type-card"><h4>Press Conferences</h4><p>Optimized media staging, premium acoustics, and tailored hospitality suites for maximum brand presence.</p></div>
          <div className="type-card"><h4>Private Dining</h4><p>Intimate tasting sessions in our elite vaults, featuring personal master chef consultations.</p></div>
          <div className="type-card"><h4>Milestone Birthdays</h4><p>Vibrant, high-style celebrations designed in signature Abeokuta flair with tailored entertainment.</p></div>
        </div>
      </section>

      {/* EVENT ENQUIRY FORM */}
      <section id="event-enquiry" className="reservation-cta" style={{ padding: '60px var(--container-px)' }}>
        <div className="reservation-panel" style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Bespoke Concierge</span>
          </div>
          <h2 className="section-title center">Plan Your Event With Us</h2>
          
          {submitted ? (
            <div style={{ background: '#d4edda', color: '#155724', padding: '24px', borderRadius: '4px', textAlign: 'center', marginTop: '20px' }}>
              <h3>Enquiry Received!</h3>
              <p>Thank you, {formState.name}. Our dedicated Event Concierge director will review your details and reach out within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ marginTop: '24px', display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                />
                <select
                  value={formState.eventType}
                  onChange={(e) => setFormState({ ...formState, eventType: e.target.value })}
                  style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                >
                  <option value="corporate">Corporate Summit</option>
                  <option value="wedding">Wedding / Ceremony</option>
                  <option value="gala">Gala / Reception</option>
                  <option value="private">Private Soirée</option>
                </select>
                <input
                  type="date"
                  required
                  value={formState.date}
                  onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                  style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                />
              </div>

              <textarea
                rows="4"
                placeholder="Share your requirements, expected guests, or special requests..."
                value={formState.details}
                onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                style={{ padding: '14px', borderRadius: '4px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-sans)' }}
              ></textarea>

              <button type="submit" className="btn btn-gold" style={{ justifySelf: 'center', width: '100%' }}>
                Submit Event Enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
