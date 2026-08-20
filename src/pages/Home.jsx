import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero" style={{ backgroundImage: "url('/images/b945560e-4168-4ebc-a8a8-2caac28b44c4.webp')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line"></span>
            <span>Bespoke African Luxury</span>
          </div>
          <h1 className="hero-title">Experience Abeokuta in Sublime Style</h1>
          <p className="hero-body">
            Where cosmopolitan sophistication meets the legendary warmth of premium Nigerian hospitality. Located in the historic heart of Abeokuta, Ogun State.
          </p>
          <div className="hero-ctas">
            <Link to="/reservation" className="btn btn-gold">Reserve Your Stay</Link>
            <Link to="/rooms-listing" className="btn btn-outline-light">Explore Suites</Link>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <div className="welcome-text">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>A Warm Welcome</span>
          </div>
          <h2 className="section-title">A sanctuary designed for discerning world travellers</h2>
          <p className="body-text">
            AA Entertainment introduces a standard of luxury that honours modern architectural beauty and rich local craftsmanship. Seamlessly tailored for both high-profile business summits and leisurely riverside getaways, our spaces encapsulate the timeless spirit of Abeokuta with peaceful, warm-luxe interiors.
          </p>
          <p className="body-text">
            Indulge in carefully curated culinary journeys, state-of-the-art wellness suites, and exceptionally secure corporate spaces, all while wrapped in the exquisite rhythm of Nigeria's capital of style.
          </p>
        </div>
        <div className="welcome-image">
          <img src="/images/70bd5c3a-dab1-436a-bb55-53a69fb17bd6.webp" alt="Hotel interior lounge" decoding="async" loading="eager" />
        </div>
      </section>

      {/* FEATURED ROOMS */}
      <section className="featured-rooms">
        <div className="section-header-row">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              <span>The Collection</span>
            </div>
            <h2 className="section-title">Our Premium Sanctuaries</h2>
          </div>
          <Link to="/rooms-listing" className="btn btn-outline-dark">View All Rooms</Link>
        </div>

        <div className="rooms-row">
          <article className="room-card">
            <div className="room-image">
              <img src="/images/73e7ae62-091a-41f2-b125-9f842893bb0b.webp" alt="Standard Room" decoding="async" loading="lazy" />
            </div>
            <div className="room-content">
              <h3>Standard Room</h3>
              <p>Timeless elegance meets modern comfort. Fitted with premium work desk and plush king bedding.</p>
            </div>
            <div className="room-footer">
              <div className="price-display">
                <span className="price-label">Starting from</span>
                <span className="price-amount">&#8358;120,000 / Night</span>
              </div>
              <Link to="/room-detail" className="btn btn-dark btn-sm">Book Now</Link>
            </div>
          </article>

          <article className="room-card">
            <div className="room-image">
              <img src="/images/6c9fca76-5902-4e7d-84a3-6f041a27b324.webp" alt="Deluxe Suite" decoding="async" loading="lazy" />
            </div>
            <div className="room-content">
              <h3>Deluxe Suite</h3>
              <p>Expanded layout offering a distinct lounge area, luxury African art details, and city views.</p>
            </div>
            <div className="room-footer">
              <div className="price-display">
                <span className="price-label">Starting from</span>
                <span className="price-amount">&#8358;180,000 / Night</span>
              </div>
              <Link to="/room-detail" className="btn btn-dark btn-sm">Book Now</Link>
            </div>
          </article>

          <article className="room-card">
            <div className="room-image">
              <img src="/images/9bd67c4d-7ea5-40d0-a5d6-cc3249dcdf8e.webp" alt="Executive Suite" decoding="async" loading="lazy" />
            </div>
            <div className="room-content">
              <h3>Executive Suite</h3>
              <p>An elite residence featuring a fully equipped lounge, deep soak bathtub, and bespoke butler service.</p>
            </div>
            <div className="room-footer">
              <div className="price-display">
                <span className="price-label">Starting from</span>
                <span className="price-amount">&#8358;250,000 / Night</span>
              </div>
              <Link to="/room-detail" className="btn btn-dark btn-sm">Book Now</Link>
            </div>
          </article>
        </div>
      </section>

      {/* HIGHLIGHTS BENTO */}
      <section className="highlights-bento">
        <div className="bento-strip">
          <div className="bento-image">
            <img src="/images/1d40ef05-9b2e-49d4-bd4a-fec70557f8a4.webp" alt="Restaurant interior" decoding="async" loading="lazy" />
          </div>
          <div className="bento-text bento-text-light">
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              <span>Culinary Sophistication</span>
            </div>
            <h2 className="section-title-sm">The Tasting Room &amp; Lounge</h2>
            <p className="body-text">
              Embark on a sensational journey where native West African spices meet contemporary European gourmet. Hand-pressed organic materials, soft ambient jazz, and our award-winning wine cellar await you.
            </p>
            <Link to="/restaurant" className="btn btn-dark">Explore Dining</Link>
          </div>
        </div>

        <div className="bento-strip reverse">
          <div className="bento-text bento-text-dark">
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              <span>Distinctive Meetings</span>
            </div>
            <h2 className="section-title-sm light">State-of-the-Art Venues</h2>
            <p className="body-text light">
              Host high-caliber corporate summits, elegant cocktail parties, or multi-day executive workshops in highly secure, fully integrated conference suites engineered with ultra-modern acoustic design.
            </p>
            <Link to="/events" className="btn btn-gold">Plan An Event</Link>
          </div>
          <div className="bento-image">
            <img src="/images/1ce8659d-1c33-4b32-bef5-3aadaa4e6246.webp" alt="Conference venue" decoding="async" loading="lazy" />
          </div>
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="reservation-cta">
        <div className="reservation-panel">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Direct Booking Benefits</span>
          </div>
          <h2 className="section-title center">Reserve directly with us for exclusive benefits</h2>
          <p className="body-text center narrow">
            Secure the best available rates, complimentary high-speed airport transfers, flexible early check-ins, and a custom welcome cocktail upon arrival.
          </p>
          <Link to="/reservation" className="btn btn-gold">Secure My Room</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-header-center">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Guest Impressions</span>
          </div>
          <h2 className="section-title center">Stories of Exceptional Stays</h2>
        </div>

        <div className="reviews-row">
          <blockquote className="review-card">
            <span className="quote-mark">&ldquo;</span>
            <p>AA Entertainment represents the zenith of premium hospitality in Abeokuta. The attention to cultural heritage wrapped in modern sophistication is unmatched. An incredibly secure and refreshing business haven.</p>
            <cite>Tunde O. &mdash; Executive Director</cite>
          </blockquote>
          <blockquote className="review-card">
            <span className="quote-mark">&ldquo;</span>
            <p>The culinary experience at the Tasting Room was truly magical, and our suite was an immaculate, silent oasis in the heart of historic Abeokuta. Absolutely beautiful service, always anticipating our needs.</p>
            <cite>Sarah M. &mdash; London, UK</cite>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
