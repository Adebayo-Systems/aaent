import React, { useState, useRef, useEffect } from 'react';

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

const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export default function DateRangePickerPopover({ checkInDate, checkOutDate, onSelectRange }) {
  const [isOpen, setIsOpen] = useState(false);
  const minCheckIn = getMinCheckInDate();

  const initialMonth = checkInDate ? new Date(checkInDate.getFullYear(), checkInDate.getMonth(), 1) : new Date(minCheckIn.getFullYear(), minCheckIn.getMonth(), 1);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateClick = (dayDate) => {
    const midnightDay = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate());
    const midnightMin = new Date(minCheckIn.getFullYear(), minCheckIn.getMonth(), minCheckIn.getDate());

    if (midnightDay < midnightMin) return;

    if (!checkInDate || (checkInDate && checkOutDate)) {
      // First click: set check-in, clear check-out
      onSelectRange(midnightDay, null);
    } else if (checkInDate && !checkOutDate) {
      if (midnightDay <= checkInDate) {
        onSelectRange(midnightDay, null);
      } else {
        onSelectRange(checkInDate, midnightDay);
        // Automatically close popover after complete selection
        setIsOpen(false);
      }
    }
  };

  // Calculate nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = checkOutDate - checkInDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();

  // Days grid
  const calendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArr = [];
    for (let i = 0; i < firstDayIndex; i++) {
      daysArr.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      daysArr.push(new Date(year, month, day));
    }
    return daysArr;
  };

  const daysList = calendarDays();
  const monthLabel = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Compact Input Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          padding: '14px 16px',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          userSelect: 'none',
          boxShadow: isOpen ? '0 0 0 2px var(--color-gold)' : 'none',
          transition: 'all 0.15s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
          <span style={{ fontSize: '16px' }}>📅</span>
          <div>
            <span style={{ fontWeight: 600, color: 'var(--color-dark)' }}>
              {checkInDate ? formatReadable(checkInDate) : 'Select Check-In'}
            </span>
            <span style={{ margin: '0 8px', color: 'var(--color-text)' }}>&rarr;</span>
            <span style={{ fontWeight: 600, color: 'var(--color-dark)' }}>
              {checkOutDate ? formatReadable(checkOutDate) : 'Select Check-Out'}
            </span>
          </div>
        </div>

        {nights > 0 ? (
          <span style={{ background: 'var(--color-gold)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px' }}>
            {nights} Night{nights > 1 ? 's' : ''}
          </span>
        ) : (
          <span style={{ fontSize: '12px', color: 'var(--color-gold)', fontWeight: 600 }}>
            Choose Dates
          </span>
        )}
      </div>

      {/* Floating Popover Calendar Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            zIndex: 300,
            width: '100%',
            maxWidth: '360px',
            background: '#fff',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            boxShadow: '0 12px 32px rgba(51, 73, 90, 0.18)',
            padding: '18px',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              &larr;
            </button>
            <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-dark)' }}>
              {monthLabel}
            </span>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              &rarr;
            </button>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '10px', textAlign: 'center' }}>
            * Stays require min 3-day advance notice
          </div>

          {/* Weekday Labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontWeight: 600, fontSize: '11px', color: 'var(--color-text)', marginBottom: '6px' }}>
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {daysList.map((d, idx) => {
              if (!d) return <div key={idx} style={{ height: '34px' }} />;

              const midnightD = new Date(d.getFullYear(), d.getMonth(), d.getDate());
              const midnightMin = new Date(minCheckIn.getFullYear(), minCheckIn.getMonth(), minCheckIn.getDate());
              const isDisabled = midnightD < midnightMin;

              const isCheckIn = isSameDay(d, checkInDate);
              const isCheckOut = isSameDay(d, checkOutDate);
              const isInRange = checkInDate && checkOutDate && midnightD > checkInDate && midnightD < checkOutDate;

              let bg = '#f8fafb';
              let color = 'var(--color-dark)';
              let fontWeight = 'normal';

              if (isDisabled) {
                bg = '#eee';
                color = '#aaa';
              } else if (isCheckIn || isCheckOut) {
                bg = 'var(--color-gold)';
                color = '#fff';
                fontWeight = 'bold';
              } else if (isInRange) {
                bg = '#fde8e8';
                color = 'var(--color-gold)';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDateClick(d)}
                  style={{
                    height: '34px',
                    border: isCheckIn || isCheckOut ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                    borderRadius: '4px',
                    background: bg,
                    color: color,
                    fontWeight: fontWeight,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                    padding: 0,
                  }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-text)' }}>
              {!checkInDate ? 'Click check-in date' : !checkOutDate ? 'Click check-out date' : 'Range selected'}
            </span>
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={() => setIsOpen(false)}
              style={{ padding: '6px 14px', fontSize: '11px' }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
