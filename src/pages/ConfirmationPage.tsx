import { useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Button } from "@progress/kendo-react-buttons";
import { calculateTotalPrice } from "../utils/seatUtils";

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { currentBooking: booking, selectedSeats } = useAppSelector(
    (state) => state.booking
  );
  const movie = useAppSelector((state) => state.movies.selectedMovie);
  const theatre = useAppSelector((state) => state.theatres.selectedTheatre);

  useEffect(() => {
    if (!booking || !movie || !theatre) navigate("/");
  }, [booking, movie, theatre, navigate]);

  const handleBookAnother = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const totalAmount = useMemo(
    () => calculateTotalPrice(selectedSeats),
    [selectedSeats]
  );

  const seatIds = useMemo(
    () => selectedSeats.map((s) => s.id).join(", "),
    [selectedSeats]
  );

  const bookingDetails = useMemo(() => [
    { label: "Movie", value: movie?.title || '' },
    { label: "Theatre", value: theatre?.name || '' },
    { label: "Show Time", value: booking?.showTime || '' },
    { label: "Seats", value: seatIds },
    { label: "Total Amount", value: `₹${totalAmount}` },
  ], [movie?.title, theatre?.name, booking?.showTime, seatIds, totalAmount]);

  if (!booking || !movie || !theatre) return null;

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <header className="confirmation-header">
          <h1>Booking Confirmed!</h1>
          <p>Your tickets have been booked successfully.</p>
        </header>

        <section className="booking-details">
          <h2>Booking Details</h2>
          <dl className="details-grid">
            {bookingDetails.map(({ label, value }) => (
              <div key={label} className="detail-item">
                <dt>{label}:</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="confirmation-actions">
          <Button themeColor="primary" onClick={handleBookAnother}>
            Book Another Movie
          </Button>
        </footer>
      </div>
    </div>
  );
};
