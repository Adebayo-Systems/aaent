import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import DateRangePickerPopover from '../components/DateRangePickerPopover';

const ROOM_DETAILS_DATA = {
  'standard-room': {
    id: 'standard-room',
    name: 'Standard Room',
    category: 'Standard',
    rateNum: 120000,
    rate: '₦120,000',
    size: '40 m²',
    view: 'Courtyard View',
    guests: 'Max 2 Adults',
    mainImage: '/images/7a0c92f4-46a4-40fa-87fb-391c3608dd8b.webp',
    subImage1: '/images/73e7ae62-091a-41f2-b125-9f842893bb0b.webp',
    subImage2: '/images/d94f262d-4e18-47f7-b28b-068d1d37a335.webp',
    description: 'Timeless classic style featuring premium work desk, high-speed fiber internet, and luxury en-suite shower. Exquisitely planned to bridge executive convenience and coastal leisure in Abeokuta.',
    amenities: [
      'Queen Bed', 'Dual Air Conditioning', 'Gigabit Fiber WiFi', 'Smart Flat Screen TV',
      'Minibar & Refreshments', 'En-suite Rain Shower', '24-Hour Room Service', 'Executive Desk'
    ]
  },
  'deluxe-room': {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    category: 'Deluxe',
    rateNum: 150000,
    rate: '₦150,000',
    size: '50 m²',
    view: 'Olumo Rock & Skyline View',
    guests: 'Max 2 Adults, 1 Child',
    mainImage: '/images/b30ec291-8184-4c99-a874-5ffe951734e0.webp',
    subImage1: '/images/6c9fca76-5902-4e7d-84a3-6f041a27b324.webp',
    subImage2: '/images/d94f262d-4e18-47f7-b28b-068d1d37a335.webp',
    description: 'Enriched with beautiful indigenous art, soft ambient lighting system, and partial views of Olumo Rock and the Abeokuta hills.',
    amenities: [
      'Plush King Bed', 'Dual Air Conditioning', 'Gigabit Fiber WiFi', 'Smart Flat Screen TV',
      'Espresso Machine', 'En-suite Rain Shower', '24-Hour Room Service', 'Balcony View Desk'
    ]
  },
  'deluxe-suite': {
    id: 'deluxe-suite',
    name: 'Deluxe Suite',
    category: 'Deluxe',
    rateNum: 180000,
    rate: '₦180,000',
    size: '65 m²',
    view: 'City & Courtyard View',
    guests: 'Max 2 Adults, 1 Child',
    mainImage: '/images/aad4e816-681e-4e2d-8633-a0430f0014e1.webp',
    subImage1: '/images/4a6a581b-6b13-4a10-97c4-e880253697d3.webp',
    subImage2: '/images/d94f262d-4e18-47f7-b28b-068d1d37a335.webp',
    description: 'Step into the magnificent Deluxe Suite. Exquisitely planned to bridge executive convenience and coastal leisure, this suite offers a distinct separation between your private workspace, plush living parlor, and master sleeping quarters. Art-directed with original West African sculptures and warm textiles, it evokes absolute restfulness.',
    amenities: [
      'Royal King Bed', 'Dual Air Conditioning', 'Gigabit Fiber WiFi', 'Smart Flat Screen TV',
      'Premium Espresso Bar', 'En-suite Rain Shower', '24-Hour Room Service', 'Dedicated Executive Desk'
    ]
  },
  'executive-suite': {
    id: 'executive-suite',
    name: 'Executive Suite',
    category: 'Executive',
    rateNum: 250000,
    rate: '₦250,000',
    size: '85 m²',
    view: 'Panoramic City & River View',
    guests: 'Max 3 Guests',
    mainImage: '/images/2db52a31-4e6d-4812-8f33-0a45ca06be62.webp',
    subImage1: '/images/9bd67c4d-7ea5-40d0-a5d6-cc3249dcdf8e.webp',
    subImage2: '/images/d94f262d-4e18-47f7-b28b-068d1d37a335.webp',
    description: 'The premier corporate sanctuary featuring a separate boardroom table, standalone soaking bathtub, custom private dinner setup capability, and dedicated butler service.',
    amenities: [
      'Master King Bed', 'Climate Control Zone', 'Gigabit Fiber WiFi', 'Dual 4K TVs',
      'Private Bar & Cellar', 'Deep Soaking Bathtub', '24/7 Butler Concierge', 'Meeting Table Setup'
    ]
  },
  'presidential-suite': {
    id: 'presidential-suite',
    name: 'Presidential Suite',
    category: 'Presidential',
    rateNum: 450000,
    rate: '₦450,000',
    size: '150 m²',
    view: 'Penthouse Lagoon & Rock View',
    guests: 'Max 4 Guests',
    mainImage: '/images/35e11206-ee59-4d2c-8e13-b5810c0b4588.webp',
    subImage1: '/images/aad4e816-681e-4e2d-8633-a0430f0014e1.webp',
    subImage2: '/images/d94f262d-4e18-47f7-b28b-068d1d37a335.webp',
    description: 'Our ultimate residence. Dual lounges, private terrace with lagoon views, private chef dining options, biometric security access control, and master luxury spa bathroom.',
    amenities: [
      'Super King Canopy Bed', 'Biometric Security Access', 'Gigabit Fiber WiFi', 'Private Terrace Jacuzzi',
      'Personal Chef Kitchen', 'Soaking Bath & Sauna', '24/7 Dedicated Butler', 'Private Dining Lounge'
    ]
  }
};

const addDays = (d, n) => {
  const res = new Date(d);
  res.setDate(res.getDate() + n);
  return res;
};

const formatDateYMD = (d) => {
  if (!d) return '';
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const dy = String(d.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${dy}`;
};

export default function RoomDetail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomParam = searchParams.get('room');
  const roomData = ROOM_DETAILS_DATA[roomParam] || ROOM_DETAILS_DATA['deluxe-suite'];

  // Min check-in = Today + 3 Days
  const minCheckInDate = addDays(new Date(), 3);
  const minCheckOutDate = addDays(minCheckInDate, 2);

  const [checkInDate, setCheckInDate] = useState(minCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(minCheckOutDate);
  const [guestCount, setGuestCount] = useState('2 Guests');

  // Compute nights & total
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * roomData.rateNum;

  const handleReserveClick = () => {
    const checkInStr = formatDateYMD(checkInDate);
    const checkOutStr = formatDateYMD(checkOutDate);
    navigate(`/reservation?room=${roomData.id}&checkIn=${checkInStr}&checkOut=${checkOutStr}&guests=${encodeURIComponent(guestCount)}`);
  };

  return (
    <main>
      {/* GALLERY HERO */}
      <section className="detail-gallery">
        <div className="detail-main-image">
          <img src={roomData.mainImage} alt={`${roomData.name} main view`} decoding="async" loading="eager" />
        </div>
        <div className="detail-side-stack">
          <div className="detail-sub-image">
            <img src={roomData.subImage1} alt={`${roomData.name} detail view`} decoding="async" loading="lazy" />
          </div>
          <div className="detail-sub-image">
            <img src={roomData.subImage2} alt={`${roomData.name} bathroom view`} decoding="async" loading="lazy" />
          </div>
        </div>
      </section>

      {/* DETAIL LAYOUT */}
      <section className="detail-layout">
        <div className="info-column">
          <div className="title-rate">
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              <span>The Premium Selection</span>
            </div>
            <h1 className="detail-title">{roomData.name}</h1>
            <div className="detail-specs">
              <span>{roomData.size}</span>
              <span className="dot">&bull;</span>
              <span>{roomData.view}</span>
              <span className="dot">&bull;</span>
              <span>{roomData.guests}</span>
            </div>
          </div>
          <p className="body-text">{roomData.description}</p>

          <div className="amenities-block">
            <h3>Suite Indulgences</h3>
            <div className="amenities-detail-grid">
              {roomData.amenities.map((item, idx) => (
                <div key={idx} className="am-item">
                  <span className="icon-wrap">
                    <img src="/images/de767234-820b-4c69-96eb-3b78ab3b3d8f.svg" alt="" decoding="async" loading="lazy" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPACT POPOVER RESERVATION WIDGET */}
        <aside className="booking-card">
          <div className="pricing">
            <p className="pricing-label">Nightly Rate</p>
            <p className="pricing-amount">{roomData.rate}</p>
            <p className="pricing-note">Inclusive of service tax &amp; high-speed transfers</p>
          </div>
          
          <hr className="booking-divider" />
          
          <div className="booking-details" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="field">
              <label>Select Check-In &amp; Check-Out Dates</label>
              <DateRangePickerPopover
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                onSelectRange={(start, end) => {
                  setCheckInDate(start);
                  setCheckOutDate(end);
                }}
              />
            </div>

            <div className="field">
              <label htmlFor="guestSelect">Total Guests</label>
              <select
                id="guestSelect"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-sans)' }}
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4 Guests">4 Guests</option>
              </select>
            </div>

            {nights > 0 && (
              <div style={{ padding: '12px', background: 'var(--color-bg-alt)', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Total ({nights} Night{nights > 1 ? 's' : ''}):</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-gold)' }}>₦{totalPrice.toLocaleString()}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="btn btn-dark btn-full"
            onClick={handleReserveClick}
            style={{ marginTop: '16px' }}
          >
            Reserve {roomData.name}
          </button>
        </aside>
      </section>

      {/* ALTERNATIVES */}
      <section className="alternatives-section">
        <h2 className="section-title-sm center">Other Rooms You May Like</h2>
        <div className="rooms-row">
          {Object.values(ROOM_DETAILS_DATA)
            .filter((r) => r.id !== roomData.id)
            .slice(0, 2)
            .map((r) => (
              <article key={r.id} className="room-card">
                <Link to={`/room-detail?room=${r.id}`} className="room-image" style={{ display: 'block' }}>
                  <img src={r.mainImage} alt={r.name} decoding="async" loading="lazy" />
                </Link>
                <div className="room-content">
                  <h3>
                    <Link to={`/room-detail?room=${r.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {r.name}
                    </Link>
                  </h3>
                  <p>{r.description.slice(0, 100)}...</p>
                </div>
                <div className="room-footer">
                  <div className="price-display">
                    <span className="price-label">Starting from</span>
                    <span className="price-amount">{r.rate} / Night</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/room-detail?room=${r.id}`} className="btn btn-outline-dark btn-sm">
                      View Room
                    </Link>
                    <Link to={`/reservation?room=${r.id}`} className="btn btn-dark btn-sm">
                      Book Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>
    </main>
  );
}
