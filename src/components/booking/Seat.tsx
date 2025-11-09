import type { Seat as SeatType } from '../../types/seat';
import { Tooltip } from '@progress/kendo-react-tooltip';

interface SeatProps {
  seat: SeatType;
  onSelect: (seat: SeatType) => void;
}

const Seat = ({ seat, onSelect }: SeatProps) => {
  const handleClick = () => {
    if (!seat.isBooked) {
      onSelect(seat);
    }
  };

  const getSeatClass = () => {
    const classes = ['seat', seat.tier.toLowerCase()];
    if (seat.isSelected) classes.push('selected');
    if (seat.isBooked) classes.push('booked');
    return classes.join(' ');
  };

  return (
    <Tooltip content={`₹${seat.price} - ${seat.tier}`}>
      <div
        className={getSeatClass()}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Seat ${seat.id} - ${seat.tier} - ₹${seat.price}`}
        aria-disabled={seat.isBooked}
      >
        {seat.number}
      </div>
    </Tooltip>
  );
};

export default Seat;