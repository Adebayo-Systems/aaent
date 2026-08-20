import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* CONTACT HERO */}
      <section className="hero hero-sm" style={{ backgroundImage: "url('/images/245ab7a4-1ba1-405e-b35b-04f59e557a41.webp')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-line"></span>
            <span>At Your Service</span>
          </div>
          <h1 className="hero-title hero-title-sm">Contact Us</h1>
          <p className="hero-body">
            Whether scheduling a secure business conference or custom suite stays, our professional concierge desk stands prepared to coordinate flawlessly.
          </p>
        </div>
      </section>

      {/* CONTACT SPLIT */}
      <section className="contact-split">
        <div className="contact-form-side">
          <div className="form-title-block">
            <h2 className="section-title-sm">Leave a Message</h2>
            <p className="body-text">Fill out your details and your message below. A representative will reach out to you shortly.</p>
          </div>

          {submitted ? (
            <div style={{ background: '#d4edda', color: '#155724', padding: '20px', borderRadius: '4px', marginTop: '16px' }}>
              <h3>Message Sent!</h3>
              <p>Thank you, {form.name}. We have received your inquiry regarding "{form.subject || 'General'}" and will reply via email shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="What is your enquiry regarding?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Message</label>
                <textarea
                  rows="4"
                  placeholder="Type your message here..."
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-dark btn-full">Send Message</button>
            </form>
          )}
        </div>

        <div className="contact-info-side">
          <div className="info-block">
            <h2 className="section-title-sm">Contact Information</h2>
            <div className="details-list">
              <div className="detail-row">
                <img src="/images/19746466-12f6-4c9a-bd8d-87ca3dd5c25b.svg" alt="" className="icon-md" decoding="async" loading="eager" />
                <div>
                  <p className="detail-label">Location</p>
                  <p className="detail-value">Kuto, Abeokuta, Ogun State, Nigeria</p>
                </div>
              </div>
              <div className="detail-row">
                <img src="/images/3601d451-6c7c-473a-890a-939c02c6b197.svg" alt="" className="icon-md" decoding="async" loading="lazy" />
                <div>
                  <p className="detail-label">Phone Numbers</p>
                  <p className="detail-value">+234 800 123 4567 / +234 1 277 3500</p>
                </div>
              </div>
              <div className="detail-row">
                <img src="/images/74144529-dd49-4ddf-b3a7-74ea4766665f.svg" alt="" className="icon-md" decoding="async" loading="lazy" />
                <div>
                  <p className="detail-label">Emails</p>
                  <p className="detail-value">info@aaentertainment.com / reservations@aa-entertainment.com</p>
                </div>
              </div>
              <div className="detail-row">
                <img src="/images/b5d2a684-5f1e-4020-a69f-72a1266dfaa0.svg" alt="" className="icon-md" decoding="async" loading="lazy" />
                <div>
                  <p className="detail-label">Business Hours</p>
                  <p className="detail-value">Monday - Sunday: 24 Hours Operative</p>
                </div>
              </div>
            </div>
          </div>

          <div className="map-placeholder" id="location" style={{ backgroundImage: "url('/images/a8b3598d-51b4-4c3f-b714-68affff67737.webp')" }}>
            <div className="map-banner">
              <img src="/images/19746466-12f6-4c9a-bd8d-87ca3dd5c25b.svg" alt="" className="icon-sm" decoding="async" loading="lazy" />
              <span>AA Entertainment, Kuto, Abeokuta</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
