import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState(null);
  const location = useLocation();

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setOpenMobileGroup(null);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('nav-lock-scroll');
    } else {
      document.body.classList.remove('nav-lock-scroll');
    }
  }, [mobileMenuOpen]);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleMobileGroup = (groupName) => {
    setOpenMobileGroup(openMobileGroup === groupName ? null : groupName);
  };

  return (
    <>
      <header className="nav-bar">
        <Link to="/" className="logo-link">
          <img
            src="/images/brand-logo-transparent.webp"
            alt="AA Entertainment"
            className="brand-logo-img"
            decoding="async"
            loading="eager"
          />
        </Link>

        <nav className="nav-links">
          <NavLink to="/rooms-listing" className={({ isActive }) => (isActive ? 'active' : '')}>
            Stay
          </NavLink>

          {/* Dine Dropdown */}
          <div
            className={`nav-item ${activeDropdown === 'dine' ? 'open' : ''}`}
            onMouseEnter={() => setActiveDropdown('dine')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className="nav-trigger"
              onClick={() => toggleDropdown('dine')}
            >
              Dine
            </button>
            <div className="nav-dropdown-panel">
              <Link to="/restaurant" onClick={() => setActiveDropdown(null)}>Restaurant</Link>
              <Link to="/cafe" onClick={() => setActiveDropdown(null)}>Café</Link>
            </div>
          </div>

          <NavLink to="/spa" className={({ isActive }) => (isActive ? 'active' : '')}>
            Wellness
          </NavLink>

          {/* Events Dropdown */}
          <div
            className={`nav-item ${activeDropdown === 'events' ? 'open' : ''}`}
            onMouseEnter={() => setActiveDropdown('events')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className="nav-trigger"
              onClick={() => toggleDropdown('events')}
            >
              Events
            </button>
            <div className="nav-dropdown-panel">
              <Link to="/events#event-halls" onClick={() => setActiveDropdown(null)}>Event Halls</Link>
              <Link to="/events#event-types" onClick={() => setActiveDropdown(null)}>Weddings &amp; Ceremonies</Link>
              <Link to="/events#event-types" onClick={() => setActiveDropdown(null)}>Meetings &amp; Conferences</Link>
              <Link to="/events#event-enquiry" onClick={() => setActiveDropdown(null)}>Event Enquiry</Link>
            </div>
          </div>

          {/* Discover Dropdown */}
          <div
            className={`nav-item ${activeDropdown === 'discover' ? 'open' : ''}`}
            onMouseEnter={() => setActiveDropdown('discover')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className="nav-trigger"
              onClick={() => toggleDropdown('discover')}
            >
              Discover
            </button>
            <div className="nav-dropdown-panel">
              <Link to="/gallery" onClick={() => setActiveDropdown(null)}>Gallery</Link>
              <Link to="/boutique" onClick={() => setActiveDropdown(null)}>Boutique</Link>
            </div>
          </div>

          {/* About Dropdown */}
          <div
            className={`nav-item ${activeDropdown === 'about' ? 'open' : ''}`}
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className="nav-trigger"
              onClick={() => toggleDropdown('about')}
            >
              About
            </button>
            <div className="nav-dropdown-panel">
              <Link to="/about" onClick={() => setActiveDropdown(null)}>About the Hotel</Link>
              <Link to="/contact" onClick={() => setActiveDropdown(null)}>Contact</Link>
              <Link to="/contact#location" onClick={() => setActiveDropdown(null)}>Location</Link>
            </div>
          </div>
        </nav>

        <Link to="/reservation" className="btn btn-dark nav-cta">
          Reserve Stay
        </Link>

        <button
          type="button"
          className="hamburger-btn"
          id="hamburgerBtn"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} id="mobileNavOverlay">
        <div className="mnav-header">
          <img
            src="/images/brand-logo-transparent.webp"
            alt="AA Entertainment"
            className="brand-logo-img footer-logo"
            decoding="async"
            loading="lazy"
          />
          <button
            type="button"
            className="mnav-close"
            id="mobileNavClose"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="mnav-body">
          <Link
            to="/reservation"
            className="btn btn-gold mnav-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reserve Stay
          </Link>

          <Link
            to="/rooms-listing"
            className="mnav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Stay
          </Link>

          <div className={`mnav-group ${openMobileGroup === 'dine' ? 'open' : ''}`}>
            <button
              type="button"
              className="mnav-group-trigger"
              onClick={() => toggleMobileGroup('dine')}
            >
              Dine
            </button>
            <div className="mnav-sublist">
              <Link to="/restaurant" onClick={() => setMobileMenuOpen(false)}>Restaurant</Link>
              <Link to="/cafe" onClick={() => setMobileMenuOpen(false)}>Café</Link>
            </div>
          </div>

          <Link
            to="/spa"
            className="mnav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Wellness
          </Link>

          <div className={`mnav-group ${openMobileGroup === 'events' ? 'open' : ''}`}>
            <button
              type="button"
              className="mnav-group-trigger"
              onClick={() => toggleMobileGroup('events')}
            >
              Events
            </button>
            <div className="mnav-sublist">
              <Link to="/events#event-halls" onClick={() => setMobileMenuOpen(false)}>Event Halls</Link>
              <Link to="/events#event-types" onClick={() => setMobileMenuOpen(false)}>Weddings &amp; Ceremonies</Link>
              <Link to="/events#event-types" onClick={() => setMobileMenuOpen(false)}>Meetings &amp; Conferences</Link>
              <Link to="/events#event-enquiry" onClick={() => setMobileMenuOpen(false)}>Event Enquiry</Link>
            </div>
          </div>

          <div className={`mnav-group ${openMobileGroup === 'discover' ? 'open' : ''}`}>
            <button
              type="button"
              className="mnav-group-trigger"
              onClick={() => toggleMobileGroup('discover')}
            >
              Discover
            </button>
            <div className="mnav-sublist">
              <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
              <Link to="/boutique" onClick={() => setMobileMenuOpen(false)}>Boutique</Link>
            </div>
          </div>

          <div className={`mnav-group ${openMobileGroup === 'about' ? 'open' : ''}`}>
            <button
              type="button"
              className="mnav-group-trigger"
              onClick={() => toggleMobileGroup('about')}
            >
              About
            </button>
            <div className="mnav-sublist">
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About the Hotel</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/contact#location" onClick={() => setMobileMenuOpen(false)}>Location</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
