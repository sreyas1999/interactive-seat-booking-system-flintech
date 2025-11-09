import type { Seat, SeatLayout, SeatTier } from '../types/seat';
import { SEAT_PRICES, THEATRE_CONFIGS } from './constants';

export const generateSeatId = (row: string, number: number): string => {
  return `${row}${number}`;
};

export const getSeatPrice = (tier: SeatTier): number => {
  return SEAT_PRICES[tier];
};

export const generateSeatLayout = (theatreName: keyof typeof THEATRE_CONFIGS): SeatLayout => {
  const config = THEATRE_CONFIGS[theatreName];
  const rows: string[] = [];
  
  // Generate row labels (A, B, C, etc.)
  for (let i = 0; i < config.silverRows + config.goldRows + config.platinumRows; i++) {
    rows.push(String.fromCharCode(65 + i));
  }

  const layout: SeatLayout = {
    rows: rows.map((rowLabel, rowIndex) => {
      let tier: SeatTier;
      if (rowIndex < config.silverRows) {
        tier = 'SILVER';
      } else if (rowIndex < config.silverRows + config.goldRows) {
        tier = 'GOLD';
      } else {
        tier = 'PLATINUM';
      }

      return {
        rowLabel,
        seats: Array.from({ length: config.seatsPerRow }, (_, index) => ({
          id: generateSeatId(rowLabel, index + 1),
          row: rowLabel,
          number: index + 1,
          tier,
          price: getSeatPrice(tier),
          isBooked: false,
          isSelected: false,
        })),
      };
    }),
  };

  return layout;
};

export const calculateTotalPrice = (selectedSeats: Seat[]): number => {
  return selectedSeats.reduce((total, seat) => total + seat.price, 0);
};