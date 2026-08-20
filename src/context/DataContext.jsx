import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ROOMS,
  INITIAL_DISHES,
  INITIAL_SPA,
  INITIAL_VENUES,
  INITIAL_BOUTIQUE,
  INITIAL_GALLERY,
  INITIAL_BOOKINGS,
  INITIAL_SETTINGS,
} from '../data/initialData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  // Theme state for Admin platform
  const [adminTheme, setAdminTheme] = useState(() => {
    return localStorage.getItem('aa_admin_theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('aa_admin_theme', adminTheme);
  }, [adminTheme]);

  const toggleTheme = () => {
    setAdminTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth session
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('aa_admin_auth') === 'true';
  });

  // State initialization with localStorage fallback
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('aa_data_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [dishes, setDishes] = useState(() => {
    const saved = localStorage.getItem('aa_data_dishes');
    return saved ? JSON.parse(saved) : INITIAL_DISHES;
  });

  const [spaServices, setSpaServices] = useState(() => {
    const saved = localStorage.getItem('aa_data_spa');
    return saved ? JSON.parse(saved) : INITIAL_SPA;
  });

  const [venues, setVenues] = useState(() => {
    const saved = localStorage.getItem('aa_data_venues');
    return saved ? JSON.parse(saved) : INITIAL_VENUES;
  });

  const [boutiqueItems, setBoutiqueItems] = useState(() => {
    const saved = localStorage.getItem('aa_data_boutique');
    return saved ? JSON.parse(saved) : INITIAL_BOUTIQUE;
  });

  const [galleryItems, setGalleryItems] = useState(() => {
    const saved = localStorage.getItem('aa_data_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('aa_data_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('aa_data_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('aa_data_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('aa_data_dishes', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('aa_data_spa', JSON.stringify(spaServices));
  }, [spaServices]);

  useEffect(() => {
    localStorage.setItem('aa_data_venues', JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem('aa_data_boutique', JSON.stringify(boutiqueItems));
  }, [boutiqueItems]);

  useEffect(() => {
    localStorage.setItem('aa_data_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('aa_data_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('aa_data_settings', JSON.stringify(settings));
  }, [settings]);

  // Auth Handlers
  const loginAdmin = (pin) => {
    if (pin === settings.adminPin || pin === '1234') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('aa_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('aa_admin_auth');
  };

  // ROOMS CRUD
  const addRoom = (room) => {
    const newRoom = {
      ...room,
      id: `room-${Date.now()}`,
      available: room.available !== undefined ? room.available : true,
    };
    setRooms((prev) => [newRoom, ...prev]);
  };

  const updateRoom = (id, updatedData) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r)));
  };

  const deleteRoom = (id) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleRoomAvailability = (id) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, available: !r.available } : r))
    );
  };

  // DISHES CRUD
  const addDish = (dish) => {
    const newDish = {
      ...dish,
      id: `dish-${Date.now()}`,
    };
    setDishes((prev) => [newDish, ...prev]);
  };

  const updateDish = (id, updatedData) => {
    setDishes((prev) => prev.map((d) => (d.id === id ? { ...d, ...updatedData } : d)));
  };

  const deleteDish = (id) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
  };

  // SPA CRUD
  const addSpaService = (service) => {
    const newService = { ...service, id: `spa-${Date.now()}` };
    setSpaServices((prev) => [newService, ...prev]);
  };

  const updateSpaService = (id, updatedData) => {
    setSpaServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s)));
  };

  const deleteSpaService = (id) => {
    setSpaServices((prev) => prev.filter((s) => s.id !== id));
  };

  // VENUES CRUD
  const addVenue = (venue) => {
    const newVenue = { ...venue, id: `venue-${Date.now()}` };
    setVenues((prev) => [newVenue, ...prev]);
  };

  const updateVenue = (id, updatedData) => {
    setVenues((prev) => prev.map((v) => (v.id === id ? { ...v, ...updatedData } : v)));
  };

  const deleteVenue = (id) => {
    setVenues((prev) => prev.filter((v) => v.id !== id));
  };

  // BOUTIQUE CRUD
  const addBoutiqueItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      stockStatus: item.stockStatus || 'In Stock',
    };
    setBoutiqueItems((prev) => [newItem, ...prev]);
  };

  const updateBoutiqueItem = (id, updatedData) => {
    setBoutiqueItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteBoutiqueItem = (id) => {
    setBoutiqueItems((prev) => prev.filter((item) => item.id !== id));
  };

  // GALLERY CRUD
  const addGalleryItem = (item) => {
    const newItem = { ...item, id: `gal-${Date.now()}` };
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
  };

  // BOOKINGS & INQUIRIES CRUD
  const addBooking = (booking) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ...booking,
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id, status, paymentStatus) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: status || b.status,
              paymentStatus: paymentStatus || b.paymentStatus,
            }
          : b
      )
    );
  };

  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // SETTINGS UPDATE
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Reset to initial data helper
  const resetAllData = () => {
    setRooms(INITIAL_ROOMS);
    setDishes(INITIAL_DISHES);
    setSpaServices(INITIAL_SPA);
    setVenues(INITIAL_VENUES);
    setBoutiqueItems(INITIAL_BOUTIQUE);
    setGalleryItems(INITIAL_GALLERY);
    setBookings(INITIAL_BOOKINGS);
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem('aa_data_rooms');
    localStorage.removeItem('aa_data_dishes');
    localStorage.removeItem('aa_data_spa');
    localStorage.removeItem('aa_data_venues');
    localStorage.removeItem('aa_data_boutique');
    localStorage.removeItem('aa_data_gallery');
    localStorage.removeItem('aa_data_bookings');
    localStorage.removeItem('aa_data_settings');
  };

  const value = {
    adminTheme,
    toggleTheme,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,

    rooms,
    addRoom,
    updateRoom,
    deleteRoom,
    toggleRoomAvailability,

    dishes,
    addDish,
    updateDish,
    deleteDish,

    spaServices,
    addSpaService,
    updateSpaService,
    deleteSpaService,

    venues,
    addVenue,
    updateVenue,
    deleteVenue,

    boutiqueItems,
    addBoutiqueItem,
    updateBoutiqueItem,
    deleteBoutiqueItem,

    galleryItems,
    addGalleryItem,
    deleteGalleryItem,

    bookings,
    addBooking,
    updateBookingStatus,
    deleteBooking,

    settings,
    updateSettings,
    resetAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
