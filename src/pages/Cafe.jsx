import React from 'react';
import { Link } from 'react-router-dom';

export default function Cafe() {
  return (
    <main>
      {/* CAFE HERO */}
      <section className="hero hero-lg" style={{ backgroundImage: "url('/images/5498a0f4-d8ee-4951-9a4e-a17d7b1a837b.webp')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line"></span>
            <span>The Lounge Café</span>
          </div>
          <h1 className="hero-title">Slow Mornings, Good Coffee</h1>
          <p className="hero-body">
            A relaxed all-day café serving specialty coffee, fresh pastries, and light bites &mdash; open to guests and walk-ins alike.
          </p>
        </div>
      </section>

      {/* INTRO SPLIT */}
      <section className="hours-split">
        <div className="welcome-text">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Locally Roasted</span>
          </div>
          <h2 className="section-title">Coffee, Done Properly</h2>
          <p className="body-text">
            We source single-origin beans from small Nigerian growers and roast them in small batches for depth and character. Pull up a seat by the courtyard windows, get some work done, or just watch Kuto go by over a slow pour-over.
          </p>
          <Link to="/contact" className="link-row">Inquire About Private Catering &rarr;</Link>
        </div>
        <div className="hours-card">
          <h3>Café Hours</h3>
          <div className="hours-rows">
            <div className="slot-row"><span>Monday &ndash; Friday</span><span>6:30 AM &mdash; 8:00 PM</span></div>
            <div className="slot-row"><span>Saturday &ndash; Sunday</span><span>7:00 AM &mdash; 9:00 PM</span></div>
            <div className="slot-row"><span>Kitchen Closes</span><span>30 Min Before Close</span></div>
            <div className="slot-row"><span>WiFi</span><span>Complimentary, All-Day</span></div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="featured-dishes">
        <div className="section-header-center">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>House Favorites</span>
          </div>
          <h2 className="section-title center">From the Café Counter</h2>
        </div>
        <div className="dishes-grid">
          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/ce3cd6b4-2af1-4d27-beb6-050cff8e580a.webp" alt="Signature Pour-Over" decoding="async" loading="eager" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Signature Pour-Over</h4>
                <span className="dish-price">&#8358;4,500</span>
              </div>
              <p className="dish-category">Coffee</p>
              <p className="dish-desc">Single-origin Nigerian beans, brewed fresh to order by our in-house barista.</p>
            </div>
          </article>

          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/81b7bd52-e085-4877-8db4-ca3d693eb108.webp" alt="Cardamom Cortado" decoding="async" loading="lazy" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Cardamom Cortado</h4>
                <span className="dish-price">&#8358;5,000</span>
              </div>
              <p className="dish-category">Coffee</p>
              <p className="dish-desc">Double espresso balanced with warm steamed milk and a whisper of cardamom.</p>
            </div>
          </article>

          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/65abb5d1-5927-4f41-836c-6075850bfe38.webp" alt="Zobo Iced Tea" decoding="async" loading="lazy" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Zobo Iced Tea</h4>
                <span className="dish-price">&#8358;3,800</span>
              </div>
              <p className="dish-category">Cold Drinks</p>
              <p className="dish-desc">House-made hibiscus iced tea, lightly spiced with ginger and citrus.</p>
            </div>
          </article>

          <article className="dish-card">
            <div className="dish-img">
              <img src="/images/f1cab3bd-d0fd-4296-9ffa-2d640567c708.webp" alt="Almond Croissant" decoding="async" loading="lazy" />
            </div>
            <div className="dish-content">
              <div className="dish-title-price">
                <h4>Almond Croissant</h4>
                <span className="dish-price">&#8358;4,200</span>
              </div>
              <p className="dish-category">Pastries</p>
              <p className="dish-desc">Baked fresh each morning, filled with almond cream and toasted flaked almonds.</p>
            </div>
          </article>
        </div>
      </section>

      {/* AMENITIES STRIP */}
      <div className="amenities-strip">
        <div className="amenity">
          <img src="/images/79064587-40fe-4af3-bd18-436ccb435708.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Free High-Speed WiFi</span>
        </div>
        <div className="amenity">
          <img src="/images/939168cf-bf01-4193-b23a-04a750748cd8.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Courtyard Seating</span>
        </div>
        <div className="amenity">
          <img src="/images/c55306d6-2ca8-40b0-a491-b802bab4286e.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Grab &amp; Go Available</span>
        </div>
        <div className="amenity">
          <img src="/images/6681ae90-ad67-4c06-9659-c6fd2f4d58ac.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Meeting-Friendly Tables</span>
        </div>
        <div className="amenity">
          <img src="/images/df6cdaf8-4774-474e-bae4-cbac737d8e2e.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Vegan Options</span>
        </div>
      </div>
    </main>
  );
}
