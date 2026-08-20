import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function RoomsListing() {
  const { rooms } = useData();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRooms = activeFilter === 'all'
    ? rooms
    : rooms.filter((room) => room.category === activeFilter);

  return (
    <main>
      {/* LISTING HEADER */}
      <section className="listing-header">
        <div className="eyebrow">
          <span className="eyebrow-line"></span>
          <span>Accommodations</span>
        </div>
        <h1 className="section-title listing-title">Our Rooms &amp; Suites</h1>
        <p className="body-text listing-subtitle">
          Every room is crafted to serve as a deep sensory retreat. Experience soft lighting, natural textiles, and absolute silence right in Abeokuta.
        </p>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start', flexWrap: 'wrap', marginTop: '24px' }}>
          {['all', 'standard', 'deluxe', 'executive', 'presidential'].map((filterKey) => (
            <button
              key={filterKey}
              type="button"
              className={`btn btn-sm ${activeFilter === filterKey ? 'btn-gold' : 'btn-outline-dark'}`}
              onClick={() => setActiveFilter(filterKey)}
              style={{ textTransform: 'capitalize' }}
            >
              {filterKey === 'all' ? 'All Rooms & Suites' : `${filterKey} Suites`}
            </button>
          ))}
        </div>
      </section>

      {/* AMENITIES STRIP */}
      <div className="amenities-strip">
        <div className="amenity">
          <img src="/images/79064587-40fe-4af3-bd18-436ccb435708.svg" alt="" className="icon" decoding="async" loading="eager" />
          <span>Ultra Fiber WiFi</span>
        </div>
        <div className="amenity">
          <img src="/images/939168cf-bf01-4193-b23a-04a750748cd8.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Central AC</span>
        </div>
        <div className="amenity">
          <img src="/images/c55306d6-2ca8-40b0-a491-b802bab4286e.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>24/7 Room Service</span>
        </div>
        <div className="amenity">
          <img src="/images/6681ae90-ad67-4c06-9659-c6fd2f4d58ac.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Valet Parking</span>
        </div>
        <div className="amenity">
          <img src="/images/399d2fb4-76c9-45f6-a95c-9610391c3f53.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Elite Security</span>
        </div>
        <div className="amenity">
          <img src="/images/df6cdaf8-4774-474e-bae4-cbac737d8e2e.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Luxury Laundry</span>
        </div>
      </div>

      {/* ROOMS GRID */}
      <section className="rooms-grid-container">
        <div className="rooms-row">
          {filteredRooms.map((room) => (
            <article key={room.id} className={`room-card ${room.isWide ? 'room-card-wide' : ''}`}>
              <Link to={`/room-detail?room=${room.id}`} className="room-image" style={{ display: 'block' }}>
                <img src={room.image} alt={room.name} decoding="async" loading="lazy" />
              </Link>
              <div className="room-content">
                <h3>
                  <Link to={`/room-detail?room=${room.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {room.name}
                  </Link>
                </h3>
                <p>{room.description}</p>
              </div>
              <div className="room-footer" style={{ gap: '12px', flexWrap: 'wrap' }}>
                <div className="price-display" style={{ marginRight: 'auto' }}>
                  <span className="price-label">Starting from</span>
                  <span className="price-amount">{room.price}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link to={`/room-detail?room=${room.id}`} className="btn btn-outline-dark btn-sm">
                    View Details
                  </Link>
                  <Link to={`/reservation?room=${room.id}`} className="btn btn-dark btn-sm">
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
