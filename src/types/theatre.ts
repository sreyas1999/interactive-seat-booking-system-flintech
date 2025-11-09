import type { SeatLayout } from './seat';

export interface Theatre {
  id: number;
  name: string;
  location: string;
  seatLayout: SeatLayout;
  showTimes: string[];
}

export interface TheatreState {
  theatres: Theatre[];
  selectedTheatre: Theatre | null;
  loading: boolean;
  error: string | null;
}