import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { calculateTotalPrice } from '../../utils/seatUtils';

interface BookingSummaryProps {
  onConfirm: () => void;
}

const BookingSummary = ({ onConfirm }: BookingSummaryProps) => {
  const selectedSeats = useSelector((state: RootState) => state.booking.selectedSeats);
  const selectedMovie = useSelector((state: RootState) => state.movies.selectedMovie);
  const selectedTheatre = useSelector((state: RootState) => state.theatres.selectedTheatre);

  const totalPrice = calculateTotalPrice(selectedSeats);

  if (!selectedMovie || !selectedTheatre) {
    return null;
  }

  return (
    <Card className="booking-summary">
      <CardHeader>
        <h3>Booking Summary</h3>
      </CardHeader>
      <CardBody>
        <div className="summary-item">
          <strong>Movie:</strong> {selectedMovie.title}
        </div>
        <div className="summary-item">
          <strong>Theatre:</strong> {selectedTheatre.name}
        </div>
        <div className="summary-item">
          <strong>Selected Seats:</strong>{' '}
          {selectedSeats.map((seat) => seat.id).join(', ')}
        </div>
        <div className="summary-item">
          <strong>Number of Seats:</strong> {selectedSeats.length}
        </div>
        <div className="summary-item">
          <strong>Total Amount:</strong> ₹{totalPrice}
        </div>
        <div className="summary-actions" style={{ marginTop: '1rem' }}>
          <Button
            themeColor="primary"
            disabled={selectedSeats.length === 0}
            onClick={onConfirm}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          >
            Confirm Booking
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default BookingSummary;