import '../styles/SeatBookingPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { D3SeatingChart } from 'd3-seating-chart';
import { ShowBehavior } from 'd3-seating-chart';
import { useRef } from 'react';

import { Button } from '@progress/kendo-react-buttons';
import { BookingConfirmPopup } from '../components/booking/BookingConfirmPopup';

export const SeatBookingPage = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showLimitMsg, setShowLimitMsg] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const { movieId, theatreId } = useParams<{ movieId: string; theatreId: string }>();
  const dispatch = useDispatch();
  const theatres = useSelector((state: RootState) => state.theatres.theatres);
  const navigate = useNavigate();
  const movie = useSelector((state: RootState) => 
    state.movies.movies?.find(m => m.id === Number(movieId))
  );
  let theatre = useSelector((state: RootState) => state.theatres.selectedTheatre);
  // Fallback: If seatLayout is missing, regenerate it from config
  if (theatre && (!theatre.seatLayout || !theatre.seatLayout.rows || theatre.seatLayout.rows.length === 0)) {
    // Dynamically import generateSeatLayout to avoid circular deps
    // @ts-ignore
    const { generateSeatLayout } = require('../utils/seatUtils');
    theatre = { ...theatre, seatLayout: generateSeatLayout(theatre.name) };
  }
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Restore selectedTheatre from route param if missing
    if (!theatre && theatreId && theatres.length > 0) {
      const found = theatres.find(t => String(t.id) === String(theatreId));
      if (found) {
        dispatch({ type: 'theatres/setSelectedTheatre', payload: found });
      }
    }
    if (svgRef.current) {
      // Set custom attributes for d3-seating-chart
      const svg = svgRef.current;
      const gBoard = svg.querySelector('g');
      if (gBoard) gBoard.setAttribute('board', '');
      const stageRect = svg.querySelector('rect[data-stage]');
      if (stageRect) stageRect.setAttribute('stage', '');
      const seatingArea = svg.querySelector('g[data-seating-area]');
      if (seatingArea) seatingArea.setAttribute('seating-area', '');
      seatingArea?.setAttribute('zoom-target', 'main');
      const seatRects = svg.querySelectorAll('rect[data-seat]');
      seatRects.forEach(rect => {
        rect.setAttribute('seat', '');
        if (rect.getAttribute('data-locked') === 'true') {
          rect.setAttribute('locked', 'reserved');
        }
      });
      D3SeatingChart.attach(svg as unknown as HTMLElement, {
        allowManualSelection: true,
        showBehavior: ShowBehavior.All,
      });
    }
  }, [theatre, theatreId, theatres, dispatch]);
  if (!movie || !theatre) {
    return <div>Please select a theatre to continue.</div>;
  }

  // Backdrop image styling
  const backdropStyle = {
  width: '100%',
  maxHeight: '500px',
  objectFit: 'cover' as React.CSSProperties['objectFit'],
  borderRadius: '12px',
  marginBottom: '2rem',
  boxShadow: '0 2px 16px rgba(0,0,0,0.15)'
  };

  return (
      <div className="seat-booking-container">
        <div
          className="booking-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          <button
            className="back-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--primary-color)",
              padding: "0 8px 0 0",
              marginLeft: "32px",
            }}
            onClick={() => navigate(-1)}
          >
            <img
              src="/assets/logos/back_btn.png"
              alt="Back"
              style={{ width: "20px", height: "20px", objectFit: "contain" }}
            />
            Back
          </button>
          <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 800, color: "var(--secondary-color)", letterSpacing: "1px" }}>
            Select Your Seats
          </h1>
        </div>
        {movie?.backdrop && (
          <img src={movie?.backdrop} alt={`${movie?.title} Backdrop`} style={backdropStyle} />
        )}
        <div className="seat-booking-header">
          <div className="booking-info">
            <h2>{movie?.title}</h2>
            <h3>{theatre?.name}</h3>
          </div>
        </div>

  <div className="movie-metadata" style={{ background: 'rgba(245,247,250,0.85)', borderRadius: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', padding: '22px 28px', margin: '0 auto 64px auto', maxWidth: '700px', fontSize: '1.08rem', color: '#444', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ background: 'linear-gradient(90deg, #f5f7fa 60%, #e2eafc 100%)', border: '1px solid #e2eafc', borderRadius: '10px', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center', width: '100%' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <svg width="18" height="18" fill="#4caf50" style={{ marginRight: '2px' }}><circle cx="9" cy="9" r="8" stroke="#4caf50" strokeWidth="2" fill="none"/><text x="9" y="13" textAnchor="middle" fontSize="10" fill="#4caf50">⏱</text></svg>
              {movie?.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <svg width="18" height="18" fill="#2196f3" style={{ marginRight: '2px' }}><rect x="3" y="3" width="12" height="12" rx="3" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2"/><text x="9" y="13" textAnchor="middle" fontSize="10" fill="#2196f3">🎬</text></svg>
              {movie?.genre}
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center', width: '100%' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <svg width="18" height="18" fill="#ff9800" style={{ marginRight: '2px' }}><circle cx="9" cy="9" r="8" stroke="#ff9800" strokeWidth="2" fill="#fffde7"/><text x="9" y="13" textAnchor="middle" fontSize="10" fill="#ff9800">📅</text></svg>
              {movie?.releaseDate}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#ffd700', fontSize: '1.1rem' }}>
              ⭐ {movie?.rating}
            </span>
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #e2eafc', margin: '10px 0 16px 0' }} />
  <p className="movie-description" style={{ marginTop: '18px', fontSize: '1.15rem', color: '#222', lineHeight: '1.7', fontWeight: 500 }}>{movie?.description}</p>
      </div>

      <div
        className="seat-booking-main"
        style={{
          position: 'relative',
          overflowX: 'auto',
          maxWidth: '1080px',
          minHeight: '480px',
          display: 'flex',
          flexDirection: 'row',
          gap: '0px',
          alignItems: 'flex-start',
          padding: '8px 0',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            flex: '1 1 0',
            minWidth: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflowX: 'auto',
            paddingBottom: '12px',
            maxWidth: '520px',
          }}
        >
          {/* Removed left-side validation message, only absolute message remains above seat layout */}
          <svg
            ref={svgRef}
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              {/* Stage (Screen) */}
              <rect data-stage x="50" y="20" width="400" height="12" fill="#2196f3" />
              <text x="250" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff" letterSpacing="2">SCREEN</text>
              {/* Light projection effect below screen */}
              <rect x="50" y="32" width="400" height="36" fill="url(#screen-light)" opacity="0.7" />
              <defs>
                <linearGradient id="screen-light" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#bbdefb" stop-opacity="0.7" />
                  <stop offset="60%" stop-color="#90caf9" stop-opacity="0.3" />
                  <stop offset="100%" stop-color="#fff" stop-opacity="0" />
                </linearGradient>
              </defs>
              {/* Seating Area */}
              <g data-seating-area>
                {theatre?.seatLayout?.rows.map((row, rowIdx) => (
                  row.seats.map((seat, seatIdx) => {
                    const isSelected = selectedSeats.includes(seat.id);
                    let seatImage = "/assets/logos/clapboard.png";
                    if (!seat.isBooked) {
                      if (seat.tier === "SILVER") seatImage = "/assets/logos/seat_silver.svg";
                      else if (seat.tier === "GOLD") seatImage = "/assets/logos/seat_gold.svg";
                      else if (seat.tier === "PLATINUM") seatImage = "/assets/logos/seat_platinum.svg";
                    }
                    // Seat number: A1, A2, ..., B1, B2, ...
                    const rowLetter = String.fromCharCode(65 + rowIdx); // 65 = 'A'
                    const seatNumber = `${rowLetter}${seatIdx + 1}`;
                    return (
                      <g key={seat.id}>
                        <image
                          data-seat
                          x={60 + seatIdx * 40}
                          y={80 + rowIdx * 40}
                          width="32"
                          height="32"
                          href={isSelected ? "/assets/logos/seat.svg" : seatImage}
                          style={{ cursor: seat.isBooked ? 'not-allowed' : 'pointer', pointerEvents: 'all' }}
                          onClick={() => {
                            if (!seat.isBooked) {
                              setSelectedSeats(prev => {
                                if (prev.includes(seat.id)) {
                                  setShowLimitMsg(false);
                                  return prev.filter(id => id !== seat.id);
                                } else if (prev.length < 8) {
                                  setShowLimitMsg(false);
                                  return [...prev, seat.id];
                                } else {
                                  setShowLimitMsg(true);
                                  return prev;
                                }
                              });
                            }
                          }}
                          data-locked={seat.isBooked ? 'true' : undefined}
                        />
                        <text
                          x={76 + seatIdx * 40}
                          y={97 + rowIdx * 40}
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                          fill="#222"
                          style={{ userSelect: 'none', pointerEvents: 'none' }}
                        >
                          {seatNumber}
                        </text>
                      </g>
                    );
                  })
                ))}
              </g>
            </g>
          </svg>
        </div>
        {/* New Seat Legend Section with validation on right side */}
        <div
          style={{
            minWidth: '180px',
            maxWidth: '260px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            padding: '22px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            marginLeft: '12px',
            marginRight: '0',
            position: 'relative',
          }}
          className="seat-legend-responsive"
        >
          <h3 style={{ fontSize: '1.12rem', fontWeight: 800, marginBottom: '10px', color: '#ff6358', textAlign: 'center', letterSpacing: '1px' }}>Seat Pricing</h3>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
              <img src="/assets/logos/seat_silver.svg" alt="Silver Seat" width="32" height="32" />
              <span style={{ fontWeight: 700, color: '#888', fontSize: '1rem' }}>Silver</span>
              <span style={{ fontWeight: 800, color: '#444', fontSize: '1rem', marginLeft: 'auto' }}>₹100</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
              <img src="/assets/logos/seat_gold.svg" alt="Gold Seat" width="32" height="32" />
              <span style={{ fontWeight: 700, color: '#b8860b', fontSize: '1rem' }}>Gold</span>
              <span style={{ fontWeight: 800, color: '#444', fontSize: '1rem', marginLeft: 'auto' }}>₹150</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
              <img src="/assets/logos/seat_platinum.svg" alt="Platinum Seat" width="32" height="32" />
              <span style={{ fontWeight: 700, color: '#555', fontSize: '1rem' }}>Platinum</span>
              <span style={{ fontWeight: 800, color: '#444', fontSize: '1rem', marginLeft: 'auto' }}>₹200</span>
            </div>
          </div>
          {showLimitMsg && (
            <span style={{
              marginTop: '18px',
              color: '#d32f2f',
              fontWeight: 700,
              fontSize: '1.08rem',
              background: 'rgba(255,255,255,0.98)',
              padding: '10px 18px',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(211,47,47,0.10)',
              border: '1.5px solid #d32f2f',
              textAlign: 'center',
              display: 'block',
            }}>
              You can only book a maximum of 8 seats at a time.
            </span>
          )}
        </div>
      </div>

      {/* Pricing Details Section */}
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          margin: '18px auto 0 auto',
          background: '#f7f7fa',
          borderRadius: '10px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
          padding: '18px 22px',
          fontSize: '1.08rem',
          color: '#222',
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {selectedSeats.length === 0 ? (
          <span>Select seats to see pricing details.</span>
        ) : (
          <>
            <div style={{ marginBottom: '8px' }}>
              Selected Seats:&nbsp;
              <span style={{ color: '#1976d2', fontWeight: 700 }}>
                {selectedSeats.join(', ')}
              </span>
            </div>
            <div>
              Total Price:&nbsp;
              <span style={{ color: '#388e3c', fontWeight: 700, fontSize: '1.15rem' }}>
                ₹{selectedSeats
                  .map(id => {
                    // Find seat by id
                    for (const row of theatre.seatLayout.rows) {
                      const seat = row.seats.find(s => s.id === id);
                      if (seat) return seat.price;
                    }
                    return 0;
                  })
                  .reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="seat-booking-actions">
        <Button
          themeColor="primary"
          onClick={() => setShowConfirmPopup(true)}
          style={{
            borderRadius: '18px',
            fontWeight: 800,
            fontSize: '1.12rem',
            padding: '10px 38px',
            background: 'linear-gradient(90deg, #ff6358 0%, #fdce3e 100%)',
            color: '#fff',
            boxShadow: '0 2px 12px rgba(255,99,88,0.18)',
            border: 'none',
            transition: 'box-shadow 0.2s',
          }}
        >
          Book Now
        </Button>
      </div>

      {showConfirmPopup && (
        <BookingConfirmPopup
          movieTitle={movie?.title}
          selectedSeats={selectedSeats}
          onClose={() => setShowConfirmPopup(false)}
        />
      )}
    </div>
  );
}