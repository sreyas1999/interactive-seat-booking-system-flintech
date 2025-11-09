export type SeatTier = 'SILVER' | 'GOLD' | 'PLATINUM';

export interface Seat {
  id: string;
  row: string;
  number: number;
  tier: SeatTier;
  price: number;
  isBooked: boolean;
  isSelected: boolean;
}

export interface SeatRow {
  rowLabel: string;
  seats: Seat[];
}

export interface SeatLayout {
  rows: SeatRow[];
}