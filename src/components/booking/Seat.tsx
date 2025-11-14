import React, { useCallback, useMemo } from 'react';
import type { Seat as SeatType } from '../../types/seat';
import { Tooltip } from '@progress/kendo-react-tooltip';

interface SeatProps {
  seat: SeatType;
  onSelect: (seat: SeatType) => void;
}

const Seat = ({ seat, onSelect }: SeatProps) => {
  const handleClick = useCallback(() => {
    if (!seat.isBooked) {
      onSelect(seat);
    }
  }, [seat, onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !seat.isBooked) {
      e.preventDefault();
      onSelect(seat);
    }
  }, [seat, onSelect]);

  const seatClass = useMemo(() => {
    const classes = ['seat', seat.tier.toLowerCase()];
    if (seat.isSelected) classes.push('selected');
    if (seat.isBooked) classes.push('booked');
    return classes.join(' ');
  }, [seat.tier, seat.isSelected, seat.isBooked]);

  const tooltipContent = useMemo(
    () => `₹${seat.price} - ${seat.tier}`,
    [seat.price, seat.tier]
  );

  const ariaLabel = useMemo(
    () => `Seat ${seat.id} - ${seat.tier} - ₹${seat.price}`,
    [seat.id, seat.tier, seat.price]
  );

  return (
    <Tooltip content={tooltipContent}>
      <div
        className={seatClass}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-disabled={seat.isBooked}
      >
        {seat.number}
      </div>
    </Tooltip>
  );
};

Seat.displayName = 'Seat';

export default React.memo(Seat);