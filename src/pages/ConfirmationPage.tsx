import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Button } from "@progress/kendo-react-buttons";
import { calculateTotalPrice } from "../utils/seatUtils";

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { currentBooking: booking, selectedSeats } = useSelector(
    (state: RootState) => state.booking
  );
  const movie = useSelector((state: RootState) => state.movies.selectedMovie);
  const theatre = useSelector((state: RootState) => state.theatres.selectedTheatre);

  useEffect(() => {
    if (!booking || !movie || !theatre) navigate("/");
  }, [booking, movie, theatre, navigate]);

  if (!booking || !movie || !theatre) return null;

  const totalAmount = calculateTotalPrice(selectedSeats);

  const bookingDetails = [
    { label: "Movie", value: movie.title },
    { label: "Theatre", value: theatre.name },
    { label: "Show Time", value: booking.showTime },
    { label: "Seats", value: selectedSeats.map((s) => s.id).join(", ") },
    { label: "Total Amount", value: `₹${totalAmount}` },
  ];

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
          <Button themeColor="primary" onClick={() => navigate("/")}>
            Book Another Movie
          </Button>
        </footer>
      </div>
    </div>
  );
};
