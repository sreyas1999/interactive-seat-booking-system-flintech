import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { toggleSeatSelection } from '../../redux/slices/bookingSlice';
import Seat from './Seat';
import type { SeatRow, Seat as SeatType } from '../../types/seat';
import { MAX_SEATS_PER_BOOKING } from '../../utils/constants';

import type { Theatre } from '../../types/theatre';

interface SeatGridProps {
  theatre: Theatre;
}

const SeatGrid: React.FC<SeatGridProps> = ({ theatre }) => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state: RootState) => state.booking.selectedSeats);
  const error = useSelector((state: RootState) => state.booking.error);

  const handleSeatSelect = (seat: SeatType) => {
    dispatch(toggleSeatSelection(seat));
  };

  if (!theatre) {
    return <div>Please select a theatre first</div>;
  }

  return (
    <div className="seat-grid-container">
      <div className="seat-grid">
        {theatre.seatLayout.rows.map((row: SeatRow) => (
          <div key={row.rowLabel} className="seat-row">
            <div className="row-label">{row.rowLabel}</div>
            {row.seats.map((seat: SeatType) => (
              <Seat
                key={seat.id}
                seat={{
                  ...seat,
                  isSelected: selectedSeats.some((s: SeatType) => s.id === seat.id),
                }}
                onSelect={handleSeatSelect}
              />
            ))}
          </div>
        ))}
      </div>
      {error && (
        <div className="error-message" style={{ color: 'red', marginTop: '1rem' }}>
          {error}
        </div>
      )}
      <div className="seat-info" style={{ marginTop: '1rem' }}>
        Selected seats: {selectedSeats.length} / {MAX_SEATS_PER_BOOKING}
      </div>
    </div>
  );
};



export default SeatGrid;