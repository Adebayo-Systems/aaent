import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PaystackPop from '@paystack/inline-js';
import { CheckCircle2, ShieldCheck, CreditCard, Lock, Calendar, User, Mail, Phone, Printer } from 'lucide-react';
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

// Fallback Paystack test public key (replace with your live/test key in .env)
const PAYSTACK_KEY =
  import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_5617bfddcf64bcfa728c68702b8813cf58bb0e51';

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

  const [paymentOption, setPaymentOption] = useState('online'); // 'online' | 'deposit' | 'hotel'
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Calculate nights and estimated total
  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return null;
    const diffTime = checkOutDate - checkInDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return null;

    const basePrice = (ROOM_RATES[form.roomPreference] || 150000) * diffDays;
    const transferPrice = form.airportTransfer ? 35000 : 0;
    const spaPrice = form.spaPackage ? 45000 : 0;
    const grandTotal = basePrice + transferPrice + spaPrice;

    return {
      nights: diffDays,
      total: grandTotal,
      depositAmount: Math.round(grandTotal * 0.5),
    };
  };

  const calcResult = calculateTotal();

  const handlePaystackPayment = (chargeAmountNaira, isDeposit) => {
    setIsProcessing(true);

    try {
      const paystack = new PaystackPop();
      const amountInKobo = Math.round(chargeAmountNaira * 100);
      const generatedRef = `AA-RES-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

      paystack.newTransaction({
        key: PAYSTACK_KEY,
        email: form.email,
        amount: amountInKobo,
        currency: 'NGN',
        reference: generatedRef,
        metadata: {
          custom_fields: [
            { display_name: 'Guest Name', variable_name: 'guest_name', value: form.fullName },
            { display_name: 'Phone Number', variable_name: 'phone', value: form.phone },
            { display_name: 'Suite Reserved', variable_name: 'suite', value: form.roomPreference },
            {
              display_name: 'Stay Dates',
              variable_name: 'dates',
              value: `${formatReadable(checkInDate)} to ${formatReadable(checkOutDate)}`,
            },
            {
              display_name: 'Payment Category',
              variable_name: 'payment_category',
              value: isDeposit ? '50% Reservation Deposit' : 'Full Payment',
            },
          ],
        },
        onSuccess: (transaction) => {
          const totalVal = calcResult ? `₦${calcResult.total.toLocaleString()}` : 'Custom Quote';
          const numericVal = calcResult ? calcResult.total : 0;
          const refCode = transaction.reference || transaction.trxref || generatedRef;

          const created = addBooking({
            guestName: form.fullName,
            email: form.email,
            phone: form.phone,
            type: 'room',
            itemTitle: form.roomPreference,
            date: `${formatReadable(checkInDate)} to ${formatReadable(checkOutDate)}`,
            guests: `${form.guests} Guest(s)`,
            totalAmount: totalVal,
            numericAmount: numericVal,
            amountPaid: chargeAmountNaira,
            paymentStatus: isDeposit ? 'Partial Deposit Paid' : 'Paid',
            status: 'Confirmed',
            transactionRef: refCode,
            specialRequests: form.specialRequests || 'No special requests',
            paidAt: new Date().toISOString(),
          });

          setConfirmedBooking({
            ...created,
            transactionRef: refCode,
            paidAmount: chargeAmountNaira,
            isDeposit,
          });
          setIsProcessing(false);
        },
        onCancel: () => {
          setIsProcessing(false);
        },
      });
    } catch (err) {
      console.error('Paystack initialization error:', err);
      setIsProcessing(false);
      alert('Unable to initialize payment window. Please check your internet connection or try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      alert('Please select both Check-In and Check-Out dates.');
      return;
    }

    if (!calcResult || calcResult.total <= 0) {
      alert('Invalid booking dates. Please select at least 1 night.');
      return;
    }

    // Direct Inquiry Option (Pay at Hotel)
    if (paymentOption === 'hotel') {
      const totalVal = `₦${calcResult.total.toLocaleString()}`;
      const created = addBooking({
        guestName: form.fullName,
        email: form.email,
        phone: form.phone,
        type: 'room',
        itemTitle: form.roomPreference,
        date: `${formatReadable(checkInDate)} to ${formatReadable(checkOutDate)}`,
        guests: `${form.guests} Guest(s)`,
        totalAmount: totalVal,
        numericAmount: calcResult.total,
        amountPaid: 0,
        paymentStatus: 'Unpaid',
        status: 'Pending',
        transactionRef: 'PAY-AT-HOTEL',
        specialRequests: form.specialRequests || 'No special requests',
      });

      setConfirmedBooking(created);
      return;
    }

    // Paystack Online Payment Flow (Full or 50% Deposit)
    const isDeposit = paymentOption === 'deposit';
    const amountToCharge = isDeposit ? calcResult.depositAmount : calcResult.total;
    handlePaystackPayment(amountToCharge, isDeposit);
  };

  return (
    <main>
      {/* RESERVATION HERO */}
      <section
        className="hero hero-sm"
        style={{ backgroundImage: "url('/images/b097abef-9cb0-4dbf-ae15-e575f1d11012.webp')" }}
      >
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
      <section className="reservation-split-panel">
        <div className="form-container">
          <div className="form-header">
            <h2 className="section-title-sm">Booking Request Form</h2>
            <p className="body-text">
              Select your dates on the compact dropdown calendar below and choose your preferred payment option.
            </p>
          </div>

          {confirmedBooking ? (
            <div
              style={{
                background: '#ffffff',
                color: '#1a202c',
                padding: '36px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                    marginBottom: '16px',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', margin: '0 0 6px 0', color: 'var(--color-dark)' }}>
                  {confirmedBooking.paymentStatus === 'Paid' || confirmedBooking.paymentStatus === 'Partial Deposit Paid'
                    ? 'Payment Confirmed & Stay Secured!'
                    : 'Reservation Request Received!'}
                </h3>
                <p style={{ color: 'var(--color-text)', fontSize: '14.5px', margin: 0 }}>
                  Booking Dossier: <strong style={{ color: 'var(--color-gold)' }}>{confirmedBooking.id}</strong>
                </p>
              </div>

              {/* Verified Payment Badge */}
              {confirmedBooking.transactionRef && confirmedBooking.transactionRef !== 'PAY-AT-HOTEL' && (
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    padding: '14px 18px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                    fontSize: '13.5px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={20} color="#10b981" />
                    <div>
                      <strong style={{ color: '#065f46', display: 'block' }}>Verified Paystack Transaction</strong>
                      <span style={{ color: '#047857', fontSize: '12px' }}>Ref: {confirmedBooking.transactionRef}</span>
                    </div>
                  </div>
                  <span
                    style={{
                      background: '#10b981',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Paid ₦{confirmedBooking.amountPaid?.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Stay Summary Card */}
              <div
                style={{
                  background: 'var(--color-bg-alt)',
                  borderRadius: '6px',
                  padding: '20px',
                  marginBottom: '24px',
                  fontSize: '14px',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <span style={{ color: 'var(--color-text)', fontSize: '12px', display: 'block' }}>Guest Name</span>
                    <strong>{confirmedBooking.guestName}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text)', fontSize: '12px', display: 'block' }}>Suite Reserved</span>
                    <strong>{confirmedBooking.itemTitle}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text)', fontSize: '12px', display: 'block' }}>Stay Dates</span>
                    <strong>{confirmedBooking.date}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text)', fontSize: '12px', display: 'block' }}>Guests</span>
                    <strong>{confirmedBooking.guests}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text)', fontSize: '12px', display: 'block' }}>Total Reservation Value</span>
                    <strong style={{ color: 'var(--color-gold)' }}>{confirmedBooking.totalAmount}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text)', fontSize: '12px', display: 'block' }}>Payment Status</span>
                    <strong style={{ color: '#10b981' }}>{confirmedBooking.paymentStatus}</strong>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '13.5px', color: 'var(--color-text)', textAlign: 'center', margin: '0 0 24px 0' }}>
                A formal digital voucher has been dispatched to <strong>{confirmedBooking.email}</strong>. Our private concierge desk will contact you via WhatsApp/Call at <strong>{confirmedBooking.phone}</strong> for your pre-arrival itinerary.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => window.print()}
                  style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Printer size={16} /> Print Voucher
                </button>
                <button
                  type="button"
                  className="btn btn-gold"
                  onClick={() => {
                    setConfirmedBooking(null);
                    setForm({
                      fullName: '',
                      email: '',
                      phone: '',
                      roomPreference: 'Standard Room',
                      guests: '2 Guests',
                      airportTransfer: false,
                      spaPackage: false,
                      specialRequests: '',
                    });
                  }}
                  style={{ flex: 1 }}
                >
                  Reserve Another Suite
                </button>
              </div>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div className="input-row">
                <div className="field-wrap">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    placeholder="e.g. Alaba Kolade"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
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
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="field-wrap">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="e.g. +234 803 123 4567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="field-wrap">
                  <label htmlFor="roomPreference">Room Preference</label>
                  <select
                    id="roomPreference"
                    required
                    value={form.roomPreference}
                    onChange={(e) => setForm({ ...form, roomPreference: e.target.value })}
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
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4+ Guests">4+ Guests</option>
                </select>
              </div>

              {/* Add-ons */}
              <div
                style={{
                  padding: '16px 20px',
                  background: 'var(--color-bg-alt)',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <label
                  style={{
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '12px',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    color: 'var(--color-dark)',
                  }}
                >
                  Bespoke Enhancements
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px' }}>
                    <input
                      type="checkbox"
                      checked={form.airportTransfer}
                      onChange={(e) => setForm({ ...form, airportTransfer: e.target.checked })}
                    />
                    <span>Private Airport Shuttle (+₦35,000)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px' }}>
                    <input
                      type="checkbox"
                      checked={form.spaPackage}
                      onChange={(e) => setForm({ ...form, spaPackage: e.target.checked })}
                    />
                    <span>Welcome Spa &amp; Hydrotherapy Pass (+₦45,000)</span>
                  </label>
                </div>
              </div>

              {/* PAYMENT SELECTION */}
              <div
                style={{
                  padding: '18px 20px',
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <CreditCard size={18} color="var(--color-gold)" />
                  <label
                    style={{
                      fontWeight: 700,
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: 'var(--color-dark)',
                      margin: 0,
                    }}
                  >
                    Payment &amp; Confirmation Method
                  </label>
                </div>

                <div style={{ display: 'grid', gap: '10px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '6px',
                      background: paymentOption === 'online' ? '#ffffff' : 'transparent',
                      border: paymentOption === 'online' ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      value="online"
                      checked={paymentOption === 'online'}
                      onChange={() => setPaymentOption('online')}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <strong style={{ display: 'block', fontSize: '14px', color: 'var(--color-dark)' }}>
                        Instant Confirmation (Pay Full Amount via Paystack)
                      </strong>
                      <span style={{ fontSize: '12.5px', color: 'var(--color-text)' }}>
                        Card, Bank Transfer, USSD, Apple Pay. Suite is instantly reserved and verified.
                      </span>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '6px',
                      background: paymentOption === 'deposit' ? '#ffffff' : 'transparent',
                      border: paymentOption === 'deposit' ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      value="deposit"
                      checked={paymentOption === 'deposit'}
                      onChange={() => setPaymentOption('deposit')}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <strong style={{ display: 'block', fontSize: '14px', color: 'var(--color-dark)' }}>
                        50% Booking Guarantee Deposit
                      </strong>
                      <span style={{ fontSize: '12.5px', color: 'var(--color-text)' }}>
                        Pay {calcResult ? `₦${calcResult.depositAmount.toLocaleString()}` : '50%'} now to lock dates. Balance payable upon check-in.
                      </span>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '6px',
                      background: paymentOption === 'hotel' ? '#ffffff' : 'transparent',
                      border: paymentOption === 'hotel' ? '1.5px solid var(--color-gold)' : '1px solid var(--color-border)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentOption"
                      value="hotel"
                      checked={paymentOption === 'hotel'}
                      onChange={() => setPaymentOption('hotel')}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <strong style={{ display: 'block', fontSize: '14px', color: 'var(--color-dark)' }}>
                        Inquiry / Pay at Check-In
                      </strong>
                      <span style={{ fontSize: '12.5px', color: 'var(--color-text)' }}>
                        Submit request. Concierge will reach out within 24 hours to confirm availability and payment.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="field-wrap">
                <label htmlFor="specialRequests">Special Requests &amp; Preferences</label>
                <textarea
                  rows="3"
                  id="specialRequests"
                  placeholder="Dietary specifications, specific pillows, security requests..."
                  value={form.specialRequests}
                  onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn btn-gold btn-full"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '15px',
                  padding: '14px 24px',
                }}
              >
                <Lock size={16} />
                {isProcessing
                  ? 'Opening Paystack Checkout...'
                  : paymentOption === 'online'
                  ? `Pay ${calcResult ? `₦${calcResult.total.toLocaleString()}` : ''} & Confirm Reservation`
                  : paymentOption === 'deposit'
                  ? `Pay ${calcResult ? `₦${calcResult.depositAmount.toLocaleString()}` : ''} Deposit & Secure Dates`
                  : 'Submit Reservation Request'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text)' }}>
                <span>🔒 256-bit SSL Encrypted • Powered by Paystack</span>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Summary */}
        <aside className="side-panel">
          <div className="benefits-card">
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', margin: 0, color: 'var(--color-dark)' }}>
              Stay Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text)' }}>Selected Suite:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{form.roomPreference}</span>
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
                  <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '4px 0' }} />
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
                  <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '4px 0' }} />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--color-gold)',
                    }}
                  >
                    <span>Total Amount:</span>
                    <span>₦{calcResult.total.toLocaleString()}</span>
                  </div>

                  {paymentOption === 'deposit' && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#10b981',
                        background: 'rgba(16, 185, 129, 0.08)',
                        padding: '6px 10px',
                        borderRadius: '4px',
                      }}
                    >
                      <span>Due Today (50%):</span>
                      <span>₦{calcResult.depositAmount.toLocaleString()}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

