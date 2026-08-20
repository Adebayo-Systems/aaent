import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      {/* Contact Bar */}
      <div className="contact-bar">
        <div className="contact-item">
          <img src="/images/997d8829-1a7d-4072-9a9a-1adead0076f2.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>Kuto, Abeokuta, Ogun State</span>
        </div>
        <div className="contact-item">
          <img src="/images/2f538826-187a-4ed9-a693-15d3f96d0e00.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>+234 1 277 3500</span>
        </div>
        <div className="contact-item">
          <img src="/images/54ad0649-4252-4af2-90bd-a8e0c656095e.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>reservations@aa-entertainment.com</span>
        </div>
        <a href="https://wa.me/23412773500" target="_blank" rel="noopener noreferrer" className="contact-item whatsapp">
          <img src="/images/bb4f21a4-5d45-48fe-a4bd-75bd20c55ffb.svg" alt="" className="icon" decoding="async" loading="lazy" />
          <span>WhatsApp Chat</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/brand-logo-transparent.webp" alt="AA Entertainment" className="brand-logo-img footer-logo" decoding="async" loading="lazy" />
            <p className="body-text light">
              Experience the timeless spirit of Abeokuta beautifully balanced with understated elegance and warm-luxe African hospitality. A premium sanctuary designed for global business and leisure tastemakers.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-title">Explore</p>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/rooms-listing">Rooms</Link>
              <Link to="/restaurant">Restaurant</Link>
              <Link to="/spa">Spa &amp; Wellness</Link>
              <Link to="/cafe">Café</Link>
              <Link to="/boutique">Boutique</Link>
              <Link to="/events">Events &amp; Conferences</Link>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Legal &amp; Info</p>
              <Link to="/contact">Privacy Policy</Link>
              <Link to="/contact">Terms &amp; Conditions</Link>
              <Link to="/contact">FAQs</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/admin" style={{ color: 'var(--color-brand-red)', fontWeight: '600', marginTop: '4px' }}>
                🔒 Admin Portal
              </Link>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AA Entertainment Limited. All rights reserved. Kuto, Abeokuta, Ogun State.</p>
          <div className="socials">
            <a href="#" className="social-icon" aria-label="Instagram">
              <img src="/images/f5f9b1e8-fb75-40d2-9042-87dbc5599c96.svg" alt="" decoding="async" loading="lazy" />
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <img src="/images/77323994-335b-40be-b598-646fd3d517ab.svg" alt="" decoding="async" loading="lazy" />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <img src="/images/dc736719-464a-4840-bf13-624f2fe686ab.svg" alt="" decoding="async" loading="lazy" />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <img src="/images/e6627a58-1875-4f6c-a489-c436e9094c01.svg" alt="" decoding="async" loading="lazy" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
