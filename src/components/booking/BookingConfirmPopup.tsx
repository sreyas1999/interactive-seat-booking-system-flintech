import React from 'react';

interface BookingConfirmPopupProps {
  movieTitle?: string;
  selectedSeats: string[];
  onClose: () => void;
}

export const BookingConfirmPopup: React.FC<BookingConfirmPopupProps> = ({ movieTitle, selectedSeats, onClose }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.32)',
      zIndex: 19999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onClick={onClose}
  >
    <div
      style={{
        background: '#fff',
        borderRadius: '32px',
        boxShadow: '0 8px 40px 0 rgba(255,99,88,0.18)',
        border: '1.5px solid #ff6358',
        padding: 0,
        minWidth: 340,
        minHeight: 320,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '28px',
        paddingBottom: '18px',
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{
        background: 'linear-gradient(120deg, #ff6358 0%, #fdce3e 100%)',
        borderRadius: '50%',
        width: 72,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        boxShadow: '0 4px 18px rgba(255,99,88,0.18)',
        border: '2.5px solid #fff',
      }}>
        <img src="/assets/logos/tick.svg" alt="Confirmed" width="40" height="40" style={{ display: 'block' }} />
      </div>
      <h2 style={{
        color: '#ff6358',
        fontWeight: 900,
        marginBottom: '12px',
        fontSize: '1.65rem',
        letterSpacing: '1.5px',
        textShadow: '0 2px 8px rgba(255,99,88,0.10)',
      }}>
        Booking Confirmed!
      </h2>
      <div style={{
        marginBottom: '10px',
        fontSize: '1.12rem',
        color: '#222',
        fontWeight: 700,
        textAlign: 'center',
      }}>
        {movieTitle}
      </div>
      <div style={{
        marginBottom: '12px',
        fontSize: '1.18rem',
        color: '#3e80ed',
        fontWeight: 500,
      }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Your seats:</span>&nbsp;
        <span style={{ color: '#ff6358', fontWeight: 700, fontSize: '1.12rem' }}>
          {selectedSeats.join(', ')}
        </span>
      </div>
      <div style={{
        marginBottom: '22px',
        color: '#5ec232',
        fontSize: '1.09rem',
        fontWeight: 500,
        textAlign: 'center',
      }}>
        Thank you for booking.<br />Enjoy your movie!
      </div>
      <button
        style={{
          borderRadius: '18px',
          fontWeight: 800,
          fontSize: '1.12rem',
          padding: '10px 38px',
          marginTop: '8px',
          background: 'linear-gradient(90deg, #ff6358 0%, #fdce3e 100%)',
          color: '#fff',
          boxShadow: '0 2px 12px rgba(255,99,88,0.18)',
          border: 'none',
          transition: 'box-shadow 0.2s',
          cursor: 'pointer',
        }}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);