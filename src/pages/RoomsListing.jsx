import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, Check, ChevronDown } from 'lucide-react';
import { useData } from '../context/DataContext';

const FILTER_OPTIONS = [
  { key: 'all', label: 'All Rooms & Suites' },
  { key: 'standard', label: 'Standard Rooms' },
  { key: 'deluxe', label: 'Deluxe Suites' },
  { key: 'executive', label: 'Executive Suites' },
  { key: 'presidential', label: 'Presidential Suites' },
];

export default function RoomsListing() {
  const { rooms } = useData();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // Close filter popover on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredRooms = activeFilter === 'all'
    ? rooms
    : rooms.filter((room) => room.category === activeFilter);

  const currentOption = FILTER_OPTIONS.find((opt) => opt.key === activeFilter);
  const currentFilterLabel = currentOption ? currentOption.label : 'All Rooms & Suites';

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

        {/* Filter Popup Trigger */}
        <div className="rooms-filter-container" ref={filterRef}>
          <button
            type="button"
            className={`rooms-filter-trigger ${isFilterOpen ? 'open' : ''}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-expanded={isFilterOpen}
            aria-label="Filter accommodations"
          >
            <SlidersHorizontal size={15} />
            <span>{currentFilterLabel}</span>
            <span className="filter-badge">{filteredRooms.length}</span>
            <ChevronDown size={14} style={{ transform: isFilterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
          </button>

          {isFilterOpen && (
            <div className="rooms-filter-popover" role="menu">
              {FILTER_OPTIONS.map((opt) => {
                const count = opt.key === 'all'
                  ? rooms.length
                  : rooms.filter((r) => r.category === opt.key).length;
                const isActive = activeFilter === opt.key;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    className={`filter-option-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveFilter(opt.key);
                      setIsFilterOpen(false);
                    }}
                  >
                    <span>{opt.label}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: isActive ? 'var(--color-gold)' : 'var(--color-text-light)' }}>
                      <span>({count})</span>
                      {isActive && <Check size={14} />}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
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
          {filteredRooms.map((room) => {
            const specs = room.features && room.features.length > 0
              ? room.features.slice(0, 3).join(' • ')
              : null;

            return (
              <article key={room.id} className="room-card">
                <Link to={`/room-detail?room=${room.id}`} className="room-image" style={{ display: 'block' }}>
                  <img src={room.image} alt={room.name} decoding="async" loading="lazy" />
                  {room.category && (
                    <span className="room-badge">{room.category}</span>
                  )}
                </Link>
                <div className="room-content">
                  <h3>
                    <Link to={`/room-detail?room=${room.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {room.name}
                    </Link>
                  </h3>
                  {specs && (
                    <div className="room-specs-meta">
                      <span>{specs}</span>
                    </div>
                  )}
                  <p>{room.description}</p>
                </div>
                <div className="room-footer">
                  <div className="price-display">
                    <span className="price-label">Starting from</span>
                    <span className="price-amount">{room.price}</span>
                  </div>
                  <div className="room-footer-actions">
                    <Link to={`/room-detail?room=${room.id}`} className="btn btn-outline-dark btn-sm">
                      View Details
                    </Link>
                    <Link to={`/reservation?room=${room.id}`} className="btn btn-dark btn-sm">
                      Book Now
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
