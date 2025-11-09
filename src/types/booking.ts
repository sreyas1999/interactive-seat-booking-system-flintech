// import type { Movie } from './movie';
// import type { Theatre } from './theatre';
import type { Seat } from './seat';

export interface Booking {
  id: string;
  movieId: number;
  theatreId: number;
  showTime: string;
  selectedSeats: Seat[];
  totalAmount: number;
  bookingDate: string;
}

export interface BookingState {
  currentBooking: Booking | null;
  selectedSeats: Seat[];
  loading: boolean;
  error: string | null;
}