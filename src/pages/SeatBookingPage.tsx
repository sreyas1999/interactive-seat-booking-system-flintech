import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { BookingConfirmPopup } from "../components/booking/BookingConfirmPopup";
import { MovieMetadata } from "../components/common/MovieMetadata";
import { TheatreStage } from "../components/common/TheatreStage";
import { SeatLegend } from "../components/booking/SeatLegend";
import Loader from "../components/common/Loader";
import { generateSeatLayout } from "../utils/seatUtils";
import "../styles/SeatBookingPage.css";

const MAX_SEATS = 8;

const getSeatImage = (isSelected: boolean, isBooked: boolean, tier: string): string => {
  if (isSelected) return "/assets/logos/seat.svg";
  if (isBooked) return "/assets/logos/clapboard.png";
  
  switch (tier) {
    case "SILVER":
      return "/assets/logos/seat_silver.svg";
    case "GOLD":
      return "/assets/logos/seat_gold.svg";
    case "PLATINUM":
      return "/assets/logos/seat_platinum.svg";
    default:
      return "/assets/logos/seat_silver.svg";
  }
};

export const SeatBookingPage = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showLimitMsg, setShowLimitMsg] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const { movieId, theatreId } = useParams<{
    movieId: string;
    theatreId: string;
  }>();
  const dispatch = useAppDispatch();
  const theatres = useAppSelector((state) => state.theatres.theatres);
  const navigate = useNavigate();
  const movie = useAppSelector((state) =>
    state.movies.movies?.find((m) => m.id === Number(movieId))
  );
  const moviesLoading = useAppSelector((state) => state.movies.loading);
  const theatresLoading = useAppSelector((state) => state.theatres.loading);
  
  let theatre = useAppSelector(
    (state) => state.theatres.selectedTheatre
  );
  // Fallback: If seatLayout is missing, regenerate it from config
  if (
    theatre &&
    (!theatre.seatLayout ||
      !theatre.seatLayout.rows ||
      theatre.seatLayout.rows.length === 0)
  ) {
    theatre = {
      ...theatre,
      seatLayout: generateSeatLayout(
        theatre.name as "ABC-Multiplex" | "XYZ-Multiplex"
      ),
    };
  }
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Restore selectedTheatre from route param if missing
    if (!theatre && theatreId && theatres.length > 0) {
      const found = theatres.find((t) => String(t.id) === String(theatreId));
      if (found) {
        dispatch({ type: "theatres/setSelectedTheatre", payload: found });
      }
    }
  }, [theatre, theatreId, theatres, dispatch]);

  // Handle seat selection logic
  const handleSeatClick = useCallback((seatId: string, isBooked: boolean) => {
    if (!isBooked) {
      setSelectedSeats((prev) => {
        if (prev.includes(seatId)) {
          setShowLimitMsg(false);
          return prev.filter((id) => id !== seatId);
        } else if (prev.length < MAX_SEATS) {
          setShowLimitMsg(false);
          return [...prev, seatId];
        } else {
          setShowLimitMsg(true);
          return prev;
        }
      });
    }
  }, []);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleBookNow = useCallback(() => {
    setShowConfirmPopup(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowConfirmPopup(false);
  }, []);

  const totalPrice = useMemo(() => {
    if (!theatre || selectedSeats.length === 0) return 0;
    
    return selectedSeats
      .map((id) => {
        for (const row of theatre.seatLayout.rows) {
          const seat = row.seats.find((s) => s.id === id);
          if (seat) return seat.price;
        }
        return 0;
      })
      .reduce((a, b) => a + b, 0);
  }, [selectedSeats, theatre]);

  const backdropAlt = useMemo(
    () => `${movie?.title} Backdrop`,
    [movie?.title]
  );

  const backdropStyle = useMemo(() => ({
    width: "100%",
    maxHeight: "500px",
    objectFit: "cover" as React.CSSProperties["objectFit"],
    borderRadius: "12px",
    marginBottom: "2rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
  }), []);

  if (moviesLoading || theatresLoading) {
    return <Loader />;
  }

  if (!movie || !theatre) {
    return <div>Please select a theatre to continue.</div>;
  }

  return (
    <div className="seat-booking-container">
      <div className="booking-header">
        <button className="back-btn" onClick={handleBack}>
          <img
            src="/assets/logos/back_btn.png"
            alt="Back"
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
          Back
        </button>
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: 800,
            color: "var(--secondary-color)",
            letterSpacing: "1px",
          }}
        >
          Select Your Seats
        </h1>
      </div>
      {movie?.backdrop && (
        <img
          src={movie?.backdrop}
          alt={backdropAlt}
          style={backdropStyle}
        />
      )}
      <div className="seat-booking-header">
        <div className="booking-info">
          <h2>{movie?.title}</h2>
          <h3>{theatre?.name}</h3>
        </div>
      </div>

      <MovieMetadata movie={movie} showDescription={true} />

      <div className="seat-booking-main">
        <div className="seat-grid-container">
          <TheatreStage />
          <svg
            ref={svgRef}
            className="seat-grid-svg"
            width="500"
            height="500"
            viewBox="0 0 500 550"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g className="seating-area" data-seating-area>
                {theatre?.seatLayout?.rows.map((row, rowIdx) =>
                  row.seats.map((seat, seatIdx) => {
                    const isSelected = selectedSeats.includes(seat.id);
                    const rowLetter = String.fromCharCode(65 + rowIdx);
                    const seatNumber = `${rowLetter}${seatIdx + 1}`;
                    const seatImage = getSeatImage(isSelected, seat.isBooked, seat.tier);

                    return (
                      <g key={seat.id} className="seat-group">
                        <image
                          className={`seat-image ${seat.isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                          data-seat
                          x={60 + seatIdx * 40}
                          y={80 + rowIdx * 40}
                          width="32"
                          height="32"
                          href={seatImage}
                          onClick={() => handleSeatClick(seat.id, seat.isBooked)}
                          data-locked={seat.isBooked ? "true" : undefined}
                          style={{ cursor: seat.isBooked ? 'not-allowed' : 'pointer' }}
                        />
                        <text
                          className="seat-number"
                          x={76 + seatIdx * 40}
                          y={97 + rowIdx * 40}
                          
                        >
                          {seatNumber}
                        </text>
                      </g>
                    );
                  })
                )}
              </g>
            </g>
          </svg>
        </div>
        <SeatLegend showLimitMsg={showLimitMsg} />
      </div>

      {/* Pricing Details Section */}
      <div className="pricing-section">
        {selectedSeats.length === 0 ? (
          <span>Select seats to see pricing details.</span>
        ) : (
          <>
            <div style={{ marginBottom: "8px" }}>
              Selected Seats:&nbsp;
              <span style={{ color: "#1976d2", fontWeight: 700 }}>
                {selectedSeats.join(", ")}
              </span>
            </div>
            <div>
              Total Price:&nbsp;
              <span
                style={{
                  color: "#388e3c",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                }}
              >
                ₹{totalPrice}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="seat-booking-actions">
        <Button 
          themeColor="primary" 
          onClick={handleBookNow}
          disabled={selectedSeats.length === 0}
        >
          Book Now
        </Button>
      </div>

      {showConfirmPopup && (
        <BookingConfirmPopup
          movieTitle={movie?.title}
          selectedSeats={selectedSeats}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};
