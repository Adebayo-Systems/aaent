import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import RoomsListing from './pages/RoomsListing';
import RoomDetail from './pages/RoomDetail';
import Restaurant from './pages/Restaurant';
import Cafe from './pages/Cafe';
import Spa from './pages/Spa';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Boutique from './pages/Boutique';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';

import AdminLayout from './pages/admin/AdminLayout';

export default function App() {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Platform Route Branch */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Main Website Routes */}
          <Route
            path="/*"
            element={
              <div className="app-container">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/rooms-listing" element={<RoomsListing />} />
                  <Route path="/room-detail" element={<RoomDetail />} />
                  <Route path="/restaurant" element={<Restaurant />} />
                  <Route path="/cafe" element={<Cafe />} />
                  <Route path="/spa" element={<Spa />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/boutique" element={<Boutique />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/reservation" element={<Reservation />} />
                  {/* Fallback to Home */}
                  <Route path="*" element={<Home />} />
                </Routes>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </DataProvider>
  );
}
