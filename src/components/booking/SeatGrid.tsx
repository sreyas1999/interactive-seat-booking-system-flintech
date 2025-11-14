import React, { useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { toggleSeatSelection } from '../../redux/slices/bookingSlice';
import Seat from './Seat';
import type { SeatRow, Seat as SeatType } from '../../types/seat';
import { MAX_SEATS_PER_BOOKING } from '../../utils/constants';

import type { Theatre } from '../../types/theatre';

interface SeatGridProps {
  theatre: Theatre;
}

const SeatGrid: React.FC<SeatGridProps> = ({ theatre }) => {
  const dispatch = useAppDispatch();
  const selectedSeats = useAppSelector((state) => state.booking.selectedSeats);
  const error = useAppSelector((state) => state.booking.error);

  const handleSeatSelect = useCallback((seat: SeatType) => {
    dispatch(toggleSeatSelection(seat));
  }, [dispatch]);

  const selectedSeatIds = useMemo(() => 
    new Set(selectedSeats.map((s: SeatType) => s.id)), 
    [selectedSeats]
  );

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
                  isSelected: selectedSeatIds.has(seat.id),
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

SeatGrid.displayName = 'SeatGrid';

export default React.memo(SeatGrid);