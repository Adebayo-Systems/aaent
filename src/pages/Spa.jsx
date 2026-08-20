import React from 'react';
import { Link } from 'react-router-dom';

export default function Spa() {
  return (
    <main>
      {/* SPA HERO */}
      <section className="hero hero-lg" style={{ backgroundImage: "url('/images/1d40ef05-9b2e-49d4-bd4a-fec70557f8a4.webp')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line"></span>
            <span>The Sanctuary Spa</span>
          </div>
          <h1 className="hero-title">Restore. Renew. Retreat.</h1>
          <p className="hero-body">
            A serene wellness haven blending indigenous African healing rituals with world-class spa science, tucked away from the rhythm of Abeokuta.
          </p>
        </div>
      </section>

      {/* INTRO SPLIT */}
      <section className="hours-split">
        <div className="welcome-text">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Deep Restoration</span>
          </div>
          <h2 className="section-title">A Sensory Escape for Mind &amp; Body</h2>
          <p className="body-text">
            Our therapists blend traditional shea butter, black soap, and botanical extracts sourced from local Nigerian markets with globally trained massage and skincare techniques. Every treatment room is private, softly lit, and acoustically shielded &mdash; a true pause from the city outside.
          </p>
          <Link to="/contact" className="link-row">Inquire for Appointments &rarr;</Link>
        </div>
        <div className="hours-card">
          <h3>Spa Hours</h3>
          <div className="hours-rows">
            <div className="slot-row"><span>Weekdays</span><span>8:00 AM &mdash; 9:00 PM</span></div>
            <div className="slot-row"><span>Weekends</span><span>7:00 AM &mdash; 10:00 PM</span></div>
            <div className="slot-row"><span>Couples Suite</span><span>By Appointment</span></div>
            <div className="slot-row"><span>Last Booking</span><span>90 Min Before Close</span></div>
          </div>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="featured-dishes">
        <div className="section-header-center">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Signature Rituals</span>
          </div>
          <h2 className="section-title center">Our Treatment Menu</h2>
        </div>
        <div className="dishes-grid">
          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/f1cab3bd-d0fd-4296-9ffa-2d640567c708.webp" alt="African Shea Ritual Massage" decoding="async" loading="eager" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>African Shea Ritual Massage</h4>
                <span className="dish-price">&#8358;45,000</span>
              </div>
              <p className="dish-category">90 Minutes</p>
              <p className="dish-desc">Full-body massage using warmed raw shea butter, tailored to release tension from travel or long meetings.</p>
            </div>
          </article>

          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/70bd5c3a-dab1-436a-bb55-53a69fb17bd6.webp" alt="Black Soap Radiance Facial" decoding="async" loading="lazy" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Black Soap Radiance Facial</h4>
                <span className="dish-price">&#8358;38,000</span>
              </div>
              <p className="dish-category">60 Minutes</p>
              <p className="dish-desc">Deep-cleansing facial using traditional black soap and botanical extracts for a natural, lasting glow.</p>
            </div>
          </article>

          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/1ce8659d-1c33-4b32-bef5-3aadaa4e6246.webp" alt="Hot Stone Therapy" decoding="async" loading="lazy" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Hot Stone Therapy</h4>
                <span className="dish-price">&#8358;52,000</span>
              </div>
              <p className="dish-category">75 Minutes</p>
              <p className="dish-desc">Heated volcanic stones combined with deep tissue technique to melt away chronic muscle tension.</p>
            </div>
          </article>

          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/73e7ae62-091a-41f2-b125-9f842893bb0b.webp" alt="Couples Retreat Package" decoding="async" loading="lazy" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Couples Retreat Package</h4>
                <span className="dish-price">&#8358;95,000</span>
              </div>
              <p className="dish-category">120 Minutes</p>
              <p className="dish-desc">Side-by-side massage in our private couples suite with champagne and light bites after your session.</p>
            </div>
          </article>
        </div>
      </section>

      {/* AMENITIES */}
      <div className="amenities-strip">
        <div className="amenity">
          <img src="/images/79064587-40fe-4af3-bd18-436ccb435708.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Steam &amp; Sauna</span>
        </div>
        <div className="amenity">
          <img src="/images/939168cf-bf01-4193-b23a-04a750748cd8.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Heated Relaxation Pool</span>
        </div>
        <div className="amenity">
          <img src="/images/c55306d6-2ca8-40b0-a491-b802bab4286e.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Herbal Tea Lounge</span>
        </div>
        <div className="amenity">
          <img src="/images/6681ae90-ad67-4c06-9659-c6fd2f4d58ac.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Private Treatment Suites</span>
        </div>
        <div className="amenity">
          <img src="/images/399d2fb4-76c9-45f6-a95c-9610391c3f53.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Licensed Therapists</span>
        </div>
      </div>
    </main>
  );
}
