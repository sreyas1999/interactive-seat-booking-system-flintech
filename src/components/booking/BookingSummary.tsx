import React, { useMemo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Card, CardHeader, CardBody } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { calculateTotalPrice } from '../../utils/seatUtils';

interface BookingSummaryProps {
  onConfirm: () => void;
}

const BookingSummary = ({ onConfirm }: BookingSummaryProps) => {
  const selectedSeats = useAppSelector((state) => state.booking.selectedSeats);
  const selectedMovie = useAppSelector((state) => state.movies.selectedMovie);
  const selectedTheatre = useAppSelector((state) => state.theatres.selectedTheatre);

  const totalPrice = useMemo(() => calculateTotalPrice(selectedSeats), [selectedSeats]);
  
  const seatIds = useMemo(
    () => selectedSeats.map((seat) => seat.id).join(', '),
    [selectedSeats]
  );

  const isDisabled = useMemo(() => selectedSeats.length === 0, [selectedSeats.length]);

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
          <strong>Selected Seats:</strong> {seatIds}
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
            disabled={isDisabled}
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

BookingSummary.displayName = 'BookingSummary';

export default React.memo(BookingSummary);