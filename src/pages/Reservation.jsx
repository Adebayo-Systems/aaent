import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DateRangePickerPopover from '../components/DateRangePickerPopover';
import { useData } from '../context/DataContext';

const ROOM_RATES = {
  'Standard Room': 120000,
  'Deluxe Room': 150000,
  'Deluxe Suite': 180000,
  'Executive Suite': 250000,
  'Presidential Suite': 450000,
};

const addDays = (d, n) => {
  const res = new Date(d);
  res.setDate(res.getDate() + n);
  return res;
};

const getMinCheckInDate = () => addDays(new Date(), 3);

const formatReadable = (d) => {
  if (!d) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function Reservation() {
  const { addBooking } = useData();
  const [searchParams] = useSearchParams();
  const roomParam = searchParams.get('room');
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const guestsParam = searchParams.get('guests');

  const getInitialRoom = () => {
    if (roomParam === 'standard-room') return 'Standard Room';
    if (roomParam === 'deluxe-room') return 'Deluxe Room';
    if (roomParam === 'deluxe-suite') return 'Deluxe Suite';
    if (roomParam === 'executive-suite') return 'Executive Suite';
    if (roomParam === 'presidential-suite') return 'Presidential Suite';
    return 'Deluxe Suite';
  };

  const minCheckIn = getMinCheckInDate();

  const getInitialCheckIn = () => {
    if (checkInParam) {
      const parsed = new Date(checkInParam);
      if (!isNaN(parsed.getTime()) && parsed >= minCheckIn) {
        return parsed;
      }
    }
    return minCheckIn;
  };

  const getInitialCheckOut = () => {
    if (checkOutParam) {
      const parsed = new Date(checkOutParam);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    return addDays(minCheckIn, 2);
  };

  const initialCheckIn = getInitialCheckIn();
  const initialCheckOut = getInitialCheckOut();

  const [checkInDate, setCheckInDate] = useState(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    roomPreference: getInitialRoom(),
    guests: guestsParam || '2 Guests',
    airportTransfer: false,
    spaPackage: false,
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Calculate nights and estimated total
  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return null;
    const diffTime = checkOutDate - checkInDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return null;

    const basePrice = (ROOM_RATES[form.roomPreference] || 150000) * diffDays;
    const transferPrice = form.airportTransfer ? 35000 : 0;
    const spaPrice = form.spaPackage ? 45000 : 0;

    return { nights: diffDays, total: basePrice + transferPrice + spaPrice };
  };

  const calcResult = calculateTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      alert('Please select both Check-In and Check-Out dates.');
      return;
    }

    const totalVal = calcResult ? `₦${calcResult.total.toLocaleString()}` : 'Custom Quote';
    const numericVal = calcResult ? calcResult.total : 0;

    addBooking({
      guestName: form.fullName,
      email: form.email,
      phone: form.phone,
      type: 'room',
      itemTitle: form.roomPreference,
      date: `${formatReadable(checkInDate)} to ${formatReadable(checkOutDate)}`,
      guests: `${form.guests} Guest(s)`,
      totalAmount: totalVal,
      numericAmount: numericVal,
      specialRequests: form.specialRequests || 'No special requests',
    });

    setSubmitted(true);
  };

  return (
    <main>
      {/* RESERVATION HERO */}
      <section className="hero hero-sm" style={{ backgroundImage: "url('/images/b097abef-9cb0-4dbf-ae15-e575f1d11012.webp')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line"></span>
            <span>Impeccable Stays</span>
          </div>
          <h1 className="hero-title hero-title-sm">Reserve Your Stay</h1>
          <p className="hero-body">
            Secure Abeokuta&rsquo;s finest architectural escape. Stays must be reserved at least 3 days in advance to ensure our private concierge desk customizes every detail.
          </p>
        </div>
      </section>

      {/* RESERVATION SPLIT PANEL */}
      <section className="reservation-split-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', padding: '60px var(--container-px)' }}>
        <div className="form-container">
          <div className="form-header">
            <h2 className="section-title-sm">Booking Request Form</h2>
            <p className="body-text">Select your dates on the compact dropdown calendar below and populate your journey details.</p>
          </div>

          {submitted ? (
            <div style={{ background: '#d4edda', color: '#155724', padding: '32px', borderRadius: '4px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px' }}>Reservation Requested!</h3>
              <p style={{ margin: '16px 0' }}>
                Thank you, <strong>{form.fullName}</strong>. Your reservation request for the <strong>{form.roomPreference}</strong> ({formatReadable(checkInDate)} &rarr; {formatReadable(checkOutDate)}) has been received.
              </p>
              <p>Our concierge desk will contact <strong>{form.email}</strong> and <strong>{form.phone}</strong> within 24 hours to confirm your booking.</p>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => setSubmitted(false)}
                style={{ marginTop: '24px' }}
              >
                Submit Another Reservation
              </button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
              <div className="input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="field-wrap">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    placeholder="e.g. Alaba Kolade"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    style={{ width: '100%', padding: '14px', border: '1px solid var(--color-border)', borderRadius: '2px' }}
                  />
                </div>
                <div className="field-wrap">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="e.g. alaba@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ width: '100%', padding: '14px', border: '1px solid var(--color-border)', borderRadius: '2px' }}
                  />
                </div>
              </div>

              <div className="input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="field-wrap">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="e.g. +234 803 123 4567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{ width: '100%', padding: '14px', border: '1px solid var(--color-border)', borderRadius: '2px' }}
                  />
                </div>
                <div className="field-wrap">
                  <label htmlFor="roomPreference">Room Preference</label>
                  <select
                    id="roomPreference"
                    required
                    value={form.roomPreference}
                    onChange={(e) => setForm({ ...form, roomPreference: e.target.value })}
                    style={{ width: '100%', padding: '14px', border: '1px solid var(--color-border)', borderRadius: '2px' }}
                  >
                    <option value="Standard Room">Standard Room (₦120,000 / Night)</option>
                    <option value="Deluxe Room">Deluxe Room (₦150,000 / Night)</option>
                    <option value="Deluxe Suite">Deluxe Suite (₦180,000 / Night)</option>
                    <option value="Executive Suite">Executive Suite (₦250,000 / Night)</option>
                    <option value="Presidential Suite">Presidential Suite (₦450,000 / Night)</option>
                  </select>
                </div>
              </div>

              {/* COMPACT POPOVER DATE RANGE CALENDAR */}
              <div className="field-wrap">
                <label>Select Stay Dates (Check-In &amp; Check-Out)</label>
                <DateRangePickerPopover
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  onSelectRange={(start, end) => {
                    setCheckInDate(start);
                    setCheckOutDate(end);
                  }}
                />
              </div>

              <div className="field-wrap">
                <label htmlFor="guests">Number of Guests</label>
                <select
                  id="guests"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  style={{ width: '100%', padding: '14px', border: '1px solid var(--color-border)', borderRadius: '2px' }}
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4+ Guests">4+ Guests</option>
                </select>
              </div>

              {/* Add-ons */}
              <div style={{ padding: '16px', background: 'var(--color-bg-alt)', borderRadius: '4px' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '12px' }}>Bespoke Enhancements</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.airportTransfer}
                      onChange={(e) => setForm({ ...form, airportTransfer: e.target.checked })}
                    />
                    <span>Complimentary Private Airport Shuttle (₦35,000)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.spaPackage}
                      onChange={(e) => setForm({ ...form, spaPackage: e.target.checked })}
                    />
                    <span>Welcome Spa &amp; Hydrotherapy Pass (₦45,000)</span>
                  </label>
                </div>
              </div>

              <div className="field-wrap">
                <label htmlFor="specialRequests">Special Requests &amp; Preferences</label>
                <textarea
                  rows="4"
                  id="specialRequests"
                  placeholder="Dietary specifications, specific pillows, security requests..."
                  value={form.specialRequests}
                  onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                  style={{ width: '100%', padding: '14px', border: '1px solid var(--color-border)', borderRadius: '2px', fontFamily: 'var(--font-sans)' }}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-gold btn-full">
                Submit Reservation Request
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Summary */}
        <aside style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', marginBottom: '16px' }}>Stay Summary</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text)' }}>Selected Suite:</span>
              <span style={{ fontWeight: 600 }}>{form.roomPreference}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text)' }}>Rate per Night:</span>
              <span>₦{(ROOM_RATES[form.roomPreference] || 150000).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text)' }}>Guests:</span>
              <span>{form.guests}</span>
            </div>

            {calcResult && calcResult.nights > 0 && (
              <>
                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '8px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text)' }}>Duration:</span>
                  <span>{calcResult.nights} Night(s)</span>
                </div>
                {form.airportTransfer && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text)' }}>Airport Shuttle:</span>
                    <span>₦35,000</span>
                  </div>
                )}
                {form.spaPackage && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text)' }}>Spa Pass:</span>
                    <span>₦45,000</span>
                  </div>
                )}
                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '8px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700, color: 'var(--color-gold)' }}>
                  <span>Estimated Total:</span>
                  <span>₦{calcResult.total.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}
